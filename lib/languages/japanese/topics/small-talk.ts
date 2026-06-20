import type { Topic } from "../../../types.ts";

export const SMALL_TALK_TOPIC: Topic = {
  id: "small-talk",
  emoji: "💬",
  name: "Small Talk",
  description: "Greetings, opinions, casual chat",
  subtopics: [
    {
      id: "everyday-chat",
      name: "日常会話",
      description: "Make casual conversation in everyday situations.",
      setting: "Everyday Japan settings",
      agentRole: "Neighbour, coworker, or acquaintance",
      scenarios: [
        {
          id: "weather-chat",
          title: "Chatting About the Weather",
          context:
            "You run into your neighbour in the hallway of your apartment building. It's been raining all week and the topic naturally comes up.",
          userGoal:
            "Make casual small talk about the weather, the season, and weekend plans.",
          agentRole: "Friendly neighbour (近所の方)",
          setting: "Apartment building hallway in Tokyo",
          beats: [
            {
              speaker: "agent",
              intent: "Greet and comment on the bad weather recently.",
              example:
                "あ、こんにちは！最近ずっと雨ですね〜。いや〜、梅雨はつらいですよね。",
            },
            {
              speaker: "user",
              intent: "Agree and share your feelings about the rainy season.",
            },
            {
              speaker: "agent",
              intent:
                "Ask what they plan to do this weekend given the weather.",
            },
            {
              speaker: "user",
              intent: "Share your weekend plans and ask about theirs.",
            },
          ],
          vocabulary: [
            "梅雨 (rainy season / tsuyu)",
            "蒸し暑い (hot and humid)",
            "晴れる (to become sunny)",
            "週末 (weekend)",
            "〜でも (even so / something like ~)",
            "引きこもる (to stay at home / hibernate)",
          ],
          grammarFocus: [
            "〜ですね (isn't it ~, seeking agreement)",
            "〜でしたね (it was ~, wasn't it)",
            "〜つもりです (I plan to ~)",
          ],
        },
        {
          id: "weekend-plans",
          title: "Weekend Plans with a Coworker",
          context:
            "It's Friday afternoon and you're wrapping up work. A coworker stops by your desk for a quick chat before the weekend.",
          userGoal:
            "Share your weekend plans, ask about theirs, and keep the conversation light and friendly.",
          agentRole: "Friendly coworker (同僚)",
          setting: "Office, Friday afternoon",
          beats: [
            {
              speaker: "agent",
              intent: "Start chatting casually about weekend plans.",
              example: "お疲れ様です！もうすぐ週末ですね。何か予定ありますか？",
            },
            {
              speaker: "user",
              intent: "Share your weekend plans.",
            },
            {
              speaker: "agent",
              intent: "React positively and share their own plans.",
            },
            {
              speaker: "user",
              intent: "Ask a follow-up question about their plans.",
            },
          ],
          vocabulary: [
            "お疲れ様です (good work / standard colleague greeting)",
            "予定 (plans / schedule)",
            "楽しみ (looking forward to / fun)",
            "〜に行く予定 (plan to go to ~)",
            "リフレッシュ (refresh / recharge)",
            "ゆっくりする (to take it easy / relax)",
          ],
          grammarFocus: [
            "〜する予定です (I plan to ~)",
            "いいですね！(that sounds good!)",
            "〜はどうでしたか (how was ~)",
          ],
        },
      ],
    },
  ],
};
