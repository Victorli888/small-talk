import { DIFFICULTY_MODIFIERS } from "./difficulty.ts";
import {
  buildSuggestionsInstruction,
  getLanguageConfig,
} from "./languages/language-map.ts";
import type {
  Difficulty,
  Scenario,
  SessionContext,
  Subtopic,
} from "./types.ts";

export function formatScenarioCard(
  _subtopic: Subtopic,
  scenario: Scenario,
  difficulty: Difficulty,
  languageId = "hk",
): string {
  const { suggestionsNote } = getLanguageConfig(languageId);

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

${buildSuggestionsInstruction(suggestionsNote)}

Begin in character now as A. Do not announce the scenario or read out the beats. Start naturally at beat 1.`;
}

export function formatSessionStub(
  session: SessionContext,
  languageId = "hk",
): string {
  const { suggestionsNote } = getLanguageConfig(languageId);

  const topicLabel = session.topicId.charAt(0).toUpperCase() +
    session.topicId.slice(1);
  const diff = session.difficulty.charAt(0).toUpperCase() +
    session.difficulty.slice(1);

  return `Session: ${topicLabel} > ${session.subtopicName} > ${session.scenarioTitle} | ${diff}
You are ${session.agentRole} (A). Learner is B.

${buildSuggestionsInstruction(suggestionsNote)}`;
}

export function buildGradingPrompt(
  session: SessionContext,
  priorAiMessage: string,
  userMessage: string,
): string {
  const { gradingRules, label } = getLanguageConfig(session.languageId);
  const diff = DIFFICULTY_MODIFIERS[session.difficulty];

  return `You are grading a learner's ${label} response in a role-play scenario. Output ONLY the grade block — do not continue the conversation.

Scenario: ${session.scenarioTitle}
Setting: ${session.setting}
Role you were playing: ${session.agentRole}

${diff}

What you (the AI) last said in ${label}: ${priorAiMessage}
What the learner replied: ${userMessage}

${gradingRules}

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
  const { languageId, session, init, subtopic, scenario } = options;
  const { globalPrompt } = getLanguageConfig(languageId);

  if (init) {
    return globalPrompt + "\n\n" +
      formatScenarioCard(subtopic, scenario, session.difficulty, languageId);
  }
  return globalPrompt + "\n\n" + formatSessionStub(session, languageId);
}
