import type { Topic } from "../../../types.ts";

export const RELATIONSHIPS_TOPIC: Topic = {
  id: "relationships",
  emoji: "❤️",
  name: "Relationships",
  description: "Friends, emotions, feelings",
  subtopics: [
    {
      id: "personal-connections",
      name: "人間関係",
      description: "Talk about the people in your life and how you feel.",
      setting: "Casual settings with friends or family",
      agentRole: "Close friend or family member",
      scenarios: [
        {
          id: "talking-about-family",
          title: "Talking About Family",
          context:
            "You're chatting with a Japanese friend over coffee. They ask about your family back home and what your relationship with them is like.",
          userGoal:
            "Describe your family members, their personalities, and share a memory or feeling about them.",
          agentRole: "Japanese friend over coffee (友達)",
          setting: "Relaxed cafe in Tokyo",
          beats: [
            {
              speaker: "agent",
              intent: "Ask about the learner's family.",
              example: "ご家族はどんな人たちですか？仲はいいですか？",
            },
            {
              speaker: "user",
              intent:
                "Describe your family members and your relationship with them.",
            },
            {
              speaker: "agent",
              intent:
                "Share something about their own family and ask what the learner misses most.",
            },
            {
              speaker: "user",
              intent: "Share what you miss about home and your family.",
            },
          ],
          vocabulary: [
            "家族 (family)",
            "兄弟 (siblings)",
            "仲がいい (close / on good terms)",
            "〜に似ている (resembles ~ / takes after ~)",
            "懐かしい (nostalgic / miss something from the past)",
            "連絡する (to contact / keep in touch)",
          ],
          grammarFocus: [
            "〜という人 (a person called ~)",
            "〜に似ています (resembles ~)",
            "〜のことが恋しいです (I miss ~)",
          ],
        },
        {
          id: "catching-up",
          title: "Catching Up with an Old Friend",
          context:
            "You bump into a Japanese friend you haven't seen in several months. You catch up over a quick coffee and share what's been going on in your lives.",
          userGoal:
            "Share updates about your life, ask about theirs, and make plans to meet again.",
          agentRole: "Old friend you haven't seen in months (久しぶりの友達)",
          setting: "Coffee shop or street corner in Tokyo",
          beats: [
            {
              speaker: "agent",
              intent: "Express surprise and delight at running into them.",
              example: "え、久しぶり！元気だった？最近どうしてた？",
            },
            {
              speaker: "user",
              intent: "Share what you've been up to recently.",
            },
            {
              speaker: "agent",
              intent: "React and share their own recent news or a life update.",
            },
            {
              speaker: "user",
              intent: "Suggest meeting up properly soon and make a loose plan.",
            },
          ],
          vocabulary: [
            "久しぶり (long time no see)",
            "元気 (well / energetic)",
            "近況 (recent news / update on life)",
            "そういえば (come to think of it / by the way)",
            "ぜひ (by all means / definitely)",
            "また連絡するね (I'll be in touch)",
          ],
          grammarFocus: [
            "久しぶりですね (it's been a while, polite)",
            "〜どうだった? (how was ~ , casual)",
            "今度〜しようよ (let's ~ sometime, casual)",
          ],
        },
      ],
    },
  ],
};
