import { Handlers } from "$fresh/server.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { createClient } from "../../utils/db.ts";

interface Situation {
    situation_id: number;
    situation_name: string;
    description: string;
}

export const handler: Handlers = {
    async GET(_req: Request) {
        const client = createClient();

        try {
            await client.connect();

            const result = await client.queryObject<{
                theme_id: number;
                theme_name: string;
                description: string;
            }>`
                SELECT theme_id, theme_name, description
                FROM themes
                ORDER BY theme_id
            `;

            const situations: Situation[] = result.rows.map(row => ({
                situation_id: row.theme_id,
                situation_name: row.theme_name,
                description: row.description
            }));

            return new Response(JSON.stringify(situations), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error('Database error:', error);
            return new Response(JSON.stringify({
                error: 'Failed to fetch situations',
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
