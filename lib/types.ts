export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Speaker = "agent" | "user";

export interface ConversationBeat {
  speaker: Speaker;
  intent: string;
  example?: string;
}

export interface Scenario {
  id: string;
  title: string;
  context: string;
  userGoal: string;
  agentRole: string;
  setting: string;
  beats: ConversationBeat[];
  vocabulary: string[];
  grammarFocus?: string[];
}

export interface Subtopic {
  id: string;
  name: string;
  description: string;
  setting: string;
  agentRole: string;
  scenarios: Scenario[];
}

export interface Topic {
  id: string;
  emoji: string;
  name: string;
  description: string;
  subtopics: Subtopic[];
}

export interface SessionContext {
  languageId: string;
  topicId: string;
  subtopicId: string;
  subtopicName: string;
  scenarioId: string;
  scenarioTitle: string;
  difficulty: Difficulty;
  agentRole: string;
  setting: string;
}
