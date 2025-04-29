import { Handlers } from "$fresh/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

interface PhraseData {
    phrase_id: number;
    cantonese: string;
    english: string;
    root_question_id: number | null;
}

interface PhraseSet {
    question: PhraseData;
    responses: PhraseData[];
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
                AND is_hidden = FALSE
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
    }
};