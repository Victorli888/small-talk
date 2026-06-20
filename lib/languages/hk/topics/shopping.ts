import type { Topic } from "../../../types.ts";

export const HK_SHOPPING: Topic = {
  id: "shopping",
  emoji: "🛍️",
  name: "Shopping",
  description: "Prices, bargaining, transactions",
  subtopics: [
    {
      id: "market-and-shops",
      name: "Markets & Shops",
      description: "Buy things, negotiate prices, and handle exchanges.",
      setting: "Hong Kong street market or retail shop",
      agentRole: "Shop owner or sales staff",
      scenarios: [
        {
          id: "market-bargain",
          title: "Bargaining at a Market Stall",
          context:
            "You're browsing a street market in Hong Kong. You spot something you like at a stall but the price seems a bit high.",
          userGoal:
            "Ask the price, try to negotiate a discount, and decide whether to buy.",
          agentRole: "Market stall owner (市場檔主)",
          setting: "Outdoor street market stall in Hong Kong",
          beats: [
            {
              speaker: "agent",
              intent: "Greet the customer and encourage them to browse.",
              example: "靚嘢㗎！你睇吓先，想搵咩款式㗎？",
            },
            {
              speaker: "user",
              intent: "Pick something you like and ask how much it costs.",
            },
            {
              speaker: "agent",
              intent: "Give the price, possibly exaggerated for negotiation.",
            },
            {
              speaker: "user",
              intent: "Try to negotiate a lower price.",
            },
          ],
          vocabulary: [
            "幾錢 (how much)",
            "太貴 (too expensive)",
            "平啲得唔得 (can you make it cheaper)",
            "最平都要 (the cheapest is)",
            "買兩件 (buy two)",
            "收據 (receipt)",
          ],
          grammarFocus: [
            "幾多錢 (how much is it)",
            "平啲得唔得 (can you go cheaper)",
            "可唔可以… (can you…)",
          ],
        },
        {
          id: "size-exchange",
          title: "Asking About Sizes",
          context:
            "You're in a clothing shop in Hong Kong. You've found something you like but you're not sure about the sizing — Hong Kong sizes can run differently.",
          userGoal:
            "Ask about available sizes, try something on, and decide whether to buy or exchange.",
          agentRole: "Shop assistant in a clothing store (售貨員)",
          setting: "Clothing shop in a Hong Kong shopping mall",
          beats: [
            {
              speaker: "agent",
              intent: "Offer assistance to the browsing customer.",
              example: "你好！需要幫手嗎？想搵咩碼數呀？",
            },
            {
              speaker: "user",
              intent: "Ask if a specific item comes in your size.",
            },
            {
              speaker: "agent",
              intent:
                "Check stock and offer to find the right size or suggest trying it on.",
            },
            {
              speaker: "user",
              intent:
                "Ask about the fitting room and the return or exchange policy.",
            },
          ],
          vocabulary: [
            "碼數 (size)",
            "試身室 (fitting room)",
            "換貨 (exchange)",
            "退款 (refund)",
            "有冇大一碼 (do you have one size up)",
            "啱唔啱身 (does it fit)",
          ],
          grammarFocus: [
            "有冇… (do you have)",
            "可唔可以試 (can I try)",
            "換一換 (exchange)",
          ],
        },
      ],
    },
  ],
};
