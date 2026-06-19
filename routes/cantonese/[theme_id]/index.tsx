import { PageProps } from "$fresh/server.ts";
import { getTopic } from "../../../lib/content.ts";

const DIFFICULTIES = [
  {
    id: "beginner",
    label: "Beginner",
    desc: "Short sentences, generous grading, hints offered",
    tag: "初級",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    desc: "Natural everyday Cantonese, standard grading",
    tag: "中級",
  },
  {
    id: "advanced",
    label: "Advanced",
    desc: "Colloquial particles, strict grading, sound like a local",
    tag: "高級",
  },
] as const;

export default function TopicDifficultyPicker({ params }: PageProps) {
  const topicId = params.theme_id;
  const topic = getTopic("cantonese", topicId);

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
            href="/cantonese/themes"
            style={{ color: "var(--purple)" }}
            class="underline"
          >
            Back to topics
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
        }}
        class="sticky top-0 z-10 px-6 py-4"
      >
        <div class="max-w-xl mx-auto flex items-center gap-3">
          <a
            href="/cantonese/themes"
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              color: "var(--text2)",
              textDecoration: "none",
            }}
            class="text-sm px-3 py-1.5 rounded-lg"
          >
            ← All topics
          </a>
          <span class="text-xl">{topic.emoji}</span>
          <span style={{ color: "var(--text)" }} class="font-semibold">
            {topic.name}
          </span>
        </div>
      </header>

      <main class="max-w-xl mx-auto px-4 py-10">
        <h1 style={{ color: "var(--text)" }} class="text-xl font-bold mb-1">
          Choose your level
        </h1>
        <p style={{ color: "var(--text3)" }} class="text-sm mb-6">
          A random scenario will be chosen for you.
        </p>

        <div class="flex flex-col gap-3">
          {DIFFICULTIES.map((d) => (
            <a
              key={d.id}
              href={`/cantonese/${topicId}/chat?difficulty=${d.id}`}
              style={{
                background: "var(--bg3)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
              class="rounded-xl px-5 py-4 hover:bg-[var(--bg4)] hover:border-[var(--border2)] transition-colors"
            >
              <div
                style={{
                  background: "var(--bg4)",
                  border: "1px solid var(--border2)",
                  color: "var(--accent)",
                  flexShrink: 0,
                }}
                class="text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                {d.tag}
              </div>
              <div>
                <div class="font-semibold text-sm">{d.label}</div>
                <div style={{ color: "var(--text3)" }} class="text-xs mt-0.5">
                  {d.desc}
                </div>
              </div>
              <span
                style={{ color: "var(--text3)", marginLeft: "auto" }}
                class="text-sm"
              >
                →
              </span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
