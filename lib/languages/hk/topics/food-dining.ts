import type { Topic } from "../../../types.ts";

export const HK_FOOD_DINING: Topic = {
  id: "food-dining",
  emoji: "🍜",
  name: "Food & Dining",
  description: "Ordering, preferences, restaurants",
  subtopics: [
    {
      id: "cha-chaan-teng",
      name: "Cha Chaan Teng",
      description: "Order food and drinks at a classic Hong Kong café.",
      setting: "Cha chaan teng (茶餐廳) — Hong Kong-style diner",
      agentRole: "Waiter or waitress",
      scenarios: [
        {
          id: "ordering-meal",
          title: "Ordering a Set Meal",
          context:
            "You've just sat down at a busy cha chaan teng. A waiter comes over with a notepad. You want to order a set lunch.",
          userGoal:
            "Order a set meal, specify your drink preference (hot or cold), and ask about what comes with the set.",
          agentRole: "Cha chaan teng waiter (侍應)",
          setting: "Bustling cha chaan teng at lunchtime",
          beats: [
            {
              speaker: "agent",
              intent: "Greet and ask what the customer wants to order.",
              example: "你好！食咩呀？要睇吓餐牌定係已經知㗎喇？",
            },
            {
              speaker: "user",
              intent:
                "Order a set meal and ask what drinks are available or included.",
            },
            {
              speaker: "agent",
              intent:
                "List drink options and ask if they want it hot or cold, with or without sugar.",
            },
            {
              speaker: "user",
              intent: "Specify the drink preference and confirm the order.",
            },
          ],
          vocabulary: [
            "餐牌 (menu)",
            "套餐 (set meal)",
            "凍/熱 (cold/hot)",
            "少糖 (less sugar)",
            "走甜 (no sugar)",
            "埋單 (the bill)",
            "例湯 (soup of the day)",
          ],
          grammarFocus: [
            "我要… (I want)",
            "有冇… (do you have)",
            "凍定熱 (cold or hot)",
          ],
        },
        {
          id: "asking-recommendations",
          title: "Asking for Recommendations",
          context:
            "You've come to a cha chaan teng for the first time and aren't sure what to order. The waiter seems to know the menu well.",
          userGoal:
            "Ask the waiter what's popular or recommended and make a decision based on their suggestions.",
          agentRole: "Helpful waiter who knows the menu well (侍應)",
          setting: "Cha chaan teng, quieter mid-afternoon",
          beats: [
            {
              speaker: "agent",
              intent: "Welcome the customer and offer to help with the menu.",
              example: "係第一次嚟咩？唔緊要，我推介你試吓我哋招牌嘢食。",
            },
            {
              speaker: "user",
              intent: "Ask what the most popular dishes are.",
            },
            {
              speaker: "agent",
              intent:
                "Recommend 2–3 popular dishes and explain what makes each one special.",
            },
            {
              speaker: "user",
              intent:
                "Pick one and confirm the order, possibly asking about portion size.",
            },
          ],
          vocabulary: [
            "推介 (recommend)",
            "招牌 (signature dish)",
            "好食 (delicious)",
            "份量 (portion size)",
            "受歡迎 (popular)",
            "係咪辣㗎 (is it spicy)",
          ],
          grammarFocus: [
            "有咩好推介 (what do you recommend)",
            "係咪… (is it…)",
            "我試吓… (I'll try)",
          ],
        },
      ],
    },
  ],
};
