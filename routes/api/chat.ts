import { Handlers } from "$fresh/server.ts";
import {
  getScenario,
  getSubtopic,
  isStructuredTopic,
} from "../../lib/content.ts";
import { pickRandomScenario } from "../../lib/pick-scenario.ts";
import {
  assembleSystemPrompt,
  buildGradingPrompt,
} from "../../lib/build-prompt.ts";
import type { Difficulty, SessionContext } from "../../lib/types.ts";

interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  languageId?: string;
  topicId: string;
  subtopicId: string;
  scenarioId?: string;
  difficulty?: Difficulty;
  init?: boolean;
  mode?: "grade";
  session?: SessionContext;
  messages: ApiMessage[];
  // grade-mode only
  userMessage?: string;
  priorAiMessage?: string;
}

async function callAnthropic(
  apiKey: string,
  systemPrompt: string,
  messages: ApiMessage[],
): Promise<Response> {
  return await fetch("https://api.anthropic.com/v1/messages", {
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

    const {
      languageId = "hk",
      topicId,
      subtopicId,
      scenarioId,
      difficulty = "intermediate",
      init,
      mode,
      session: clientSession,
      messages,
      userMessage,
      priorAiMessage,
    } = body;

    if (!topicId || !isStructuredTopic(topicId, languageId)) {
      return new Response(
        JSON.stringify({ error: `Unknown topic "${topicId}"` }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const subtopic = getSubtopic(languageId, topicId, subtopicId);
    if (!subtopic) {
      return new Response(
        JSON.stringify({ error: `Subtopic "${subtopicId}" not found` }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // --- Grade-on-demand branch ---
    if (mode === "grade") {
      if (!clientSession || !userMessage || !priorAiMessage) {
        return new Response(
          JSON.stringify({
            error:
              "session, userMessage, and priorAiMessage required for grading",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
      const gradePrompt = buildGradingPrompt(
        clientSession,
        priorAiMessage,
        userMessage,
      );
      const gradeRes = await callAnthropic(apiKey, gradePrompt, [
        { role: "user", content: "Grade the learner's response now." },
      ]);
      const gradeData = await gradeRes.json();
      if (!gradeRes.ok) {
        return new Response(
          JSON.stringify({
            error: gradeData.error?.message ?? "Anthropic API error",
          }),
          {
            status: gradeRes.status,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      return new Response(JSON.stringify(gradeData), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // --- Conversation branch ---
    const isInit = init !== false &&
      messages.every((m) => m.role !== "assistant");

    let session: SessionContext;
    let scenario;

    if (isInit) {
      scenario = scenarioId
        ? (getScenario(languageId, topicId, subtopicId, scenarioId) ??
          pickRandomScenario(subtopic))
        : pickRandomScenario(subtopic);

      session = {
        languageId,
        topicId,
        subtopicId,
        subtopicName: subtopic.name,
        scenarioId: scenario.id,
        scenarioTitle: scenario.title,
        difficulty,
        agentRole: scenario.agentRole,
        setting: scenario.setting,
      };
    } else {
      if (!clientSession) {
        return new Response(
          JSON.stringify({ error: "session required for follow-up turns" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
      session = clientSession;
      scenario = getScenario(
        languageId,
        topicId,
        subtopicId,
        session.scenarioId,
      );
      if (!scenario) {
        return new Response(
          JSON.stringify({ error: "Scenario not found" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
    }

    const systemPrompt = assembleSystemPrompt({
      languageId,
      session,
      init: isInit,
      subtopic,
      scenario,
    });

    const apiMessages: ApiMessage[] = isInit
      ? [{ role: "user", content: "Begin the conversation now." }]
      : messages;

    const anthropicRes = await callAnthropic(apiKey, systemPrompt, apiMessages);
    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      return new Response(
        JSON.stringify({
          error: data.error?.message ?? "Anthropic API error",
        }),
        {
          status: anthropicRes.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ ...data, session }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
