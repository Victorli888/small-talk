// routes/api/phrases.ts

import { Handlers } from "$fresh/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

// Let's start by defining our interfaces to describe the shape of our data
interface NewPhrase {
    cantonese: string;
    english: string;
    theme_id?: number;
    challenge_rating?: number;
    root_question_id?: number;
    is_hidden?: boolean;
}

interface PhraseData {
    phrase_id: number;
    cantonese: string;
    english: string;
    root_question_id: number | null;
    is_hidden: boolean;
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

    if (!phrase.cantonese?.trim()) {
        errors.push("Chinese translation is required");
    } else if (phrase.cantonese.length > 500) {
        errors.push("Chinese translation must be 500 characters or less");
    }

    if (!phrase.english?.trim()) {
        errors.push("English translation is required");
    }

    if (phrase.theme_id !== undefined && phrase.theme_id <= 0) {
        errors.push("Theme ID must be a positive integer");
    }

    if (phrase.challenge_rating !== undefined &&
        (phrase.challenge_rating < 1 || phrase.challenge_rating > 5 ||
            !Number.isInteger(phrase.challenge_rating))) {
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
    // GET Phrase Data by phrase_id from DB
    async GET(req: Request) {
        const client = createClient();
        const url = new URL(req.url);
        const phraseId = url.searchParams.get('id');
        const includeHidden = url.searchParams.get('include_hidden') === 'true';

        try {
            await client.connect();

            if (phraseId && !isNaN(Number(phraseId))) {
                // Build the query based on whether we should include hidden phrases
                const result = includeHidden
                    ? await client.queryObject`
                    SELECT
                        phrase_id,
                        cantonese,
                        english,
                        theme_id,
                        challenge_rating,
                        root_question_id,
                        is_hidden
                    FROM phrases
                    WHERE phrase_id = ${Number(phraseId)}
                `
                    : await client.queryObject`
                    SELECT
                        phrase_id,
                        cantonese,
                        english,
                        theme_id,
                        challenge_rating,
                        root_question_id,
                        is_hidden
                    FROM phrases
                    WHERE phrase_id = ${Number(phraseId)}
                    AND is_hidden = FALSE
                `;

                if (result.rows.length === 0) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: "Phrase not found"
                    }), {
                        status: 404,
                        headers: { "Content-Type": "application/json" }
                    });
                }

                return new Response(JSON.stringify({
                    success: true,
                    ...result.rows[0]
                }), {
                    headers: { "Content-Type": "application/json" }
                });
            }

            // If no specific ID provided, return 400 error
            return new Response(JSON.stringify({
                success: false,
                error: "Please provide a phrase ID"
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });

        } catch (error) {
            console.error("Database error:", error);
            return new Response(JSON.stringify({
                success: false,
                error: "Failed to fetch phrase",
                details: error.message
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        } finally {
            await client.end();
        }
    },

    // POST new phrase to DB
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
                    cantonese,
                    english,
                    theme_id,
                    challenge_rating,
                    root_question_id,
                    is_hidden
                ) VALUES (
                     ${phrase.cantonese},
                     ${phrase.english},
                     ${phrase.theme_id || null},
                     ${phrase.challenge_rating || null},
                     ${phrase.root_question_id || null},
                     ${phrase.is_hidden || false}
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
    },

    // PUT updates to an existing phrase in the DB
    async PUT(req: Request) {
        const client = createClient();

        try {
            const phrase: NewPhrase & { phrase_id: number } = await req.json();

            // First validate the incoming data
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

            // Check if the phrase exists
            const existingPhrase = await client.queryObject`
            SELECT phrase_id FROM phrases WHERE phrase_id = ${phrase.phrase_id}
        `;

            if (existingPhrase.rows.length === 0) {
                return new Response(JSON.stringify({
                    success: false,
                    error: "Phrase not found"
                }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                });
            }

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

            // Update the phrase
            await client.queryObject`
                UPDATE phrases
                SET
                    cantonese = ${phrase.cantonese},
                    english = ${phrase.english},
                    theme_id = ${phrase.theme_id || null},
                    challenge_rating = ${phrase.challenge_rating || null},
                    root_question_id = ${phrase.root_question_id || null},
                    is_hidden = ${phrase.is_hidden || false}
                WHERE phrase_id = ${phrase.phrase_id}
            `;

            return new Response(JSON.stringify({
                success: true,
                message: "Phrase updated successfully"
            }), {
                headers: { "Content-Type": "application/json" }
            });

        } catch (error) {
            console.error("Error updating phrase:", error);
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
    },

    async DELETE(req: Request) {
        const client = createClient();
        const url = new URL(req.url);
        const phraseId = url.searchParams.get('id');

        try {
            // First validate that we have a valid phrase ID
            if (!phraseId || isNaN(Number(phraseId))) {
                return new Response(JSON.stringify({
                    success: false,
                    error: "Please provide a valid phrase ID"
                }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                });
            }

            await client.connect();

            // Check if the phrase exists and isn't already marked as deleted
            const existingPhrase = await client.queryObject`
            SELECT phrase_id, is_hidden 
            FROM phrases 
            WHERE phrase_id = ${Number(phraseId)}
        `;

            if (existingPhrase.rows.length === 0) {
                return new Response(JSON.stringify({
                    success: false,
                    error: "Phrase not found"
                }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                });
            }

            // Before deleting, check if this phrase is referenced by any responses
            const hasResponses = await client.queryObject`
            SELECT COUNT(*) as response_count 
            FROM phrases 
            WHERE root_question_id = ${Number(phraseId)}
        `;

            // If there are responses, we should handle them as well
            if (hasResponses.rows[0].response_count > 0) {
                // First, handle all associated responses
                await client.queryObject`
                UPDATE phrases 
                SET is_hidden = TRUE
                WHERE root_question_id = ${Number(phraseId)}
            `;
            }

            // Now handle the main phrase deletion
            await client.queryObject`
            UPDATE phrases 
            SET is_hidden = TRUE
            WHERE phrase_id = ${Number(phraseId)}
        `;

            // Return a success response with information about what was affected
            return new Response(JSON.stringify({
                success: true,
                message: "Phrase successfully deleted",
                deletedResponses: hasResponses.rows[0].response_count > 0,
                responseCount: hasResponses.rows[0].response_count
            }), {
                headers: { "Content-Type": "application/json" }
            });

        } catch (error) {
            console.error("Error deleting phrase:", error);
            return new Response(JSON.stringify({
                success: false,
                error: "Failed to delete phrase",
                details: error.message
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        } finally {
            await client.end();
        }
    }
};