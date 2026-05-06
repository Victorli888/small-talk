import { Handlers } from "$fresh/server.ts";
import { GLOBAL_PROMPT, THEME_PROMPTS } from "../../lib/prompts.ts";

interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  themeId: string;
  messages: ApiMessage[];
}

export const handler: Handlers = {
  async POST(req: Request) {
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    let body: ChatRequest;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const { themeId, messages } = body;
    const themePrompt = THEME_PROMPTS[themeId] ?? "";
    const systemPrompt = GLOBAL_PROMPT + "\n\n" + themePrompt;

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      return new Response(
        JSON.stringify({ error: data.error?.message ?? "Anthropic API error" }),
        { status: anthropicRes.status, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
