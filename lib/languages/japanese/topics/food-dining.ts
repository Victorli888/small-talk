import type { Topic } from "../../../types.ts";

export const FOOD_DINING_TOPIC: Topic = {
  id: "food-dining",
  emoji: "🍜",
  name: "Food & Dining",
  description: "Ordering, preferences, restaurants",
  subtopics: [
    {
      id: "restaurant-ordering",
      name: "レストランで",
      description: "Order food and drinks at Japanese restaurants.",
      setting: "Various Japanese restaurants and eateries",
      agentRole: "Waiter or waitress",
      scenarios: [
        {
          id: "ramen-shop",
          title: "Ordering at a Ramen Shop",
          context:
            "You've found a popular ramen shop recommended by a local. You go in alone and sit at the counter. The staff comes over to take your order.",
          userGoal:
            "Order ramen, customize it to your taste (broth, toppings, noodle firmness), and ask about the popular choices.",
          agentRole: "Ramen shop staff (店員)",
          setting: "Busy ramen shop in Tokyo, counter seating",
          beats: [
            {
              speaker: "agent",
              intent: "Welcome the customer and ask what they'd like.",
              example: "いらっしゃいませ！ご注文はお決まりですか？",
            },
            {
              speaker: "user",
              intent:
                "Ask what the most popular ramen is or what they recommend.",
            },
            {
              speaker: "agent",
              intent:
                "Recommend the signature dish and ask about preferences (spice, toppings, noodle firmness).",
            },
            {
              speaker: "user",
              intent: "Customise your order and confirm it.",
            },
          ],
          vocabulary: [
            "ご注文 (your order)",
            "おすすめ (recommendation)",
            "麺の硬さ (noodle firmness)",
            "替え玉 (extra noodles)",
            "トッピング (toppings)",
            "辛さ (spiciness level)",
          ],
          grammarFocus: [
            "〜をください (please give me ~)",
            "〜にします (I'll have ~, I'll go with ~)",
            "〜はありますか (do you have ~)",
          ],
        },
        {
          id: "izakaya",
          title: "At an Izakaya with Coworkers",
          context:
            "It's Friday evening and your Japanese coworkers have invited you to an izakaya (Japanese pub) after work. You're seated at a low table with drinks and a menu.",
          userGoal:
            "Order drinks and food, respond to toasts, and participate in the casual dining atmosphere.",
          agentRole: "Izakaya staff member (店員)",
          setting: "Lively izakaya in Shinjuku after work",
          beats: [
            {
              speaker: "agent",
              intent: "Greet the group and ask for drink orders to start.",
              example: "いらっしゃいませ！まずお飲み物からいかがですか？",
            },
            {
              speaker: "user",
              intent: "Order a drink and ask what's good to eat.",
            },
            {
              speaker: "agent",
              intent:
                "Suggest popular dishes and ask about any food restrictions.",
            },
            {
              speaker: "user",
              intent:
                "Order food, mention any preferences, and confirm the order.",
            },
          ],
          vocabulary: [
            "乾杯 (cheers / toast)",
            "おつまみ (bar snacks / side dishes)",
            "生ビール (draft beer)",
            "アレルギー (allergy)",
            "おかわり (refill / another round)",
            "〆 (last dish / finish of a meal)",
          ],
          grammarFocus: [
            "〜をお願いします (please bring me ~, polite request)",
            "〜は大丈夫ですか (is ~ okay? / do you have ~?)",
            "〜にしようかな (I think I'll go with ~, casual)",
          ],
        },
      ],
    },
  ],
};
