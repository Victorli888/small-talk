import { useEffect, useState } from "preact/hooks";

const DIFFICULTIES = [
  { id: "beginner", label: "Beginner", tag: "初級" },
  { id: "intermediate", label: "Intermediate", tag: "中級" },
  { id: "advanced", label: "Advanced", tag: "高級" },
] as const;

const LANGUAGES = [
  { id: "hk", label: "Cantonese", native: "廣東話", available: true },
  { id: "japanese", label: "Japanese", native: "日本語", available: true },
  { id: "mandarin", label: "Mandarin", native: "普通話", available: false },
] as const;

const DIFF_KEY = "st_difficulty";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDifficultyChange?: (d: string) => void;
  currentLanguage?: string;
}

export function SettingsModal(
  { isOpen, onClose, onDifficultyChange, currentLanguage = "hk" }:
    SettingsModalProps,
) {
  const [difficulty, setDifficulty] = useState("intermediate");

  useEffect(() => {
    const saved = localStorage.getItem(DIFF_KEY);
    if (saved) setDifficulty(saved);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const saved = localStorage.getItem(DIFF_KEY);
    if (saved) setDifficulty(saved);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleDifficulty(d: string) {
    setDifficulty(d);
    localStorage.setItem(DIFF_KEY, d);
    onDifficultyChange?.(d);
  }

  function handleLanguageSwitch(langId: string) {
    if (langId === currentLanguage) return;
    globalThis.location.href = `/${langId}/themes`;
  }

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg2)",
          border: "1px solid var(--border2)",
          borderRadius: "18px",
          width: "100%",
          maxWidth: "400px",
          padding: "1.5rem",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div
          style={{ borderBottom: "1px solid var(--border)" }}
          class="flex items-center justify-between pb-4 mb-5"
        >
          <h2
            style={{ color: "var(--text)" }}
            class="font-bold text-base"
          >
            Settings
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              color: "var(--text2)",
              cursor: "pointer",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            class="text-sm font-bold"
          >
            ×
          </button>
        </div>

        {/* Language */}
        <div class="mb-5">
          <div
            style={{ color: "var(--text3)" }}
            class="text-xs font-semibold uppercase tracking-wider mb-2"
          >
            Learning Language
          </div>
          <div class="flex flex-col gap-1.5">
            {LANGUAGES.map((lang) => {
              const isActive = lang.id === currentLanguage;
              return (
                <div
                  key={lang.id}
                  onClick={() =>
                    lang.available && handleLanguageSwitch(lang.id)}
                  style={{
                    background: isActive ? "var(--bg4)" : "var(--bg3)",
                    border: isActive
                      ? "1px solid var(--border2)"
                      : "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "0.625rem 0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    opacity: lang.available ? 1 : 0.45,
                    cursor: lang.available && !isActive ? "pointer" : "default",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: isActive ? "var(--purple)" : "var(--border2)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      color: lang.available ? "var(--text)" : "var(--text3)",
                    }}
                    class="text-sm font-semibold"
                  >
                    {lang.native}
                  </span>
                  <span
                    style={{ color: "var(--text3)" }}
                    class="text-xs"
                  >
                    {lang.label}
                  </span>
                  {!lang.available && (
                    <span
                      style={{
                        marginLeft: "auto",
                        color: "var(--text3)",
                        background: "var(--bg3)",
                        border: "1px solid var(--border)",
                        borderRadius: "20px",
                        padding: "1px 8px",
                      }}
                      class="text-xs"
                    >
                      Soon
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <div
            style={{ color: "var(--text3)" }}
            class="text-xs font-semibold uppercase tracking-wider mb-2"
          >
            Default Difficulty
          </div>
          <div class="flex gap-2">
            {DIFFICULTIES.map((d) => {
              const active = difficulty === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => handleDifficulty(d.id)}
                  style={{
                    flex: 1,
                    background: active ? "var(--purple)" : "var(--bg3)",
                    border: active
                      ? "1px solid var(--purple)"
                      : "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "0.625rem 0",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2px",
                    transition: "background 0.12s, border-color 0.12s",
                  }}
                >
                  <span
                    style={{
                      color: active ? "#fff" : "var(--accent)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    {d.tag}
                  </span>
                  <span
                    style={{
                      color: active ? "#fff" : "var(--text2)",
                      fontSize: "0.75rem",
                    }}
                  >
                    {d.label}
                  </span>
                </button>
              );
            })}
          </div>
          <p style={{ color: "var(--text3)" }} class="text-xs mt-2.5">
            Applies to new conversations. Saved automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
