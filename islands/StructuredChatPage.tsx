import { useEffect, useRef, useState } from "preact/hooks";
import { SettingsModal } from "../components/SettingsModal.tsx";
import type { Difficulty, SessionContext } from "../lib/types.ts";

// --- types ---

interface ParsedResponse {
  primary: string | null;
  phonetic: string | null;
  english: string | null;
  suggestions: string[];
}

interface GradeResult {
  score: string | null;
  label: string | null;
  summary: string | null;
  improved: string | null;
  phonetic_improved: string | null;
  english_improved: string | null;
  explanation: string | null;
}

type GradeStatus = "idle" | "loading" | "done" | "error";

interface UIMessage {
  id: string;
  role: "user" | "ai";
  raw: string;
  parsed: ParsedResponse | null;
  gradeStatus: GradeStatus;
  gradeResult: GradeResult | null;
  hintOpen: boolean;
  displayLang: DisplayLang;
}

interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

type DisplayLang = "primary" | "phonetic" | "english";

export interface StructuredChatProps {
  languageId: string;
  topicId: string;
  topicEmoji: string;
  subtopicId: string;
  subtopicName: string;
  scenarioId: string;
  scenarioTitle: string;
  scenarioContext: string;
  difficulty: Difficulty;
}

// --- per-language display config (no server-side imports needed) ---

interface DisplayConfig {
  primaryTag: string;
  phoneticTag: string;
  phoneticImprovedTag: string;
  primaryLabel: string;
  phoneticLabel: string;
  teacherLabel: string;
  inputPlaceholder: string;
  themesHref: string;
}

function getDisplayConfig(languageId: string): DisplayConfig {
  if (languageId === "japanese") {
    return {
      primaryTag: "japanese",
      phoneticTag: "romaji",
      phoneticImprovedTag: "romaji_improved",
      primaryLabel: "漢字",
      phoneticLabel: "Romaji",
      teacherLabel: "先生",
      inputPlaceholder:
        "Type in Japanese… (Enter to send, Shift+Enter for new line)",
      themesHref: "/japanese/themes",
    };
  }
  return {
    primaryTag: "cantonese",
    phoneticTag: "jyutping",
    phoneticImprovedTag: "jyutping_improved",
    primaryLabel: "漢字",
    phoneticLabel: "Jyutping",
    teacherLabel: "老師",
    inputPlaceholder:
      "Type in Cantonese… (Enter to send, Shift+Enter for new line)",
    themesHref: "/hk/themes",
  };
}

// --- helpers ---

function parseResponse(text: string, config: DisplayConfig): ParsedResponse {
  const get = (tag: string): string | null => {
    const match = text.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
    return match ? match[1].trim() : null;
  };
  const suggestionsBlock = get("suggestions");
  const suggestions: string[] = [];
  if (suggestionsBlock) {
    const optionRe = /<option>([\s\S]*?)<\/option>/g;
    let m;
    while ((m = optionRe.exec(suggestionsBlock)) !== null) {
      suggestions.push(m[1].trim());
    }
  }
  return {
    primary: get(config.primaryTag),
    phonetic: get(config.phoneticTag),
    english: get("english"),
    suggestions,
  };
}

