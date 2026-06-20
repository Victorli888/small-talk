const LANGUAGES = [
  {
    id: "hk",
    native: "廣東話",
    label: "Cantonese",
    flag: "🇭🇰",
    description: "Hong Kong Cantonese with Jyutping",
    available: true,
  },
  {
    id: "japanese",
    native: "日本語",
    label: "Japanese",
    flag: "🇯🇵",
    description: "Everyday Japanese with Romaji",
    available: true,
  },
  {
    id: "mandarin",
    native: "普通話",
    label: "Mandarin",
    flag: "🇨🇳",
    description: "Mandarin Chinese with Pinyin",
    available: false,
  },
];

export default function LandingPage() {
  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%" }}>
        {/* Logo + title */}
        <div class="flex flex-col items-center mb-10">
          <img
            src="/SmallTalkLogo.svg"
            alt="Small Talk"
            width="64"
            height="64"
            style={{ borderRadius: "16px", marginBottom: "1rem" }}
          />
          <h1
            style={{ color: "var(--text)" }}
            class="text-3xl font-bold tracking-tight mb-2"
          >
            Small Talk
          </h1>
          <p style={{ color: "var(--text3)" }} class="text-sm text-center">
            AI conversation practice for real-world language learning
          </p>
        </div>

        {/* Language cards */}
        <div
          style={{ color: "var(--text3)" }}
          class="text-xs font-semibold uppercase tracking-wider mb-3 text-center"
        >
          Choose a language to practice
        </div>
        <div class="flex flex-col gap-3">
          {LANGUAGES.map((lang) => {
            if (!lang.available) {
              return (
                <div
                  key={lang.id}
                  style={{
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    opacity: 0.4,
                  }}
                >
                  <span style={{ fontSize: "1.75rem" }}>{lang.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div class="flex items-center gap-2">
                      <span
                        style={{ color: "var(--text)" }}
                        class="font-semibold text-sm"
                      >
                        {lang.native}
                      </span>
                      <span style={{ color: "var(--text3)" }} class="text-xs">
                        {lang.label}
                      </span>
                    </div>
                    <div
                      style={{ color: "var(--text3)" }}
                      class="text-xs mt-0.5"
                    >
                      {lang.description}
                    </div>
                  </div>
                  <span
                    style={{
                      color: "var(--text3)",
                      background: "var(--bg3)",
                      border: "1px solid var(--border)",
                      borderRadius: "20px",
                      padding: "2px 10px",
                      fontSize: "0.7rem",
                      flexShrink: 0,
                    }}
                  >
                    Soon
                  </span>
                </div>
              );
            }

            return (
              <a
                key={lang.id}
                href={`/${lang.id}/themes`}
                class="lang-card"
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border2)",
                  borderRadius: "14px",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  textDecoration: "none",
                  transition: "border-color 0.15s, background 0.15s",
                }}
              >
                <span style={{ fontSize: "1.75rem" }}>{lang.flag}</span>
                <div style={{ flex: 1 }}>
                  <div class="flex items-center gap-2">
                    <span
                      style={{ color: "var(--text)" }}
                      class="font-semibold text-sm"
                    >
                      {lang.native}
                    </span>
                    <span style={{ color: "var(--text3)" }} class="text-xs">
                      {lang.label}
                    </span>
                  </div>
                  <div
                    style={{ color: "var(--text3)" }}
                    class="text-xs mt-0.5"
                  >
                    {lang.description}
                  </div>
                </div>
                <span
                  style={{
                    color: "var(--purple)",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  →
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
