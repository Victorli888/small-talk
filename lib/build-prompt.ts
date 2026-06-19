import { GLOBAL_PROMPT } from "./languages/cantonese/global-prompt.ts";
import { GRADING_RULES } from "./languages/cantonese/grading-prompt.ts";
import { DIFFICULTY_MODIFIERS } from "./difficulty.ts";
import type {
  Difficulty,
  Scenario,
  SessionContext,
  Subtopic,
} from "./types.ts";

const SUGGESTIONS_INSTRUCTION = `SUGGESTED REPLIES:
After every response (including your opening), output exactly 3 suggested replies the learner could say next. Progress from shorter/simpler to longer/more natural. Output Cantonese text only — no Jyutping or English inside the suggestions. Use this exact format:

<suggestions>
  <option>你好，我想check in。</option>
  <option>你好！我預訂咗一個房間，姓李。</option>
  <option>唔該晒！我係網上訂嘅，預訂號碼係1234，可唔可以幫我check in？</option>
</suggestions>`;

export function formatScenarioCard(
  _subtopic: Subtopic,
  scenario: Scenario,
  difficulty: Difficulty,
): string {
  const beats = scenario.beats
    .map((b, i) => {
      const speaker = b.speaker === "agent" ? "A (you)" : "B (learner)";
      const example = b.example ? ` — e.g. "${b.example}"` : "";
      return `${i + 1}. ${speaker}: ${b.intent}${example}`;
    })
    .join("\n");

  const vocab = scenario.vocabulary.join(", ");
  const grammar = scenario.grammarFocus?.length
    ? `\nGRAMMAR FOCUS: ${scenario.grammarFocus.join(", ")}`
    : "";

  return `SCENARIO: ${scenario.title}
Setting: ${scenario.setting}
Your role: ${scenario.agentRole}
Learner's goal: ${scenario.userGoal}

BEATS:
${beats}

VOCABULARY: ${vocab}${grammar}

${DIFFICULTY_MODIFIERS[difficulty]}

${SUGGESTIONS_INSTRUCTION}

Begin in character now as A. Do not announce the scenario or read out the beats. Start naturally at beat 1.`;
}

export function formatSessionStub(session: SessionContext): string {
  const topicLabel = session.topicId.charAt(0).toUpperCase() +
    session.topicId.slice(1);
  const diff = session.difficulty.charAt(0).toUpperCase() +
    session.difficulty.slice(1);
  return `Session: ${topicLabel} > ${session.subtopicName} > ${session.scenarioTitle} | ${diff}
You are ${session.agentRole} (A). Learner is B.

${SUGGESTIONS_INSTRUCTION}`;
}

export function buildGradingPrompt(
  session: SessionContext,
  priorAiCantonese: string,
  userMessage: string,
): string {
  const diff = DIFFICULTY_MODIFIERS[session.difficulty];
  return `You are grading a learner's Cantonese response in a role-play scenario. Output ONLY the grade block — do not continue the conversation.

Scenario: ${session.scenarioTitle}
Setting: ${session.setting}
Role you were playing: ${session.agentRole}

${diff}

What you (the AI) last said in Cantonese: ${priorAiCantonese}
What the learner replied: ${userMessage}

${GRADING_RULES}

Output ONLY the <grade>…</grade> block. No other text, no conversation continuation.`;
}

interface AssembleOptions {
  languageId: string;
  session: SessionContext;
  init: boolean;
  subtopic: Subtopic;
  scenario: Scenario;
}

export function assembleSystemPrompt(options: AssembleOptions): string {
  const { session, init, subtopic, scenario } = options;
  if (init) {
    return (
      GLOBAL_PROMPT +
      "\n\n" +
      formatScenarioCard(subtopic, scenario, session.difficulty)
    );
  }
  return GLOBAL_PROMPT + "\n\n" + formatSessionStub(session);
}
