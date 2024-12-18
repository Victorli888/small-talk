import { type Handlers } from "https://deno.land/x/fresh@1.7.3/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

export interface PhraseData {
    phrase_id: number;
    chinese_translation: string;
    english_translation: string;
    root_question_id: number | null;
}

// aggregated result of Question and its responses data
export interface PhraseSet {
    question: PhraseData;
    responses: PhraseData[];
}

export const handler: Handlers<Response> = {
    async GET(_req: Request, _ctx: HandlerContext) {
        const client = new Client({
            user: Deno.env.get('DB_USER') ?? 'your_default_username',
            database: Deno.env.get('DB_NAME') ?? 'your_database_name',
            hostname: Deno.env.get('DB_HOST') ?? 'localhost',
            password: Deno.env.get('DB_PASSWORD') ?? 'your_password',
            port: parseInt(Deno.env.get('DB_PORT') ?? '5432')
        });

        try {
            await client.connect();
            const result = await client.queryObject<QuestionPhrase>`
                SELECT *
                FROM phrases
                WHERE root_question_id IS NULL
                ORDER BY RANDOM()
                LIMIT 1
            `;


            /* TODO: Create a new table inside small_talk_db to keep track of fetched question
                phrases, only reset this table when needed
      // Use a subquery to exclude previously used phrases
      const result = await client.queryObject<QuestionPhrase>`
        SELECT *
        FROM phrases
        WHERE root_question_id IS NULL
        AND phrase_id NOT IN (
          SELECT DISTINCT phrase_id
          FROM used_phrases
          WHERE session_id = $1
        )
        ORDER BY RANDOM()
        LIMIT 1
      `;

      // If no new phrases, reset or handle accordingly
      if (result.rows.length === 0) {
        // Option 1: Reset used phrases for this session
        await client.queryObject`
          DELETE FROM used_phrases
          WHERE session_id = $1
        `;

        // Re-run original query
        const resetResult = await client.queryObject<QuestionPhrase>`
          SELECT *
          FROM phrases
          WHERE root_question_id IS NULL
          ORDER BY RANDOM()
          LIMIT 1
        `;

        return new Response(JSON.stringify(resetResult.rows[0]), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
             */

            if (result.rows.length === 0) {
                return new Response(JSON.stringify({message: "No questions found"}), {
                    status: 404,
                    headers: {'Content-Type': 'application/json'}
                });
            }

            const question = result.rows[0];
            const responsesResult = await client.queryObject<Response>`
                SELECT *
                FROM phrases
                WHERE root_question_id = ${question.phrase_id}
            `;
            const phraseSet: PhraseSet = {
                question: question,
                responses: responsesResult.rows
            };

            return new Response(JSON.stringify(phraseSet), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error('Database error:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch question and responses', details: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        } finally {
            await client.end();
        }
    }
};

//             // return new Response(JSON.stringify(result.rows[0]), {
//             //     headers: { 'Content-Type': 'application/json' }
//             // });
//         } catch (error) {
//             // Handle any database errors
//             console.error('Database error:', error);
//             return new Response(JSON.stringify({ error: 'Failed to fetch phrases' }), {
//                 status: 500,
//                 headers: { 'Content-Type': 'application/json' }
//             });
//         } finally {
//             // Always close the database connection
//             await client.end();
//         }
//     }
// };