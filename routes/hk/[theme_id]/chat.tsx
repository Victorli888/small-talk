import { PageProps } from "$fresh/server.ts";
import StructuredChatPage from "../../../islands/StructuredChatPage.tsx";
import { getTopic } from "../../../lib/content.ts";
import { pickRandomScenario } from "../../../lib/pick-scenario.ts";
import type { Difficulty } from "../../../lib/types.ts";

export default function TopicChatRoute({ url, params }: PageProps) {
  const topicId = params.theme_id;
  const difficulty = (url.searchParams.get("difficulty") ??
    "intermediate") as Difficulty;

  const topic = getTopic("hk", topicId);

  if (!topic) {
    return (
      <div
        style={{ background: "var(--bg)", color: "var(--text)" }}
        class="min-h-screen flex items-center justify-center"
      >
        <div class="text-center">
          <div style={{ color: "var(--text3)" }} class="text-lg mb-4">
            Topic not found
          </div>
          <a
            href="/hk/themes"
            style={{ color: "var(--purple)" }}
            class="underline"
          >
            Back to topics
          </a>
        </div>
      </div>
    );
  }

  const subtopic =
    topic.subtopics[Math.floor(Math.random() * topic.subtopics.length)];
  const scenario = pickRandomScenario(subtopic);

  return (
    <StructuredChatPage
      languageId="hk"
      topicId={topicId}
      topicEmoji={topic.emoji}
      subtopicId={subtopic.id}
      subtopicName={subtopic.name}
      scenarioId={scenario.id}
      scenarioTitle={scenario.title}
      scenarioContext={scenario.context}
      difficulty={difficulty}
    />
  );
}
