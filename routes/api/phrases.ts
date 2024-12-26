// routes/api/phrases.ts

import { Handlers } from "$fresh/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

// Let's start by defining our interfaces to describe the shape of our data
interface NewPhrase {
    chinese_translation: string;
    english_translation: string;
    theme_id?: number;
    complexity_rating?: number;
    root_question_id?: number;
}

interface PhraseData {
    phrase_id: number;
    chinese_translation: string;
    english_translation: string;
    root_question_id: number | null;
}

interface PhraseSet {
    question: PhraseData;
    responses: PhraseData[];
}

interface ValidationResponse {
    isValid: boolean;
    errors: string[];
}

// Our validation functions remain the same
function validatePhrase(phrase: NewPhrase): ValidationResponse {
    const errors: string[] = [];

    if (!phrase.chinese_translation?.trim()) {
        errors.push("Chinese translation is required");
    } else if (phrase.chinese_translation.length > 500) {
        errors.push("Chinese translation must be 500 characters or less");
    }

    if (!phrase.english_translation?.trim()) {
        errors.push("English translation is required");
    }

    if (phrase.theme_id !== undefined && phrase.theme_id <= 0) {
        errors.push("Theme ID must be a positive integer");
    }

    if (phrase.complexity_rating !== undefined &&
        (phrase.complexity_rating < 1 || phrase.complexity_rating > 5 ||
            !Number.isInteger(phrase.complexity_rating))) {
        errors.push("Complexity rating must be an integer between 1 and 5");
    }

    if (phrase.root_question_id !== undefined && phrase.root_question_id <= 0) {
        errors.push("Root question ID must be a positive integer");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

// Database validation helpers
async function validateThemeExists(client: Client, themeId: number): Promise<boolean> {
    const result = await client.queryObject`
        SELECT theme_id FROM themes WHERE theme_id = ${themeId}
    `;
    return result.rows.length > 0;
}

async function validateRootQuestionExists(client: Client, rootQuestionId: number): Promise<boolean> {
    const result = await client.queryObject`
        SELECT phrase_id FROM phrases WHERE phrase_id = ${rootQuestionId}
    `;
    return result.rows.length > 0;
}

// Helper function to create a database client
function createClient(): Client {
    return new Client({
        user: Deno.env.get("DB_USER") ?? "your_default_username",
        database: Deno.env.get("DB_NAME") ?? "your_database_name",
        hostname: Deno.env.get("DB_HOST") ?? "localhost",
        password: Deno.env.get("DB_PASSWORD") ?? "your_password",
        port: parseInt(Deno.env.get("DB_PORT") ?? "5432")
    });
}

export const handler: Handlers = {
    // GET handler for fetching random questions and their responses
    async GET(_req: Request) {
        const client = createClient();

        try {
            await client.connect();

            // First, get a random question (phrase with no root_question_id)
            const result = await client.queryObject<PhraseData>`
                SELECT *
                FROM phrases
                WHERE root_question_id IS NULL
                ORDER BY RANDOM()
                LIMIT 1
            `;

            if (result.rows.length === 0) {
                return new Response(JSON.stringify({message: "No questions found"}), {
                    status: 404,
                    headers: {'Content-Type': 'application/json'}
                });
            }

            // Then fetch all responses for this question
            const question = result.rows[0];
            const responsesResult = await client.queryObject<PhraseData>`
                SELECT *
                FROM phrases
                WHERE root_question_id = ${question.phrase_id}
            `;

            // Combine question and responses into a PhraseSet
            const phraseSet: PhraseSet = {
                question: question,
                responses: responsesResult.rows
            };

            return new Response(JSON.stringify(phraseSet), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error('Database error:', error);
            return new Response(JSON.stringify({
                error: 'Failed to fetch question and responses',
                details: error.message
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        } finally {
            await client.end();
        }
    },

    // POST handler for creating new phrases
    async POST(req: Request) {
        const client = createClient();

        try {
            const phrase: NewPhrase = await req.json();

            // Validate the incoming phrase data
            const validation = validatePhrase(phrase);
            if (!validation.isValid) {
                return new Response(JSON.stringify({
                    success: false,
                    errors: validation.errors
                }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                });
            }

            await client.connect();

            // Validate theme and root question if provided
            if (phrase.theme_id) {
                const themeExists = await validateThemeExists(client, phrase.theme_id);
                if (!themeExists) {
                    return new Response(JSON.stringify({
                        success: false,
                        errors: ["Specified theme does not exist"]
                    }), {
                        status: 400,
                        headers: { "Content-Type": "application/json" }
                    });
                }
            }

            if (phrase.root_question_id) {
                const rootExists = await validateRootQuestionExists(client, phrase.root_question_id);
                if (!rootExists) {
                    return new Response(JSON.stringify({
                        success: false,
                        errors: ["Root question not found"]
                    }), {
                        status: 400,
                        headers: { "Content-Type": "application/json" }
                    });
                }
            }

            // Insert the new phrase
            const result = await client.queryObject`
                INSERT INTO phrases (
                    chinese_translation,
                    english_translation,
                    theme_id,
                    complexity_rating,
                    root_question_id
                ) VALUES (
                    ${phrase.chinese_translation},
                    ${phrase.english_translation},
                    ${phrase.theme_id || null},
                    ${phrase.complexity_rating || null},
                    ${phrase.root_question_id || null}
                ) RETURNING phrase_id
            `;

            return new Response(JSON.stringify({
                success: true,
                phrase_id: result.rows[0].phrase_id
            }), {
                status: 201,
                headers: { "Content-Type": "application/json" }
            });

        } catch (error) {
            console.error("Error adding phrase:", error);
            return new Response(JSON.stringify({
                success: false,
                error: error.message
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        } finally {
            await client.end();
        }
    }
};