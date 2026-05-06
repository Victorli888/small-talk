import { PageProps } from "$fresh/server.ts";
import ChatPage from "../../../islands/ChatPage.tsx";
import { THEMES } from "../../../lib/prompts.ts";

export default function ChatRoute({ params }: PageProps) {
  const themeId = params.theme_id;
  const theme = THEMES[themeId];

  if (!theme) {
    return (
      <div
        style={{ background: "var(--bg)", color: "var(--text)" }}
        class="min-h-screen flex items-center justify-center"
      >
        <div class="text-center">
          <div style={{ color: "var(--text3)" }} class="text-lg mb-4">Theme not found</div>
          <a
            href="/cantonese/themes"
            style={{ color: "var(--purple)" }}
            class="underline"
          >
            Back to themes
          </a>
        </div>
      </div>
    );
  }

  return (
    <ChatPage
      themeId={themeId}
      emoji={theme.emoji}
      themeName={theme.name}
    />
  );
}