function parseGradeResponse(text: string, config: DisplayConfig): GradeResult {
  const get = (tag: string): string | null => {
    const match = text.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
    return match ? match[1].trim() : null;
  };
  return {
    score: get("score"),
    label: get("label"),
    summary: get("summary"),
    improved: get("improved"),
    phonetic_improved: get(config.phoneticImprovedTag),
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

const LANG_CYCLE: Record<DisplayLang, DisplayLang> = {
  primary: "phonetic",
  phonetic: "english",
  english: "primary",
};

// --- sub-components ---

function TypingIndicator({ teacherLabel }: { teacherLabel: string }) {
  return (
    <div class="flex flex-col items-start mb-4">
      <span style={{ color: "var(--text3)" }} class="text-xs mb-1 ml-1">
        {teacherLabel}
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
  grade: GradeResult;
  open: boolean;
  displayLang: DisplayLang;
  onUseThis: (improved: string) => void;
}

function HintBox({ grade, open, displayLang, onUseThis }: HintBoxProps) {
  const improvedText = displayLang === "primary"
    ? grade.improved
    : displayLang === "phonetic"
    ? grade.phonetic_improved
    : grade.english_improved;

  return (
    <div class={`hint-box ${open ? "hint-box-open" : "hint-box-closed"}`}>
      <div
        style={{ background: "var(--bg3)", border: "1px solid var(--border2)" }}
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
        {grade.explanation && (
          <div
            style={{ color: "var(--text2)" }}
            class="text-xs leading-relaxed mb-3"
          >
            {grade.explanation}
          </div>
        )}
        {grade.improved && (
          <button
            onClick={() => onUseThis(grade.improved!)}
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
        class="text-xs font-semibold px-2.5 py-1 rounded-full self-start"
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

interface MessageBubbleProps {
  msg: UIMessage;
  canGrade: boolean;
  config: DisplayConfig;
  onToggleHint: () => void;
  onCycleLang: () => void;
  onUseThis: (improved: string) => void;
  onGrade: () => void;
}

function MessageBubble(
  { msg, canGrade, config, onToggleHint, onCycleLang, onUseThis, onGrade }:
    MessageBubbleProps,
) {
  const isUser = msg.role === "user";
  const displayLang = msg.displayLang;

  const LANG_LABELS: Record<DisplayLang, string> = {
    primary: config.primaryLabel,
    phonetic: config.phoneticLabel,
    english: "EN",
  };

  const displayText = () => {
    if (isUser) return msg.raw;
    if (!msg.parsed) return msg.raw;
    switch (displayLang) {
      case "primary":
        return msg.parsed.primary ?? msg.raw;
      case "phonetic":
        return msg.parsed.phonetic ?? msg.raw;
      case "english":
        return msg.parsed.english ?? msg.raw;
    }
  };

  if (isUser) {
    return (
      <div class="flex flex-col items-end mb-4">
        <span style={{ color: "var(--text3)" }} class="text-xs mb-1 mr-1">
          You
        </span>
        <div
          style={{ maxWidth: "80%", width: "100%" }}
          class="flex flex-col items-end"
        >
          <div
            style={{
              background: "var(--user-bubble)",
              border: "1px solid var(--user-border)",
              borderBottomRightRadius: "4px",
            }}
            class="px-4 py-3 rounded-xl w-full"
          >
            <div
              style={{ color: "var(--text)" }}
              class="text-sm leading-relaxed whitespace-pre-wrap"
            >
              {displayText()}
            </div>
          </div>

          {/* Grade section */}
          <div class="w-full mt-1.5">
            {msg.gradeStatus === "idle" && canGrade && (
              <div class="flex justify-end">
                <button
                  onClick={onGrade}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--border2)",
                    color: "var(--text3)",
                    cursor: "pointer",
                  }}
                  class="text-xs px-3 py-1.5 rounded-full"
                >
                  Grade my response
                </button>
              </div>
            )}

            {msg.gradeStatus === "loading" && (
              <div class="flex justify-end">
                <span
                  style={{ color: "var(--text3)" }}
                  class="text-xs px-1 py-1"
                >
                  Grading…
                </span>
              </div>
            )}

            {msg.gradeStatus === "error" && (
              <div class="flex justify-end">
                <span
                  style={{ color: "var(--red)" }}
                  class="text-xs px-1 py-1"
                >
                  Could not grade — try again
                </span>
              </div>
            )}

            {msg.gradeStatus === "done" && msg.gradeResult && (
              <div class="flex flex-col items-end gap-1.5 w-full">
                <GradeBadge
                  score={msg.gradeResult.score}
                  label={msg.gradeResult.label}
                  summary={msg.gradeResult.summary}
                />
                <button
                  onClick={onToggleHint}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--border2)",
                    color: "var(--text2)",
                    cursor: "pointer",
                  }}
                  class="text-xs px-3 py-1.5 rounded-full self-start"
                >
                  {msg.hintOpen ? "Hide correction" : "💡 Show correction"}
                </button>
                <div class="w-full">
                  <HintBox
                    grade={msg.gradeResult}
                    open={msg.hintOpen}
                    displayLang={displayLang}
                    onUseThis={onUseThis}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="flex flex-col items-start mb-4" style={{ maxWidth: "82%" }}>
      <span style={{ color: "var(--text3)" }} class="text-xs mb-1 ml-1">
        {config.teacherLabel}
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
        <div
          onClick={onCycleLang}
          style={{ cursor: "pointer" }}
          class="px-4 pt-3 pb-3"
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
      </div>
    </div>
  );
}

// --- scenario context card ---

interface ContextCardProps {
  subtopicName: string;
  scenarioTitle: string;
  scenarioContext: string;
  difficulty: Difficulty;
}

function ContextCard(
  { subtopicName, scenarioTitle, scenarioContext, difficulty }:
    ContextCardProps,
) {
  const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  return (
    <div
      style={{
        background: "var(--bg3)",
        border: "1px solid var(--border2)",
        borderLeft: "3px solid var(--purple)",
      }}
      class="rounded-xl p-4 mb-6"
    >
      <div class="flex items-center gap-2 mb-2">
        <span
          style={{ color: "var(--accent)" }}
          class="text-xs font-semibold uppercase tracking-wide"
        >
          {subtopicName}
        </span>
        <span style={{ color: "var(--border2)" }}>·</span>
        <span
          style={{
            background: "var(--bg4)",
            border: "1px solid var(--border)",
            color: "var(--text3)",
          }}
          class="text-xs px-2 py-0.5 rounded-full"
        >
          {diffLabel}
        </span>
      </div>
      <div style={{ color: "var(--text)" }} class="font-semibold text-sm mb-2">
        {scenarioTitle}
      </div>
      <div
        style={{ color: "var(--text2)", fontStyle: "italic" }}
        class="text-sm leading-relaxed"
      >
        {scenarioContext}
      </div>
    </div>
  );
}

// --- suggestion chips ---

interface SuggestionsProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

function SuggestionChips({ suggestions, onSelect }: SuggestionsProps) {
  if (!suggestions.length) return null;
  return (
    <div class="mb-3">
      <div style={{ color: "var(--text3)" }} class="text-xs mb-2">
        Suggested replies — click to fill:
      </div>
      <div class="flex flex-col gap-2">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelect(s)}
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border2)",
              color: "var(--text)",
              textAlign: "left",
              cursor: "pointer",
              width: "100%",
            }}
            class="rounded-xl px-4 py-2.5 text-sm hover:bg-[var(--bg4)] transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- main island ---

export default function StructuredChatPage(
  {
    languageId,
    topicId,
    topicEmoji,
    subtopicId,
    subtopicName,
    scenarioId,
    scenarioTitle,
    scenarioContext,
    difficulty,
  }: StructuredChatProps,
) {
  const config = getDisplayConfig(languageId);

  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [apiHistory, setApiHistory] = useState<ApiMessage[]>([]);
  const [session, setSession] = useState<SessionContext | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    callInit();
  }, []);

  function makeAiMsg(rawText: string): UIMessage {
    return {
      id: uid(),
      role: "ai",
      raw: rawText,
      parsed: parseResponse(rawText, config),
      gradeStatus: "idle",
      gradeResult: null,
      hintOpen: false,
      displayLang: "primary",
    };
  }

  function makeUserMsg(text: string): UIMessage {
    return {
      id: uid(),
      role: "user",
      raw: text,
      parsed: null,
      gradeStatus: "idle",
      gradeResult: null,
      hintOpen: false,
      displayLang: "primary",
    };
  }

  async function callInit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          languageId,
          topicId,
          subtopicId,
          scenarioId,
          difficulty,
          init: true,
          messages: [],
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong — please try again");
        return;
      }

      const rawText: string = data.content?.[0]?.text ?? "";
      setSession(data.session as SessionContext);
      setMessages([makeAiMsg(rawText)]);
      setApiHistory([
        { role: "user", content: "Begin the conversation now." },
        { role: "assistant", content: rawText },
      ]);
    } catch {
      setError("Something went wrong — please try again");
    } finally {
      setLoading(false);
    }
  }

  async function callFollowUp(
    newHistory: ApiMessage[],
    currentMessages: UIMessage[],
  ) {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          languageId,
          topicId,
          subtopicId,
          difficulty,
          init: false,
          session,
          messages: newHistory,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong — please try again");
        return;
      }

      const rawText: string = data.content?.[0]?.text ?? "";
      setMessages([...currentMessages, makeAiMsg(rawText)]);
      setApiHistory([...newHistory, { role: "assistant", content: rawText }]);
    } catch {
      setError("Something went wrong — please try again");
    } finally {
      setLoading(false);
    }
  }

  async function handleGrade(msgId: string) {
    if (!session) return;

    const msgIdx = messages.findIndex((m) => m.id === msgId);
    if (msgIdx === -1) return;
    const userMsg = messages[msgIdx];

    const priorAiMsg = messages
      .slice(0, msgIdx)
      .reverse()
      .find((m) => m.role === "ai");
    const priorAiPrimary = priorAiMsg?.parsed?.primary ?? priorAiMsg?.raw ?? "";

    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, gradeStatus: "loading" as GradeStatus } : m
      )
    );

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          languageId,
          topicId,
          subtopicId,
          mode: "grade",
          session,
          messages: [],
          userMessage: userMsg.raw,
          priorAiMessage: priorAiPrimary,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, gradeStatus: "error" as GradeStatus } : m
          )
        );
        return;
      }

      const rawText: string = data.content?.[0]?.text ?? "";
      const gradeResult = parseGradeResponse(rawText, config);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId
            ? { ...m, gradeStatus: "done" as GradeStatus, gradeResult }
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId ? { ...m, gradeStatus: "error" as GradeStatus } : m
        )
      );
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

    const userMsg = makeUserMsg(text);
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const newHistory: ApiMessage[] = [
      ...apiHistory,
      { role: "user", content: text },
    ];

    await callFollowUp(newHistory, newMessages);
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

    const lastUserHistIdx = findLastIndex(apiHistory, (h) => h.role === "user");
    const lastAssistantHistIdx = findLastIndex(
      apiHistory,
      (h) => h.role === "assistant",
    );

    const newHistory = apiHistory
      .map((h, i) =>
        i === lastUserHistIdx ? { role: "user" as const, content: improved } : h
      )
      .filter((_, i) => i !== lastAssistantHistIdx);

    setApiHistory(newHistory);
    await callFollowUp(newHistory, newMessages);
  }

  function handleSelectSuggestion(text: string) {
    setInput(text);
    textareaRef.current?.focus();
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 96) + "px";
    }
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
    target.style.height = Math.min(target.scrollHeight, 96) + "px";
  }

  function handleBack() {
    const exchanges = messages.filter((m) => m.role === "user").length;
    if (exchanges > 2) {
      if (!globalThis.confirm("Leave this conversation?")) return;
    }
    globalThis.location.href = config.themesHref;
  }

  const lastAiMsg = [...messages].reverse().find((m) => m.role === "ai");
  const currentSuggestions = !loading && lastAiMsg?.parsed?.suggestions?.length
    ? lastAiMsg.parsed.suggestions
    : [];

  const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

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
          class="text-sm px-3 py-1.5 rounded-lg flex-shrink-0"
        >
          ← Back
        </button>
        <div class="flex-1 flex items-center gap-2 min-w-0">
          <img
            src="/SmallTalkLogo.svg"
            alt="Small Talk"
            width="26"
            height="26"
            style={{ borderRadius: "6px", flexShrink: 0 }}
          />
          <span
            style={{ color: "var(--text2)" }}
            class="text-sm font-medium flex-shrink-0"
          >
            Small Talk
          </span>
          <span
            style={{ color: "var(--border2)" }}
            class="text-sm flex-shrink-0"
          >
            ·
          </span>
          <span class="text-base flex-shrink-0">{topicEmoji}</span>
          <span
            style={{ color: "var(--text)" }}
            class="font-semibold text-sm truncate"
          >
            {subtopicName}
          </span>
          <span
            style={{
              background: "var(--bg4)",
              border: "1px solid var(--border)",
              color: "var(--text3)",
              flexShrink: 0,
            }}
            class="text-xs px-2 py-0.5 rounded-full"
          >
            {diffLabel}
          </span>
        </div>
        <button
          onClick={() => setSettingsOpen(true)}
          title="Settings"
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border)",
            color: "var(--text2)",
            cursor: "pointer",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: "0.9rem",
          }}
        >
          ⚙
        </button>
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <div
            style={{ background: "var(--green)" }}
            class="w-2 h-2 rounded-full"
          />
          <span style={{ color: "var(--text3)" }} class="text-xs">
            AI ready
          </span>
        </div>
      </header>

      {/* Messages */}
      <div class="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <ContextCard
          subtopicName={subtopicName}
          scenarioTitle={scenarioTitle}
          scenarioContext={scenarioContext}
          difficulty={difficulty}
        />

        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            canGrade={!!session && !loading}
            config={config}
            onToggleHint={() => handleToggleHint(msg.id)}
            onCycleLang={() => handleCycleLang(msg.id)}
            onUseThis={handleUseThis}
            onGrade={() => handleGrade(msg.id)}
          />
        ))}
        {loading && <TypingIndicator teacherLabel={config.teacherLabel} />}
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

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        currentLanguage={languageId}
      />

      {/* Input area */}
      <div
        style={{
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
        }}
        class="flex-shrink-0 px-4 pt-3 pb-4"
      >
        <SuggestionChips
          suggestions={currentSuggestions}
          onSelect={handleSelectSuggestion}
        />

        <div class="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onInput={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={config.inputPlaceholder}
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
