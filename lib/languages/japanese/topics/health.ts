import type { Topic } from "../../../types.ts";

export const HEALTH_TOPIC: Topic = {
  id: "health",
  emoji: "🏥",
  name: "Health",
  description: "Symptoms, doctor, pharmacy",
  subtopics: [
    {
      id: "medical",
      name: "体の具合",
      description: "Describe symptoms and handle medical situations.",
      setting: "Pharmacy or clinic in Japan",
      agentRole: "Pharmacist or clinic receptionist",
      scenarios: [
        {
          id: "pharmacy",
          title: "At the Pharmacy",
          context:
            "You've had a bad cold for two days — runny nose, sore throat, and a mild fever. You go to a nearby pharmacy (薬局) to buy medicine.",
          userGoal:
            "Describe your symptoms, ask for the right medicine, and understand the pharmacist's instructions.",
          agentRole: "Pharmacist (薬剤師)",
          setting: "Local pharmacy in Japan",
          beats: [
            {
              speaker: "agent",
              intent: "Greet and ask what the customer needs help with today.",
              example: "いらっしゃいませ。今日はどうされましたか？",
            },
            {
              speaker: "user",
              intent:
                "Describe your symptoms (cold, sore throat, fever, runny nose).",
            },
            {
              speaker: "agent",
              intent:
                "Recommend a suitable medicine and ask about allergies or other medicines being taken.",
            },
            {
              speaker: "user",
              intent:
                "Ask how to take the medicine and confirm there are no contraindications.",
            },
          ],
          vocabulary: [
            "風邪をひく (to catch a cold)",
            "喉が痛い (sore throat)",
            "鼻水 (runny nose)",
            "熱がある (to have a fever)",
            "飲み合わせ (drug interaction)",
            "用法・用量 (dosage / how to take)",
          ],
          grammarFocus: [
            "〜が痛いです (~ hurts / is sore)",
            "〜があります (I have ~, e.g. a fever)",
            "一日〜回飲んでください (please take ~ times a day)",
          ],
        },
        {
          id: "calling-in-sick",
          title: "Calling in Sick",
          context:
            "You wake up feeling terrible — high fever and no energy. You need to call your Japanese workplace to let them know you won't be coming in today.",
          userGoal:
            "Call in sick politely, explain your symptoms, and ask if there's anything urgent that needs covering.",
          agentRole: "Your team leader at work (チームリーダー)",
          setting: "Phone call to the office",
          beats: [
            {
              speaker: "agent",
              intent: "Answer the call and greet the caller.",
              example: "はい、お電話ありがとうございます。どうされましたか？",
            },
            {
              speaker: "user",
              intent:
                "Apologise and explain you're too unwell to come in today.",
            },
            {
              speaker: "agent",
              intent:
                "Express concern, ask about your condition, and mention any urgent work.",
            },
            {
              speaker: "user",
              intent:
                "Acknowledge the urgent item and suggest how it can be handled in your absence.",
            },
          ],
          vocabulary: [
            "体調が悪い (feeling unwell)",
            "お休みをいただきたい (I'd like to take the day off)",
            "ご迷惑をおかけして (I'm sorry for the trouble)",
            "引き継ぎ (handover)",
            "なんとかします (I'll manage / we'll sort it out)",
            "お大事に (take care of yourself)",
          ],
          grammarFocus: [
            "〜をいただけますでしょうか (may I ~, very polite request)",
            "〜させていただきたい (I would like to ~, humble form)",
            "ご迷惑をおかけして申し訳ありません (I'm very sorry for the inconvenience)",
          ],
        },
      ],
    },
  ],
};
