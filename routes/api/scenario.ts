import { Handlers } from "$fresh/server.ts";
import { getTopic } from "../../lib/content.ts";
import { pickRandomScenario } from "../../lib/pick-scenario.ts";

export const handler: Handlers = {
  GET(req: Request) {
    const url = new URL(req.url);
    const languageId = url.searchParams.get("languageId") ?? "hk";
    const topicId = url.searchParams.get("topicId");
    const excludeScenarioId = url.searchParams.get("excludeScenarioId");

    if (!topicId) {
      return new Response(JSON.stringify({ error: "topicId required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const topic = getTopic(languageId, topicId);
    if (!topic) {
      return new Response(JSON.stringify({ error: `Unknown topic "${topicId}"` }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Pick a random subtopic, then a random scenario — excluding the current one if possible
    const subtopics = topic.subtopics;
    let subtopic = subtopics[Math.floor(Math.random() * subtopics.length)];
    let scenario = pickRandomScenario(subtopic);

    // If we landed on the same scenario, try once more across all subtopics
    if (scenario.id === excludeScenarioId) {
      const allOptions: { subtopicIdx: number; scenarioIdx: number }[] = [];
      subtopics.forEach((st, si) => {
        st.scenarios.forEach((sc, sci) => {
          if (sc.id !== excludeScenarioId) allOptions.push({ subtopicIdx: si, scenarioIdx: sci });
        });
      });
      if (allOptions.length > 0) {
        const pick = allOptions[Math.floor(Math.random() * allOptions.length)];
        subtopic = subtopics[pick.subtopicIdx];
        scenario = subtopic.scenarios[pick.scenarioIdx];
      }
    }

    return new Response(
      JSON.stringify({
        subtopicId: subtopic.id,
        subtopicName: subtopic.name,
        scenarioId: scenario.id,
        scenarioTitle: scenario.title,
        scenarioContext: scenario.context,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  },
};
