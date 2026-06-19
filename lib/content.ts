import type { Scenario, Subtopic, Topic } from "./types.ts";
import { DAILY_ROUTINES_TOPIC } from "./languages/cantonese/topics/daily-routines.ts";
import { DIRECTIONS_TOPIC } from "./languages/cantonese/topics/directions.ts";
import { EDUCATION_TOPIC } from "./languages/cantonese/topics/education.ts";
import { FOOD_DINING_TOPIC } from "./languages/cantonese/topics/food-dining.ts";
import { HEALTH_TOPIC } from "./languages/cantonese/topics/health.ts";
import { LEISURE_TOPIC } from "./languages/cantonese/topics/leisure.ts";
import { PERSONAL_IDENTITY_TOPIC } from "./languages/cantonese/topics/personal-identity.ts";
import { PROBLEM_SOLVING_TOPIC } from "./languages/cantonese/topics/problem-solving.ts";
import { RELATIONSHIPS_TOPIC } from "./languages/cantonese/topics/relationships.ts";
import { SHOPPING_TOPIC } from "./languages/cantonese/topics/shopping.ts";
import { SMALL_TALK_TOPIC } from "./languages/cantonese/topics/small-talk.ts";
import { TECHNOLOGY_TOPIC } from "./languages/cantonese/topics/technology.ts";
import { TRAVEL_TOPIC } from "./languages/cantonese/topics/travel.ts";
import { WORK_TOPIC } from "./languages/cantonese/topics/work.ts";

const TOPICS: Record<string, Record<string, Topic>> = {
  cantonese: {
    "daily-routines": DAILY_ROUTINES_TOPIC,
    "directions": DIRECTIONS_TOPIC,
    "education": EDUCATION_TOPIC,
    "food-dining": FOOD_DINING_TOPIC,
    "health": HEALTH_TOPIC,
    "leisure": LEISURE_TOPIC,
    "personal-identity": PERSONAL_IDENTITY_TOPIC,
    "problem-solving": PROBLEM_SOLVING_TOPIC,
    "relationships": RELATIONSHIPS_TOPIC,
    "shopping": SHOPPING_TOPIC,
    "small-talk": SMALL_TALK_TOPIC,
    "technology": TECHNOLOGY_TOPIC,
    "travel": TRAVEL_TOPIC,
    "work": WORK_TOPIC,
  },
};

export function isStructuredTopic(topicId: string): boolean {
  return topicId in (TOPICS["cantonese"] ?? {});
}

export function getTopic(languageId: string, topicId: string): Topic | null {
  return TOPICS[languageId]?.[topicId] ?? null;
}

export function getSubtopic(
  languageId: string,
  topicId: string,
  subtopicId: string,
): Subtopic | null {
  const topic = getTopic(languageId, topicId);
  return topic?.subtopics.find((s) => s.id === subtopicId) ?? null;
}

export function getScenario(
  languageId: string,
  topicId: string,
  subtopicId: string,
  scenarioId: string,
): Scenario | null {
  const subtopic = getSubtopic(languageId, topicId, subtopicId);
  return subtopic?.scenarios.find((s) => s.id === scenarioId) ?? null;
}
