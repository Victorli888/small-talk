import { useEffect, useRef, useState } from "preact/hooks";

interface ParsedResponse {
  cantonese: string | null;
  jyutping: string | null;
  english: string | null;
  score: string | null;
  label: string | null;
  summary: string | null;
  improved: string | null;
  jyutping_improved: string | null;
  english_improved: string | null;
  explanation: string | null;
}

interface UIMessage {
  id: string;
  role: "user" | "ai";
  raw: string;
  parsed: ParsedResponse | null;
  hintOpen: boolean;
  displayLang: DisplayLang;
}

interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

type DisplayLang = "cantonese" | "jyutping" | "english";

interface Props {
  themeId: string;
  emoji: string;
  themeName: string;
}

function parseResponse(text: string): ParsedResponse {
  const get = (tag: string): string | null => {
    const match = text.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
    return match ? match[1].trim() : null;
  };
  return {
    cantonese: get("cantonese"),
    jyutping: get("jyutping"),
    english: get("english"),
    score: get("score"),
    label: get("label"),
    summary: get("summary"),
    improved: get("improved"),
    jyutping_improved: get("jyutping_improved"),
    english_improved: get("english_improved"),
    explanation: get("explanation"),
  };
}

function getScoreNum(score: string | null): number {
  if (!score) return 0;
  return parseInt(score.split("/")[0]) || 0;
}

function getBadgeStyle(score: string | null): { color: string; bg: string } {
  const n = getScoreNum(score);
  if (n >= 8) return { color: "#fff", bg: "var(--green)" };
  if (n >= 5) return { color: "#000", bg: "var(--yellow)" };
  return { color: "#fff", bg: "var(--red)" };
}

function uid() {
  return Math.random().toString(36).slice(2);
}

function findLastIndex<T>(
  arr: T[],
  pred: (v: T, i: number) => boolean,
): number {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (pred(arr[i], i)) return i;
  }
  return -1;
}

// --- Sub-components ---

function TypingIndicator() {
  return (
    <div class="flex flex-col items-start mb-4">
      <span style={{ color: "var(--text3)" }} class="text-xs mb-1 ml-1">
        老師
      </span>
      <div
        style={{
          background: "var(--ai-bubble)",
          border: "1px solid var(--ai-border)",
          borderBottomLeftRadius: "4px",
        }}
        class="px-4 py-3 rounded-xl"
      >
        <div class="flex gap-1.5 items-center h-5">
          <span class="typing-dot" />
          <span class="typing-dot" />
          <span class="typing-dot" />
        </div>
      </div>
    </div>
  );
}

interface HintBoxProps {
  parsed: ParsedResponse;
  open: boolean;
  displayLang: DisplayLang;
  onUseThis: (improved: string) => void;
}

