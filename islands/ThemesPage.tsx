import { THEMES } from "../lib/prompts.ts";

const THEME_ORDER = [
  "personal-identity",
  "daily-routines",
  "food-dining",
  "directions",
  "shopping",
  "small-talk",
  "health",
  "work",
  "leisure",
  "travel",
  "relationships",
  "problem-solving",
  "technology",
  "education",
];

export default function ThemesPage() {
  return (
    <div
      style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}
    >
      {/* Header */}
      <header
        style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}
        class="sticky top-0 z-10 px-6 py-4"
      >
        <div class="max-w-4xl mx-auto text-center">
          <div class="flex items-center justify-center gap-3 mb-3">
            <img
              src="/SmallTalkLogo.svg"
              alt="Small Talk"
              width="40"
              height="40"
              style={{ borderRadius: "10px" }}
            />
            <span style={{ color: "var(--text)" }} class="text-xl font-bold tracking-tight">
              Small Talk
            </span>
          </div>
          <div
            style={{
              background: "var(--bg3)",
              color: "var(--accent)",
              border: "1px solid var(--border2)",
              display: "inline-block",
            }}
            class="text-xs font-medium px-3 py-1 rounded-full mb-3"
          >
            廣東話 · Cantonese
          </div>
          <h1
            style={{ color: "var(--text)" }}
            class="text-2xl font-bold mb-1"
          >
            Choose a Topic
          </h1>
          <p style={{ color: "var(--text3)" }} class="text-sm">
            Select a theme to start your conversation practice
          </p>
        </div>
      </header>

      {/* Theme grid */}
      <main class="max-w-4xl mx-auto px-4 py-8">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          {THEME_ORDER.map((id) => {
            const theme = THEMES[id];
            if (!theme) return null;
            return (
              <a
                key={id}
                href={`/cantonese/${id}/chat`}
                style={{
                  background: "var(--bg3)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  textDecoration: "none",
                  display: "block",
                  transition: "border-color 0.15s, background 0.15s",
                }}
                class="rounded-xl p-4 group hover:bg-[var(--bg4)]"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)";
                  (e.currentTarget as HTMLElement).style.background = "var(--bg4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "var(--bg3)";
                }}
              >
                <div class="text-3xl mb-3">{theme.emoji}</div>
                <div
                  style={{ color: "var(--text)" }}
                  class="font-semibold text-sm mb-1"
                >
                  {theme.name}
                </div>
                <div
                  style={{ color: "var(--text3)" }}
                  class="text-xs leading-snug"
                >
                  {theme.description}
                </div>
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
}
