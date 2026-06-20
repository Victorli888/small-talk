import type { Topic } from "../../../types.ts";

export const PROBLEM_SOLVING_TOPIC: Topic = {
  id: "problem-solving",
  emoji: "🔧",
  name: "Problem-Solving",
  description: "Complaints, requests, clarification",
  subtopics: [
    {
      id: "handling-issues",
      name: "困ったとき",
      description: "Handle problems and make requests politely.",
      setting: "Various situations requiring problem-solving",
      agentRole: "Staff member or service provider",
      scenarios: [
        {
          id: "wrong-order",
          title: "Wrong Order at a Restaurant",
          context:
            "You're at a Japanese restaurant and the waiter has brought you the wrong dish. You need to politely point this out and get the correct order.",
          userGoal:
            "Politely explain the mistake, describe what you actually ordered, and wait for the correct dish.",
          agentRole: "Restaurant server (ウェイター)",
          setting: "Japanese restaurant",
          beats: [
            {
              speaker: "agent",
              intent: "Bring a dish to the table and set it down.",
              example: "お待たせしました！こちら〜のご注文ですね？",
            },
            {
              speaker: "user",
              intent:
                "Politely explain that this doesn't seem to be what you ordered.",
            },
            {
              speaker: "agent",
              intent: "Apologise and ask to confirm what was actually ordered.",
            },
            {
              speaker: "user",
              intent:
                "Clearly state what you ordered and ask how long it will take.",
            },
          ],
          vocabulary: [
            "すみません (excuse me / sorry)",
            "注文と違う (different from my order)",
            "間違い (mistake)",
            "確認する (to confirm / check)",
            "お待ちください (please wait)",
            "申し訳ありません (I'm very sorry)",
          ],
          grammarFocus: [
            "〜と違うようなんですが (this seems different from ~)",
            "〜をお願いしたんですが (I asked for ~ / I ordered ~)",
            "どのくらい待ちますか (how long will it take to wait)",
          ],
        },
        {
          id: "lost-item",
          title: "Lost Item at the Train Station",
          context:
            "You've lost your wallet somewhere on the train. You go to the station's lost and found office (遺失物取扱所) to report it and ask for help.",
          userGoal:
            "Explain what you lost, describe it accurately, and find out the process for recovering it.",
          agentRole: "Station staff at lost and found (駅員)",
          setting: "Train station lost and found office",
          beats: [
            {
              speaker: "agent",
              intent: "Greet the customer and ask what happened.",
              example: "はい、どうされましたか？",
            },
            {
              speaker: "user",
              intent:
                "Explain that you lost your wallet on the train and describe it.",
            },
            {
              speaker: "agent",
              intent:
                "Ask for details — which train line, when, and what the item looks like.",
            },
            {
              speaker: "user",
              intent:
                "Give the details and ask what happens next or how to check if it's found.",
            },
          ],
          vocabulary: [
            "忘れ物 (lost item / thing left behind)",
            "遺失物 (lost property)",
            "財布 (wallet)",
            "特徴 (features / description)",
            "連絡先 (contact information)",
            "見つかったら (if it's found)",
          ],
          grammarFocus: [
            "〜を電車の中に忘れてしまいました (I accidentally left ~ on the train)",
            "〜の特徴を教えてください (please describe the features of ~)",
            "見つかり次第ご連絡します (we'll contact you as soon as it's found)",
          ],
        },
      ],
    },
  ],
};
