import type { Topic } from "../../../types.ts";

export const TECHNOLOGY_TOPIC: Topic = {
  id: "technology",
  emoji: "📱",
  name: "Technology",
  description: "Phones, apps, internet",
  subtopics: [
    {
      id: "digital-life",
      name: "デジタルライフ",
      description: "Talk about smartphones, apps, and tech in daily life.",
      setting: "Casual conversation or phone shop",
      agentRole: "Friend or phone shop staff",
      scenarios: [
        {
          id: "apps-chat",
          title: "Chatting About Apps and Phones",
          context:
            "You're having lunch with a Japanese friend and the conversation turns to smartphones and apps — what you use, what you like, and what's popular in Japan.",
          userGoal:
            "Share what apps you use, ask about popular Japanese apps, and exchange tips.",
          agentRole: "Tech-savvy Japanese friend (友達)",
          setting: "Lunch conversation at a cafe",
          beats: [
            {
              speaker: "agent",
              intent: "Ask what apps the learner uses most on their phone.",
              example:
                "ねえ、スマホで一番よく使うアプリって何？最近気に入ってるのある？",
            },
            {
              speaker: "user",
              intent:
                "Share the apps you use most and what you like about them.",
            },
            {
              speaker: "agent",
              intent:
                "Recommend a popular Japanese app and explain what it does.",
            },
            {
              speaker: "user",
              intent:
                "Ask for more details about the app and say you'll try it.",
            },
          ],
          vocabulary: [
            "アプリ (app)",
            "ダウンロードする (to download)",
            "便利 (convenient / useful)",
            "通知 (notification)",
            "〜の機能 (feature of ~)",
            "おすすめ (recommendation)",
          ],
          grammarFocus: [
            "〜をよく使います (I often use ~)",
            "〜という機能があって (there's a feature called ~ / it has a feature that...)",
            "ぜひ試してみます (I'll definitely try it)",
          ],
        },
        {
          id: "phone-shop",
          title: "At the Phone Shop",
          context:
            "Your phone screen has cracked and you need a repair or possibly a new phone. You visit a Japanese mobile phone shop (携帯ショップ) for help.",
          userGoal:
            "Explain the problem with your phone, find out the repair cost, and decide whether to repair or upgrade.",
          agentRole: "Phone shop staff (携帯ショップの店員)",
          setting: "Mobile phone shop in Japan",
          beats: [
            {
              speaker: "agent",
              intent: "Greet and ask what the customer needs.",
              example: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            },
            {
              speaker: "user",
              intent: "Show the cracked screen and ask about repair options.",
            },
            {
              speaker: "agent",
              intent:
                "Explain the repair cost and time, and mention upgrade options.",
            },
            {
              speaker: "user",
              intent: "Ask to compare repair vs. a new phone and decide.",
            },
          ],
          vocabulary: [
            "画面が割れる (screen cracks / is cracked)",
            "修理 (repair)",
            "機種変更 (changing phone model / upgrade)",
            "費用 (cost)",
            "データ移行 (data transfer)",
            "保証 (warranty)",
          ],
          grammarFocus: [
            "〜が壊れてしまって (~ has broken / got damaged)",
            "〜と〜ではどちらがいいですか (which is better, ~ or ~)",
            "どのくらいかかりますか (how long / how much will it take)",
          ],
        },
      ],
    },
  ],
};
