import type { Scenario, Subtopic, Topic } from "./types.ts";
import {
  HK_DAILY_ROUTINES,
  HK_DIRECTIONS,
  HK_EDUCATION,
  HK_FOOD_DINING,
  HK_HEALTH,
  HK_LEISURE,
  HK_PERSONAL_IDENTITY,
  HK_PROBLEM_SOLVING,
  HK_RELATIONSHIPS,
  HK_SHOPPING,
  HK_SMALL_TALK,
  HK_TECHNOLOGY,
  HK_TRAVEL,
  HK_WORK,
} from "./languages/hk/topics/index.ts";
import { DAILY_ROUTINES_TOPIC as JP_DAILY_ROUTINES } from "./languages/japanese/topics/daily-routines.ts";
import { DIRECTIONS_TOPIC as JP_DIRECTIONS } from "./languages/japanese/topics/directions.ts";
import { EDUCATION_TOPIC as JP_EDUCATION } from "./languages/japanese/topics/education.ts";
import { FOOD_DINING_TOPIC as JP_FOOD_DINING } from "./languages/japanese/topics/food-dining.ts";
import { HEALTH_TOPIC as JP_HEALTH } from "./languages/japanese/topics/health.ts";
import { LEISURE_TOPIC as JP_LEISURE } from "./languages/japanese/topics/leisure.ts";
import { PERSONAL_IDENTITY_TOPIC as JP_PERSONAL_IDENTITY } from "./languages/japanese/topics/personal-identity.ts";
import { PROBLEM_SOLVING_TOPIC as JP_PROBLEM_SOLVING } from "./languages/japanese/topics/problem-solving.ts";
import { RELATIONSHIPS_TOPIC as JP_RELATIONSHIPS } from "./languages/japanese/topics/relationships.ts";
import { SHOPPING_TOPIC as JP_SHOPPING } from "./languages/japanese/topics/shopping.ts";
import { SMALL_TALK_TOPIC as JP_SMALL_TALK } from "./languages/japanese/topics/small-talk.ts";
import { TECHNOLOGY_TOPIC as JP_TECHNOLOGY } from "./languages/japanese/topics/technology.ts";
import { TRAVEL_TOPIC as JP_TRAVEL } from "./languages/japanese/topics/travel.ts";
import { WORK_TOPIC as JP_WORK } from "./languages/japanese/topics/work.ts";

const TOPICS: Record<string, Record<string, Topic>> = {
  hk: {
    "daily-routines": HK_DAILY_ROUTINES,
    "directions": HK_DIRECTIONS,
    "education": HK_EDUCATION,
    "food-dining": HK_FOOD_DINING,
    "health": HK_HEALTH,
    "leisure": HK_LEISURE,
    "personal-identity": HK_PERSONAL_IDENTITY,
    "problem-solving": HK_PROBLEM_SOLVING,
    "relationships": HK_RELATIONSHIPS,
    "shopping": HK_SHOPPING,
    "small-talk": HK_SMALL_TALK,
    "technology": HK_TECHNOLOGY,
    "travel": HK_TRAVEL,
    "work": HK_WORK,
  },
  japanese: {
    "daily-routines": JP_DAILY_ROUTINES,
    "directions": JP_DIRECTIONS,
    "education": JP_EDUCATION,
    "food-dining": JP_FOOD_DINING,
    "health": JP_HEALTH,
    "leisure": JP_LEISURE,
    "personal-identity": JP_PERSONAL_IDENTITY,
    "problem-solving": JP_PROBLEM_SOLVING,
    "relationships": JP_RELATIONSHIPS,
    "shopping": JP_SHOPPING,
    "small-talk": JP_SMALL_TALK,
    "technology": JP_TECHNOLOGY,
    "travel": JP_TRAVEL,
    "work": JP_WORK,
  },
};

export function isStructuredTopic(
  topicId: string,
  languageId = "hk",
): boolean {
  return topicId in (TOPICS[languageId] ?? TOPICS.hk ?? {});
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
