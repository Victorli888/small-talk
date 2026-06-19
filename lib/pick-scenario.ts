import type { Scenario, Subtopic } from "./types.ts";

export function pickRandomScenario(subtopic: Subtopic): Scenario {
  const idx = Math.floor(Math.random() * subtopic.scenarios.length);
  return subtopic.scenarios[idx];
}
