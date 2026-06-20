import type { Topic } from "../../../types.ts";

export const HK_HEALTH: Topic = {
  id: "health",
  emoji: "🏥",
  name: "Health",
  description: "Symptoms, doctor, pharmacy",
  subtopics: [
    {
      id: "feeling-unwell",
      name: "Feeling Unwell",
      description: "Describe symptoms and get help at a pharmacy or clinic.",
      setting: "Pharmacy or clinic in Hong Kong",
      agentRole: "Pharmacist or doctor's receptionist",
      scenarios: [
        {
          id: "pharmacy-visit",
          title: "At the Pharmacy",
          context:
            "You've been feeling under the weather for a couple of days. You walk into a pharmacy in Hong Kong to describe your symptoms and ask for medicine.",
          userGoal:
            "Describe your symptoms clearly and get the right medicine or advice.",
          agentRole: "Pharmacist (藥劑師)",
          setting: "Pharmacy in Hong Kong",
          beats: [
            {
              speaker: "agent",
              intent: "Greet and ask what the problem is.",
              example: "你好！有咩可以幫到你？係咪唔舒服嚟㗎？",
            },
            {
              speaker: "user",
              intent:
                "Explain your symptoms — e.g. sore throat, headache, or runny nose.",
            },
            {
              speaker: "agent",
              intent:
                "Ask follow-up questions — how long, any fever, any allergies to medicine.",
            },
            {
              speaker: "user",
              intent:
                "Answer the questions and ask if there's something to help.",
            },
          ],
          vocabulary: [
            "唔舒服 (unwell)",
            "頭痛 (headache)",
            "喉嚨痛 (sore throat)",
            "發燒 (fever)",
            "流鼻水 (runny nose)",
            "咳 (cough)",
            "過敏 (allergy)",
          ],
          grammarFocus: [
            "我感覺… (I feel)",
            "痛咗幾耐 (how long has it been hurting)",
            "有冇發燒 (do you have a fever)",
          ],
        },
        {
          id: "calling-in-sick",
          title: "Calling in Sick",
          context:
            "You wake up feeling genuinely awful and can't make it to work or class today. You need to call your boss or teacher to let them know.",
          userGoal:
            "Explain that you're sick, describe your symptoms briefly, and ask about what you'll miss.",
          agentRole: "Your manager or teacher (上司/老師)",
          setting: "Phone call — you're in bed, they're at work or school",
          beats: [
            {
              speaker: "agent",
              intent: "Answer the call and greet you.",
              example: "喂，你好，係咩事呀？",
            },
            {
              speaker: "user",
              intent:
                "Apologise and explain that you're sick and can't come in.",
            },
            {
              speaker: "agent",
              intent: "Ask what's wrong and whether you've seen a doctor.",
            },
            {
              speaker: "user",
              intent:
                "Describe your symptoms briefly and ask if there's anything urgent you need to handle.",
            },
          ],
          vocabulary: [
            "唔舒服 (unwell)",
            "請假 (take leave)",
            "唔得閒嚟 (can't make it)",
            "睇醫生 (see a doctor)",
            "藥 (medicine)",
            "休息 (rest)",
          ],
          grammarFocus: [
            "唔好意思，我… (sorry, I…)",
            "有咩嘢需要… (is there anything that needs…)",
            "請病假 (take sick leave)",
          ],
        },
      ],
    },
  ],
};
