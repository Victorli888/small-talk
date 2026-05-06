import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

export function createClient(): Client {
    const databaseUrl = Deno.env.get("DATABASE_URL");
    
    if (databaseUrl) {
        try {
            const url = new URL(databaseUrl);
            const isSupabase = url.hostname.includes('supabase.co');
            
            const clientConfig: {
                user: string;
                database: string;
                hostname: string;
                password: string;
                port: number;
                tls?: {
                    enforce: boolean;
                    rejectUnauthorized: boolean;
                };
            } = {
                user: url.username,
                database: url.pathname.slice(1),
                hostname: url.hostname,
                password: url.password,
                port: parseInt(url.port || "5432")
            };
            
            if (isSupabase) {
                clientConfig.tls = {
                    enforce: true,
                    rejectUnauthorized: false
                };
            }
            
            return new Client(clientConfig);
        } catch (error) {
            console.error("Error parsing DATABASE_URL:", error);
            throw new Error("Invalid DATABASE_URL format");
        }
    }
    
    const user = Deno.env.get("DB_USER");
    const database = Deno.env.get("DB_NAME");
    const hostname = Deno.env.get("DB_HOST");
    const password = Deno.env.get("DB_PASSWORD");
    const port = Deno.env.get("DB_PORT");
    
    const missingVars: string[] = [];
    if (!user) missingVars.push("DB_USER");
    if (!database) missingVars.push("DB_NAME");
    if (!hostname) missingVars.push("DB_HOST");
    if (!password) missingVars.push("DB_PASSWORD");
    
    if (missingVars.length > 0) {
        throw new Error(`Database configuration missing. Missing: ${missingVars.join(", ")}`);
    }
    
    if (!hostname || hostname.trim() === "") {
        throw new Error("DB_HOST is empty or invalid");
    }
    
    return new Client({
        user,
        database,
        hostname,
        password,
        port: parseInt(port || "5432")
    });
}
