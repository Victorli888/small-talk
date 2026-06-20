import type { Topic } from "../../../types.ts";

export const DAILY_ROUTINES_TOPIC: Topic = {
  id: "daily-routines",
  emoji: "🌅",
  name: "Daily Routines",
  description: "Schedules, habits, typical day",
  subtopics: [
    {
      id: "everyday-life",
      name: "毎日の生活",
      description: "Talk about your daily schedule and habits.",
      setting: "Everyday settings in Japan",
      agentRole: "Friend or coworker",
      scenarios: [
        {
          id: "morning-commute",
          title: "Morning Commute Chat",
          context:
            "You're on a crowded Tokyo metro train during morning rush hour. A friendly regular commuter standing next to you starts a conversation.",
          userGoal:
            "Talk about your morning routine, commute, and typical schedule.",
          agentRole: "Friendly regular commuter on the train (通勤者)",
          setting: "Tokyo metro, morning rush hour",
          beats: [
            {
              speaker: "agent",
              intent:
                "Comment on the crowd and ask where the learner is headed.",
              example: "今日も混んでますね〜。どちらまで行かれるんですか？",
            },
            {
              speaker: "user",
              intent: "Say your destination and comment on the commute.",
            },
            {
              speaker: "agent",
              intent: "Ask what time they usually leave the house.",
            },
            {
              speaker: "user",
              intent:
                "Describe your morning routine and what time you wake up.",
            },
          ],
          vocabulary: [
            "通勤 (commute)",
            "混んでいる (crowded)",
            "毎朝 (every morning)",
            "起きる (to wake up)",
            "乗り換え (transfer)",
            "〜時ごろ (around ~ o'clock)",
          ],
          grammarFocus: [
            "〜に乗ります (I take ~, e.g. the train)",
            "毎日〜しています (I do ~ every day)",
            "〜時に起きます (I wake up at ~ o'clock)",
          ],
        },
        {
          id: "daily-schedule",
          title: "Talking About Your Typical Day",
          context:
            "You're having lunch with a coworker who's curious about what a typical day looks like for you since you recently moved to Tokyo.",
          userGoal:
            "Describe your typical weekday — morning, work, evening — and ask about theirs.",
          agentRole: "Curious coworker at lunch (同僚)",
          setting: "Office cafeteria at lunchtime",
          beats: [
            {
              speaker: "agent",
              intent:
                "Ask what the learner's typical morning looks like before work.",
              example:
                "最近、どんな感じの毎日ですか？朝は何時ごろ起きてるんですか？",
            },
            {
              speaker: "user",
              intent: "Describe your morning routine before work.",
            },
            {
              speaker: "agent",
              intent: "Ask what they do after work in the evenings.",
            },
            {
              speaker: "user",
              intent: "Describe what you usually do in the evenings.",
            },
          ],
          vocabulary: [
            "典型的な (typical)",
            "〜の後 (after ~)",
            "帰宅する (to return home)",
            "夕食 (dinner)",
            "準備する (to prepare / get ready)",
            "習慣 (habit)",
          ],
          grammarFocus: [
            "〜てから (after doing ~)",
            "〜ことが多いです (I often ~)",
            "たいてい〜します (I usually ~)",
          ],
        },
      ],
    },
  ],
};
