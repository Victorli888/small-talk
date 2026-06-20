import type { Topic } from "../../../types.ts";

export const HK_DAILY_ROUTINES: Topic = {
  id: "daily-routines",
  emoji: "🌅",
  name: "Daily Routines",
  description: "Schedules, habits, typical day",
  subtopics: [
    {
      id: "daily-chat",
      name: "Catching Up",
      description: "Chat about your week, morning routine, and daily habits.",
      setting: "Casual conversation — café, park, or phone call",
      agentRole: "Friend or classmate",
      scenarios: [
        {
          id: "weekend-recap",
          title: "Weekend Catch-Up",
          context:
            "You bump into a friend you haven't seen in a while. You start chatting about what you've been up to recently.",
          userGoal:
            "Talk about what you did over the weekend and ask what your friend has been up to.",
          agentRole: "Old friend you ran into (舊朋友)",
          setting: "Street in Hong Kong, casual encounter",
          beats: [
            {
              speaker: "agent",
              intent:
                "Express surprise at seeing you and ask how things have been.",
              example: "哇！好耐冇見喇！最近點呀？係咪好忙㗎？",
            },
            {
              speaker: "user",
              intent:
                "Say how you've been and mention something you did last weekend.",
            },
            {
              speaker: "agent",
              intent:
                "React to what they said and share what you did over the weekend.",
            },
            {
              speaker: "user",
              intent: "Ask about their plans for the coming weekend.",
            },
          ],
          vocabulary: [
            "最近 (recently)",
            "上個週末 (last weekend)",
            "得閒 (free time)",
            "好忙 (very busy)",
            "放假 (day off/holiday)",
            "通常 (usually)",
          ],
          grammarFocus: [
            "我通常… (I usually)",
            "上個週末我去咗… (last weekend I went to)",
            "你呢 (what about you)",
          ],
        },
        {
          id: "morning-routine",
          title: "Talking About Morning Routines",
          context:
            "You're having breakfast with a classmate and they ask how you start your day — turns out your morning routines are very different.",
          userGoal:
            "Describe your typical morning routine step by step and compare with your classmate's.",
          agentRole: "Classmate having breakfast with you (同學)",
          setting: "School canteen or café in the morning",
          beats: [
            {
              speaker: "agent",
              intent: "Ask what time you usually wake up.",
              example: "你平時幾點起身㗎？我係六點就起㗎喇，你呢？",
            },
            {
              speaker: "user",
              intent:
                "Say what time you wake up and describe your morning steps.",
            },
            {
              speaker: "agent",
              intent:
                "React with surprise or agreement and share your own morning routine.",
            },
            {
              speaker: "user",
              intent:
                "Comment on the difference and ask if they eat breakfast every day.",
            },
          ],
          vocabulary: [
            "起身 (wake up)",
            "幾點 (what time)",
            "食早餐 (eat breakfast)",
            "沖涼 (shower)",
            "出門 (leave the house)",
            "平時 (usually/normally)",
          ],
          grammarFocus: [
            "先…然後… (first…then…)",
            "幾點 (what time)",
            "每日 (every day)",
          ],
        },
      ],
    },
  ],
};
