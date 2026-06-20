import { GLOBAL_PROMPT } from "./hk/global-prompt.ts";
import { GRADING_RULES } from "./hk/grading-prompt.ts";
import { JAPANESE_GLOBAL_PROMPT } from "./japanese/global-prompt.ts";
import { JAPANESE_GRADING_RULES } from "./japanese/grading-prompt.ts";

export type LanguageId = "hk" | "japanese";

export interface LanguageConfig {
  id: LanguageId;
  label: string;
  nativeLabel: string;
  globalPrompt: string;
  gradingRules: string;
  suggestionsNote: string;
  available: boolean;
}

export const LANGUAGE_MAP: Record<LanguageId, LanguageConfig> = {
  hk: {
    id: "hk",
    label: "Cantonese",
    nativeLabel: "廣東話",
    globalPrompt: GLOBAL_PROMPT,
    gradingRules: GRADING_RULES,
    suggestionsNote: "Cantonese text only — no Jyutping or English",
    available: true,
  },
  japanese: {
    id: "japanese",
    label: "Japanese",
    nativeLabel: "日本語",
    globalPrompt: JAPANESE_GLOBAL_PROMPT,
    gradingRules: JAPANESE_GRADING_RULES,
    suggestionsNote: "Japanese text only — no Romaji or English",
    available: true,
  },
};

const DEFAULT_LANGUAGE: LanguageId = "hk";

export function getLanguageConfig(languageId: string): LanguageConfig {
  if (languageId in LANGUAGE_MAP) {
    return LANGUAGE_MAP[languageId as LanguageId];
  }
  return LANGUAGE_MAP[DEFAULT_LANGUAGE];
}

export function buildSuggestionsInstruction(suggestionsNote: string): string {
  return `SUGGESTED REPLIES:
After every response (including your opening), output exactly 3 suggested replies the learner could say next. Progress from shorter/simpler to longer/more natural. Output ${suggestionsNote} inside the suggestions. Use this exact format:

<suggestions>
  <option>...</option>
  <option>...</option>
  <option>...</option>
</suggestions>`;
}
