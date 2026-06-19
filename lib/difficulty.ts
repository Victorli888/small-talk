import type { Difficulty } from "./types.ts";

export const DIFFICULTY_MODIFIERS: Record<Difficulty, string> = {
  beginner:
    "DIFFICULTY: Beginner — Learner has zero experience. Keep responses simple and easy to say: basic words, short sentences, no slang.",
  intermediate:
    "DIFFICULTY: Intermediate — Natural everyday speech with simple, common slang.",
  advanced:
    "DIFFICULTY: Advanced — Speak like a local: slang, colloquialisms, and idiomatic phrasing.",
};