function HintBox({ parsed, open, displayLang, onUseThis }: HintBoxProps) {
  const improvedText = displayLang === "cantonese"
    ? parsed.improved
    : displayLang === "jyutping"
    ? parsed.jyutping_improved
    : parsed.english_improved;

  return (
    <div class={`hint-box ${open ? "hint-box-open" : "hint-box-closed"}`}>
      <div
        style={{
          background: "var(--bg3)",
          border: "1px solid var(--border2)",
        }}
        class="mt-2 rounded-lg p-3 text-sm"
      >
        {improvedText && (
          <div
            style={{ color: "var(--accent)" }}
            class="font-medium mb-2 leading-relaxed"
          >
            {improvedText}
          </div>
        )}
        {parsed.explanation && (
          <div
            style={{ color: "var(--text2)" }}
            class="text-xs leading-relaxed mb-3"
          >
            {parsed.explanation}
          </div>
        )}
        {parsed.improved && (
          <button
            onClick={() => onUseThis(parsed.improved!)}
            style={{
              background: "var(--purple)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
            class="text-xs px-3 py-1.5 rounded-full font-medium"
          >
            Use this
          </button>
        )}
      </div>
    </div>
  );
}

interface GradeBadgeProps {
  score: string | null;
  label: string | null;
  summary: string | null;
}

function GradeBadge({ score, label, summary }: GradeBadgeProps) {
  const { color, bg } = getBadgeStyle(score);
  return (
    <div class="mt-2 flex flex-col gap-1">
      <span
        style={{ background: bg, color }}
        class="text-xs font-semibold px-2.5 py-1 rounded-full inline-self-start self-start"
      >
        {label} · {score}
      </span>
      {summary && (
        <div style={{ color: "var(--text3)" }} class="text-xs">
          {summary}
        </div>
      )}
    </div>
  );
}

const LANG_LABELS: Record<DisplayLang, string> = {
  cantonese: "漢字",
  jyutping: "Jyutping",
  english: "EN",
};

const LANG_CYCLE: Record<DisplayLang, DisplayLang> = {
  cantonese: "jyutping",
  jyutping: "english",
  english: "cantonese",
};

interface MessageBubbleProps {
  msg: UIMessage;
  onToggleHint: () => void;
  onCycleLang: () => void;
  onUseThis: (improved: string) => void;
}

function MessageBubble(
  { msg, onToggleHint, onCycleLang, onUseThis }: MessageBubbleProps,
) {
  const isUser = msg.role === "user";
  const displayLang = msg.displayLang;

  const displayText = () => {
    if (isUser) return msg.raw;
    if (!msg.parsed) return msg.raw;
    switch (displayLang) {
      case "cantonese":
        return msg.parsed.cantonese ?? msg.raw;
      case "jyutping":
        return msg.parsed.jyutping ?? msg.raw;
      case "english":
        return msg.parsed.english ?? msg.raw;
    }
  };

  const hasGrade = !isUser && msg.parsed?.score != null;

  if (isUser) {
    return (
      <div class="flex flex-col items-end mb-4">
        <span style={{ color: "var(--text3)" }} class="text-xs mb-1 mr-1">
          You
        </span>
        <div
          style={{
            background: "var(--user-bubble)",
            border: "1px solid var(--user-border)",
            borderBottomRightRadius: "4px",
            maxWidth: "80%",
          }}
          class="px-4 py-3 rounded-xl"
        >
          <div
            style={{ color: "var(--text)" }}
            class="text-sm leading-relaxed whitespace-pre-wrap"
          >
            {displayText()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="flex flex-col items-start mb-4" style={{ maxWidth: "82%" }}>
      <span style={{ color: "var(--text3)" }} class="text-xs mb-1 ml-1">
        老師
      </span>
      <div
        style={{
          background: "var(--ai-bubble)",
          border: "1px solid var(--ai-border)",
          borderBottomLeftRadius: "4px",
          width: "100%",
        }}
        class="rounded-xl overflow-hidden"
      >
        {/* Clickable text area cycles the display language */}
        <div
          onClick={onCycleLang}
          style={{ cursor: "pointer" }}
          class="px-4 pt-3 pb-2"
        >
          <div
            style={{ color: "var(--text)" }}
            class="text-sm leading-relaxed whitespace-pre-wrap"
          >
            {displayText()}
          </div>
          <div class="flex justify-end mt-2">
            <span
              style={{
                color: "var(--text3)",
                border: "1px solid var(--border)",
                background: "var(--bg3)",
              }}
              class="text-xs px-2 py-0.5 rounded-full select-none"
            >
              {LANG_LABELS[displayLang]} ↻
            </span>
          </div>
        </div>

        {hasGrade && msg.parsed && (
          <div class="px-4 pb-3">
            <GradeBadge
              score={msg.parsed.score}
              label={msg.parsed.label}
              summary={msg.parsed.summary}
            />
            <div class="mt-2">
              <button
                onClick={onToggleHint}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border2)",
                  color: "var(--text2)",
                  cursor: "pointer",
                }}
                class="text-xs px-3 py-1.5 rounded-full"
              >
                {msg.hintOpen ? "Hide correction" : "💡 Show correction"}
              </button>
            </div>
            <HintBox
              parsed={msg.parsed}
              open={msg.hintOpen}
              displayLang={displayLang}
              onUseThis={onUseThis}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// --- Main island ---

export default function ChatPage({ themeId, emoji, themeName }: Props) {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [history, setHistory] = useState<ApiMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Auto-start conversation on mount
  useEffect(() => {
    const initMessages: ApiMessage[] = [
      { role: "user", content: "Please begin the conversation." },
    ];
    callApi(initMessages, [], true);
  }, []);

  async function callApi(
    apiMessages: ApiMessage[],
    currentMessages: UIMessage[],
    isInit = false,
  ) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeId, messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong — please try again");
        return;
      }

      const rawText: string = data.content?.[0]?.text ?? "";
      const parsed = parseResponse(rawText);

      const aiMessage: UIMessage = {
        id: uid(),
        role: "ai",
        raw: rawText,
        parsed,
        hintOpen: false,
        displayLang: "cantonese",
      };

      const newMessages = [...currentMessages, aiMessage];
      setMessages(newMessages);

      const assistantHistEntry: ApiMessage = {
        role: "assistant",
        content: rawText,
      };

      if (isInit) {
        setHistory([...apiMessages, assistantHistEntry]);
      } else {
        setHistory([...apiMessages, assistantHistEntry]);
      }
    } catch {
      setError("Something went wrong — please try again");
    } finally {
      setLoading(false);
    }
  }

  function handleToggleHint(msgId: string) {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, hintOpen: !m.hintOpen } : m))
    );
  }

  function handleCycleLang(msgId: string) {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, displayLang: LANG_CYCLE[m.displayLang] } : m
      )
    );
  }

  async function handleSubmit() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: UIMessage = {
      id: uid(),
      role: "user",
      raw: text,
      parsed: null,
      hintOpen: false,
      displayLang: "cantonese",
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const newHistory: ApiMessage[] = [
      ...history,
      { role: "user", content: text },
    ];

    await callApi(newHistory, newMessages);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleInputChange(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    setInput(target.value);
    target.style.height = "auto";
    const maxHeight = 96; // ~4 lines
    target.style.height = Math.min(target.scrollHeight, maxHeight) + "px";
  }

  async function handleUseThis(improved: string) {
    const lastAiIdx = findLastIndex(messages, (m) => m.role === "ai");
    if (lastAiIdx === -1) return;

    const lastUserIdx = findLastIndex(
      messages,
      (m, idx) => m.role === "user" && idx < lastAiIdx,
    );
    if (lastUserIdx === -1) return;

    const newMessages = messages
      .map((m, i) => (i === lastUserIdx ? { ...m, raw: improved } : m))
      .filter((_, i) => i !== lastAiIdx);

    setMessages(newMessages);

    const lastUserHistIdx = findLastIndex(history, (h) => h.role === "user");
    const lastAssistantHistIdx = findLastIndex(
      history,
      (h) => h.role === "assistant",
    );

    const newHistory = history
      .map((h, i) =>
        i === lastUserHistIdx ? { role: "user" as const, content: improved } : h
      )
      .filter((_, i) => i !== lastAssistantHistIdx);

    setHistory(newHistory);
    await callApi(newHistory, newMessages);
  }

  function handleBack() {
    const exchanges = messages.filter((m) => m.role === "user").length;
    if (exchanges > 2) {
      if (!globalThis.confirm("Leave this conversation?")) return;
    }
    globalThis.location.href = "/cantonese/themes";
  }

  return (
    <div
      style={{ background: "var(--bg)", color: "var(--text)" }}
      class="flex flex-col h-screen"
    >
      {/* Header */}
      <header
        style={{
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
        }}
        class="flex items-center gap-3 px-4 py-3 flex-shrink-0"
      >
        <button
          onClick={handleBack}
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border)",
            color: "var(--text2)",
            cursor: "pointer",
          }}
          class="text-sm px-3 py-1.5 rounded-lg"
        >
          ← Back
        </button>
        <div class="flex-1 flex items-center gap-2">
          <img
            src="/SmallTalkLogo.svg"
            alt="Small Talk"
            width="26"
            height="26"
            style={{ borderRadius: "6px", flexShrink: 0 }}
          />
          <span style={{ color: "var(--text2)" }} class="text-sm font-medium">
            Small Talk
          </span>
          <span style={{ color: "var(--border2)" }} class="text-sm">·</span>
          <span class="text-base">{emoji}</span>
          <span style={{ color: "var(--text)" }} class="font-semibold text-sm">
            {themeName}
          </span>
        </div>
        <div class="flex items-center gap-1.5">
          <div
            style={{ background: "var(--green)" }}
            class="w-2 h-2 rounded-full"
          />
          <span style={{ color: "var(--text3)" }} class="text-xs">
            AI ready
          </span>
        </div>
      </header>

      {/* Message list */}
      <div class="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            onToggleHint={() => handleToggleHint(msg.id)}
            onCycleLang={() => handleCycleLang(msg.id)}
            onUseThis={handleUseThis}
          />
        ))}
        {loading && <TypingIndicator />}
        {error && (
          <div
            style={{
              background: "rgba(250,82,82,0.1)",
              border: "1px solid rgba(250,82,82,0.3)",
              color: "var(--red)",
            }}
            class="text-sm px-4 py-3 rounded-lg mb-4 flex justify-between items-center"
          >
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              style={{
                color: "var(--red)",
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
              class="ml-3 font-bold text-base"
            >
              ×
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div
        style={{
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
        }}
        class="flex-shrink-0 px-4 pt-3 pb-4"
      >
        {/* Input row */}
        <div class="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onInput={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type in Cantonese… (Enter to send, Shift+Enter for new line)"
            rows={1}
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border2)",
              color: "var(--text)",
              flex: 1,
              minHeight: "44px",
              maxHeight: "96px",
            }}
            class="rounded-xl px-4 py-2.5 text-sm placeholder:text-[var(--text3)]"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            style={{
              background: loading || !input.trim()
                ? "var(--bg4)"
                : "var(--purple)",
              color: loading || !input.trim() ? "var(--text3)" : "#fff",
              border: "none",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              flexShrink: 0,
              height: "44px",
              width: "44px",
              transition: "background 0.15s",
            }}
            class="rounded-xl flex items-center justify-center text-lg"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
