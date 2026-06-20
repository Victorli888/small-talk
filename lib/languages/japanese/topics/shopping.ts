import type { Topic } from "../../../types.ts";

export const SHOPPING_TOPIC: Topic = {
  id: "shopping",
  emoji: "🛍️",
  name: "Shopping",
  description: "Prices, bargaining, transactions",
  subtopics: [
    {
      id: "retail",
      name: "買い物",
      description: "Buy items and handle transactions at Japanese shops.",
      setting: "Various shops in Japan",
      agentRole: "Shop staff",
      scenarios: [
        {
          id: "convenience-store",
          title: "At the Convenience Store",
          context:
            "You've stopped at a convenience store (コンビニ) to grab lunch and pick up a few items. The cashier will help you at checkout.",
          userGoal:
            "Pay for your items, deal with any add-on offers (point cards, bags, heating food), and handle the transaction smoothly.",
          agentRole: "Konbini cashier (コンビニ店員)",
          setting: "FamilyMart or 7-Eleven convenience store",
          beats: [
            {
              speaker: "agent",
              intent: "Greet the customer and ask if they have a point card.",
              example: "いらっしゃいませ！ポイントカードはお持ちですか？",
            },
            {
              speaker: "user",
              intent:
                "Respond about the point card and ask to have the bento heated.",
            },
            {
              speaker: "agent",
              intent: "Ask if they need a bag and confirm the total amount.",
            },
            {
              speaker: "user",
              intent: "Decide about the bag and pay.",
            },
          ],
          vocabulary: [
            "ポイントカード (point / loyalty card)",
            "温めますか (shall I heat it up?)",
            "袋は必要ですか (do you need a bag?)",
            "お会計 (the total / bill)",
            "〜円になります (that comes to ~ yen)",
            "レシート (receipt)",
          ],
          grammarFocus: [
            "〜はお持ちですか (do you have ~, polite)",
            "〜をお願いします (please do ~ / please give me ~)",
            "〜でいいです (~ is fine / I'm okay with ~)",
          ],
        },
        {
          id: "clothing-store",
          title: "Shopping for Clothes",
          context:
            "You're in a clothing store in a Tokyo shopping mall. You've found a jacket you like but you're not sure about the size or colour options.",
          userGoal:
            "Ask about sizes, find out if another colour is available, and ask about the return policy.",
          agentRole: "Clothing store assistant (販売スタッフ)",
          setting: "Clothing store in a Tokyo shopping mall",
          beats: [
            {
              speaker: "agent",
              intent: "Greet and offer assistance.",
              example: "いらっしゃいませ！何かお探しですか？",
            },
            {
              speaker: "user",
              intent:
                "Say you like a jacket and ask if they have a different size.",
            },
            {
              speaker: "agent",
              intent:
                "Check stock and offer to bring the right size or suggest another colour.",
            },
            {
              speaker: "user",
              intent:
                "Ask about the fitting room and return or exchange policy.",
            },
          ],
          vocabulary: [
            "サイズ (size)",
            "試着室 (fitting room)",
            "在庫 (stock / inventory)",
            "交換 (exchange)",
            "返品 (return)",
            "別のカラー (another colour)",
          ],
          grammarFocus: [
            "〜はありますか (do you have ~)",
            "試着してもいいですか (may I try this on)",
            "他のサイズはありますか (do you have another size)",
          ],
        },
      ],
    },
  ],
};
