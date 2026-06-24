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
              intent: "Greet the customer and ask if they have a point card."
            },
            {
              speaker: "user",
              intent: "Respond about the point card and ask to have the bento heated.",
            },
            {
              speaker: "agent",
              intent: "Ask if they need a bag",
            },
            {
              speaker: "user",
              intent: "Decide if bag is necessary.",
            },
            {
              speaker: "agent",
              intent: "Confirm the total",
            },
            {
              speaker: "user",
              intent: "Decide how to pay",
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
          id: "convenience-store-alcohol",
          title: "Buying Alcohol at the Convenience Store",
          context:
            "It's a warm evening and you stop at a convenience store to grab a canned chu-hai or beer before heading home. At the register, the cashier needs you to confirm your age on the touchscreen.",
          userGoal:
            "Buy one alcoholic drink, confirm your age on the register screen when asked, and complete the payment.",
          agentRole: "Konbini cashier (コンビニ店員)",
          setting: "FamilyMart or 7-Eleven convenience store",
          beats: [
            {
              speaker: "agent",
              intent:
                "Greet the customer and scan the alcoholic drink.",
              example: "いらっしゃいませ。こちらお預かりします。",
            },
            {
              speaker: "agent",
              intent:
                "Ask the customer to confirm their age by tapping the button on the register screen.",
              example:
                "お酒が含まれていますので、画面のボタンで年齢確認をお願いします。二十歳以上の方は「はい」を押してください。",
            },
            {
              speaker: "user",
              intent:
                "Confirm you understand and say you've pressed the age-confirmation button on the screen.",
            },
            {
              speaker: "agent",
              intent: "Ask if they need a bag for the drink.",
            },
            {
              speaker: "user",
              intent: "Respond about the bag.",
            },
            {
              speaker: "agent",
              intent: "State the total and ask about payment method.",
            },
            {
              speaker: "user",
              intent: "Pay and thank the cashier.",
            },
          ],
          vocabulary: [
            "お酒 (alcohol)",
            "年齢確認 (age verification)",
            "画面 (screen)",
            "ボタン (button)",
            "二十歳以上 (20 years old or older)",
            "はい (yes — on-screen confirmation)",
            "缶ビール (canned beer)",
            "チューハイ (chu-hai / shochu highball)",
            "袋は必要ですか (do you need a bag?)",
            "〜円になります (that comes to ~ yen)",
          ],
          grammarFocus: [
            "〜をお願いします (please do ~)",
            "〜を押してください (please press ~)",
            "〜が含まれています (~ is included / contains ~)",
            "大丈夫です (that's fine / no thanks)",
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
                "Say you like a jacket and ask if they have a larger size.",
            },
            {
              speaker: "agent",
              intent:
                "Check stock and offer to bring the right size or suggest another colour.",
            },
            {
              speaker: "user",
              intent: "take or don't take the jacket. thank them for the help end the conversation",
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
        {
          id: "clothing-try-on-decline",
          title: "Trying On and Politely Declining",
          context:
            "You're browsing a clothing store and find a shirt or dress that catches your eye. The staff helps you try it on, but after seeing it in the mirror you decide it's not quite right — you want to leave politely without buying.",
          userGoal:
            "Ask to try on an item, use the fitting room, and politely tell the staff you're not buying this time while thanking them for their help.",
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
                "Point out an item you like and ask if you may try it on.",
            },
            {
              speaker: "agent",
              intent:
                "Agree and direct you to the fitting room, or offer to bring a different size.",
            },
            {
              speaker: "user",
              intent:
                "Try on the item and return to the shop floor.",
            },
            {
              speaker: "agent",
              intent:
                "Ask how it fits and whether you'd like to take it.",
              example: "いかがですか？お気に入りですか？",
            },
            {
              speaker: "user",
              intent:
                "Politely decline — it doesn't feel right this time — and thank them for their help.",
              example: "今回は大丈夫です。ありがとうございます。",
            },
            {
              speaker: "agent",
              intent:"Tell them no worries and let them know if they need to try anything else to simply comeback.",
            },
          ],
          vocabulary: [
            "試着 (trying on clothes)",
            "試着室 (fitting room)",
            "今回は大丈夫です (not this time / I'll pass for now)",
            "お気に入り (something you like / favourite)",
            "似合う (to suit / look good on)",
            "サイズが合う (to fit)",
            "また来ます (I'll come again)",
            "すみません (excuse me / sorry)",
          ],
          grammarFocus: [
            "試着してもいいですか (may I try this on)",
            "今回は〜 (for this time / on this occasion)",
            "〜てみましたが (I tried ~ but)",
            "ありがとうございました (thank you — past tense, leaving the shop)",
          ],
        },
        {
          id: "window-shopping",
          title: "Window Shopping — Just Looking",
          context:
            "You're wandering through a shopping mall and step into a store to browse. You're not planning to buy anything today — you just want to look around without pressure from the staff.",
          userGoal:
            "Politely decline the staff's offer of help, say you're just looking, browse briefly, and move on without awkwardness.",
          agentRole: "Shop assistant (販売スタッフ)",
          setting: "Boutique or retail store in a Tokyo shopping mall",
          beats: [
            {
              speaker: "agent",
              intent: "Greet and ask if you're looking for something specific.",
              example: "いらっしゃいませ！何かお探しですか？",
            },
            {
              speaker: "user",
              intent: "Politely say you're fine and just browsing — no help needed for now.",
              example: "大丈夫です、見ているだけです。ありがとうございます。",
            },
            {
              speaker: "agent",
              intent: "Accept gracefully and invite you to browse at your own pace.",
              example: "かしこまりました。ごゆっくりどうぞ。",
            },
            {
              speaker: "agent",
              intent: "See you off warmly and invite you to come back anytime.",
            },
          ],
          vocabulary: [
            "見ているだけ (just looking / only browsing)",
            "見るだけ (just to look)",
            "ゆっくりどうぞ (please take your time)",
            "何かお探しですか (are you looking for something?)",
            "かしこまりました (certainly / understood — polite)",
            "のぞき見 (window shopping)",
            "また来ます (I'll come again)",
          ],
          grammarFocus: [
            "〜だけです (I'm only ~ / just ~)",
            "見ているだけです (I'm just looking)",
            "大丈夫です (I'm fine / no thanks)",
            "ごゆっくりどうぞ (please take your time browsing)",
          ],
        },
        {
          id: "watch-tax-free",
          title: "Buying a Watch (Tax-Free)",
          context:
            "You're visiting Japan and browsing watches at a luxury watch boutique in Ginza. You've found a model you like and want to know the price, whether tax-free applies, and what's needed to complete the purchase.",
          userGoal:
            "Ask about the watch price, confirm tax-free eligibility, understand what documents are required, and decide whether to buy.",
          agentRole: "Watch boutique sales associate (時計店の販売スタッフ)",
          setting: "Luxury watch boutique in Ginza, Tokyo",
          beats: [
            {
              speaker: "agent",
              intent: "Greet the customer and offer to help them browse watches.",
              example: "いらっしゃいませ！どのようなお時計をお探しですか？",
            },
            {
              speaker: "user",
              intent: "Say you're interested in a specific watch and ask the price.",
            },
            {
              speaker: "agent",
              intent: "present the price and mention that tax-free shopping may be available for visitors.",
            },
            {
              speaker: "user",
              intent: "Ask whether the purchase qualifies for tax-free and what the tax-free price would be.",
            },
            {
              speaker: "agent",
              intent: "Explain tax-free eligibility, passport requirement, and that the item must leave Japan.",
            },
            {
              speaker: "user",
              intent: "Confirm you have your passport and ask about payment or warranty details.",
            },
            {
              speaker: "agent",
              intent: "Confirm documents needed, explain the tax-free procedure, and offer to proceed with purchase.",
            },
          ],
          vocabulary: [
            "時計 (watch)",
            "免税 (tax-free)",
            "消費税 (consumption tax)",
            "パスポート (passport)",
            "免税手続き (tax-free procedure)",
            "保証書 (warranty card)",
            "お会計 (the total / bill)",
            "〜円 (price in yen)",
            "日本から持ち出す (take out of Japan)",
          ],
          grammarFocus: [
            "〜はいくらですか (how much is ~)",
            "免税にできますか (can this be tax-free?)",
            "〜が必要です (~ is required)",
            "免税は使えますか (can I use tax-free?)",
          ],
        },
        {
          id: "hangover-supplement",
          title: "Buying a Hangover Supplement",
          context:
            "You have a company drinking party (飲み会) tonight and want to pick up a hangover-prevention supplement. You stop at a drugstore (ドラッグストア) like Matsumoto Kiyoshi on your way home from work.",
          userGoal:
            "Ask for a post-drinking supplement like Ukon Chikara or Hepalyse, understand when and how to take it, compare options, and buy the right one.",
          agentRole: "Drugstore clerk (ドラッグストア店員)",
          setting: "Matsumoto Kiyoshi or Welcia drugstore",
          beats: [
            {
              speaker: "agent",
              intent: "Greet and ask if you need help finding something.",
              example: "いらっしゃいませ！何かお探しですか？",
            },
            {
              speaker: "user",
              intent:
                "Explain you have a drinking party tonight and want something for hangover prevention or recovery.",
            },
            {
              speaker: "agent",
              intent:
                "Recommend popular options like ウコンの力 or ヘパリーゼ and explain whether to take before or after drinking.",
            },
            {
              speaker: "user",
              intent:
                "Ask about the difference between products or which is better for drinking tonight.",
            },
            {
              speaker: "agent",
              intent:
                "Compare the products briefly — turmeric-based vs liver support — and mention how many to take.",
            },
            {
              speaker: "user",
              intent:
                "Ask about price, single-dose vs multi-pack, or whether there's a smaller trial size.",
            },
            {
              speaker: "agent",
              intent:
                "Give the price, show single and multi-pack options, and confirm which one you'd like.",
            },
            {
              speaker: "user",
              intent: "Choose a product and proceed to pay.",
            },
          ],
          vocabulary: [
            "飲み会 (drinking party / nomikai)",
            "二日酔い (hangover)",
            "ウコンの力 (Ukon Chikara — turmeric supplement)",
            "ヘパリーゼ (Hepalyse — liver support supplement)",
            "飲む前 (before drinking)",
            "飲んだ後 (after drinking)",
            "サプリメント (supplement)",
            "単品 (single item / one dose)",
            "まとめ買い (buying in bulk / multi-pack)",
            "酔いどめ (hangover prevention)",
            "おすすめ (recommendation)",
          ],
          grammarFocus: [
            "〜を探しています (I'm looking for ~)",
            "〜のほうがいいですか (is ~ better?)",
            "飲む前に飲めばいいですか (should I take it before drinking?)",
            "〜と〜、どちらがおすすめですか (which do you recommend, ~ or ~)",
          ],
        },
      ],
    },
  ],
};
