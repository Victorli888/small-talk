export interface NextScenario {
  subtopicId: string;
  subtopicName: string;
  scenarioId: string;
  scenarioTitle: string;
  scenarioContext: string;
}

interface NextScenarioCardProps {
  next: NextScenario | null;
  onStart: () => void;
}

export function NextScenarioCard({ next, onStart }: NextScenarioCardProps) {
  return (
    <div
      style={{
        background: "var(--bg3)",
        border: "1px solid var(--border2)",
        borderLeft: "3px solid var(--purple)",
      }}
      class="rounded-xl p-4 mb-4"
    >
      <div
        style={{ color: "var(--accent)" }}
        class="text-xs font-semibold uppercase tracking-wide mb-2"
      >
        Conversation complete — next up
      </div>
      {!next
        ? (
          <div style={{ color: "var(--text3)" }} class="text-sm">
            Loading next scenario…
          </div>
        )
        : (
          <>
            <div style={{ color: "var(--text3)" }} class="text-xs mb-1">
              {next.subtopicName}
            </div>
            <div
              style={{ color: "var(--text)" }}
              class="font-semibold text-sm mb-1"
            >
              {next.scenarioTitle}
            </div>
            <div
              style={{ color: "var(--text2)", fontStyle: "italic" }}
              class="text-sm leading-relaxed mb-3"
            >
              {next.scenarioContext}
            </div>
            <button
              onClick={onStart}
              style={{
                background: "var(--purple)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
              class="text-sm px-4 py-2 rounded-lg font-medium"
            >
              Start next scenario →
            </button>
          </>
        )}
    </div>
  );
}
