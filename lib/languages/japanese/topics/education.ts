import type { Topic } from "../../../types.ts";

export const EDUCATION_TOPIC: Topic = {
  id: "education",
  emoji: "📚",
  name: "Education",
  description: "Studying, classes, learning",
  subtopics: [
    {
      id: "learning",
      name: "学びと勉強",
      description: "Talk about studying, classes, and your learning journey.",
      setting: "University campus or language class in Japan",
      agentRole: "Classmate or language exchange partner",
      scenarios: [
        {
          id: "language-learning",
          title: "Talking About Learning Japanese",
          context:
            "You're at a language exchange meetup in Tokyo. Your Japanese partner is curious about how and why you started learning Japanese.",
          userGoal:
            "Explain why you're learning Japanese, how you study, and what you find challenging or fun.",
          agentRole: "Language exchange partner (語学交換パートナー)",
          setting: "Language exchange café meetup in Tokyo",
          beats: [
            {
              speaker: "agent",
              intent: "Ask why the learner started learning Japanese.",
              example:
                "日本語を勉強し始めたのはなんでですか？きっかけは何でしたか？",
            },
            {
              speaker: "user",
              intent:
                "Explain your motivation for learning Japanese (anime, work, travel, culture, etc.).",
            },
            {
              speaker: "agent",
              intent:
                "Ask about their study method and how long they've been studying.",
            },
            {
              speaker: "user",
              intent:
                "Describe how you study and ask for tips from a native speaker.",
            },
          ],
          vocabulary: [
            "きっかけ (trigger / what prompted you)",
            "勉強方法 (study method)",
            "〜に興味がある (interested in ~)",
            "難しい (difficult)",
            "上達する (to improve / make progress)",
            "ネイティブ (native speaker)",
          ],
          grammarFocus: [
            "〜をきっかけに (prompted by ~ / with ~ as the trigger)",
            "〜するようになりました (I came to ~ / I started ~)",
            "〜のが難しいです (it's difficult to ~)",
          ],
        },
        {
          id: "university-life",
          title: "University Life",
          context:
            "You're studying at a Japanese university and you've just met a fellow student in the same faculty. You chat about classes and campus life.",
          userGoal:
            "Talk about your course, your schedule, and what student life is like in Japan.",
          agentRole: "University classmate (同じ学部の学生)",
          setting: "University campus in Japan, between classes",
          beats: [
            {
              speaker: "agent",
              intent: "Ask what faculty or subject the learner is studying.",
              example: "何学部ですか？授業はどんな感じですか？",
            },
            {
              speaker: "user",
              intent: "Say your subject and describe your schedule.",
            },
            {
              speaker: "agent",
              intent:
                "Share something about their own studies and ask what the learner finds most interesting.",
            },
            {
              speaker: "user",
              intent:
                "Share what you enjoy most and ask about clubs or extracurricular activities.",
            },
          ],
          vocabulary: [
            "学部 (faculty / school within university)",
            "専攻 (major / specialisation)",
            "授業 (class / lesson)",
            "サークル (club activity / circle)",
            "単位 (credit / unit)",
            "卒論 (graduation thesis)",
          ],
          grammarFocus: [
            "〜を専攻しています (I'm majoring in ~)",
            "〜が一番好きな授業です (my favourite class is ~)",
            "〜に入っていますか (are you a member of ~)",
          ],
        },
      ],
    },
  ],
};
