import type { Topic } from "../../../types.ts";

export const DIRECTIONS_TOPIC: Topic = {
  id: "directions",
  emoji: "🗺️",
  name: "Directions",
  description: "Navigation, transport, landmarks",
  subtopics: [
    {
      id: "getting-around",
      name: "道案内",
      description: "Ask for and give directions around the city.",
      setting: "Tokyo streets and train stations",
      agentRole: "Passerby or station staff",
      scenarios: [
        {
          id: "street-directions",
          title: "Asking Directions on the Street",
          context:
            "You're in a busy part of Tokyo and you're trying to find a well-known temple. You stop a friendly-looking local to ask for directions.",
          userGoal:
            "Ask how to get to the temple, understand the directions, and confirm you've understood.",
          agentRole: "Helpful local on the street (通行人)",
          setting: "Street in Asakusa, Tokyo",
          beats: [
            {
              speaker: "agent",
              intent:
                "Notice the lost-looking foreigner and offer to help before they ask.",
              example: "あの、大丈夫ですか？どこか探してますか？",
            },
            {
              speaker: "user",
              intent: "Ask how to get to the nearby temple.",
            },
            {
              speaker: "agent",
              intent:
                "Give simple directions using landmarks (turn left/right, go straight, you'll see it).",
            },
            {
              speaker: "user",
              intent:
                "Confirm the directions by repeating them back and ask how long it takes to walk.",
            },
          ],
          vocabulary: [
            "まっすぐ (straight ahead)",
            "右/左に曲がる (turn right/left)",
            "〜の前 (in front of ~)",
            "〜を過ぎて (past ~)",
            "歩いて〜分 (~ minutes on foot)",
            "交差点 (intersection)",
          ],
          grammarFocus: [
            "〜はどこですか (where is ~)",
            "〜まで歩いて何分ですか (how many minutes to walk to ~)",
            "〜を右に曲がってください (please turn right at ~)",
          ],
        },
        {
          id: "train-station",
          title: "Navigating at the Train Station",
          context:
            "You're at a busy Tokyo train station and you're confused about which platform to use for your train to Kyoto. You approach the information desk.",
          userGoal:
            "Find out which platform your train departs from, confirm the time, and buy a ticket if needed.",
          agentRole: "Station staff at the information desk (駅員)",
          setting: "Tokyo Station, JR ticket gate area",
          beats: [
            {
              speaker: "agent",
              intent: "Greet the customer and ask how to help.",
              example: "いらっしゃいませ。何かご用でしょうか？",
            },
            {
              speaker: "user",
              intent:
                "Ask which platform the Shinkansen to Kyoto departs from.",
            },
            {
              speaker: "agent",
              intent:
                "Give the platform number and ask if they have a ticket or need to buy one.",
            },
            {
              speaker: "user",
              intent: "Ask how to buy a ticket or confirm your reserved seat.",
            },
          ],
          vocabulary: [
            "〜番線 (platform number ~)",
            "新幹線 (Shinkansen bullet train)",
            "乗り場 (boarding area / platform)",
            "指定席 (reserved seat)",
            "自由席 (non-reserved seat)",
            "改札 (ticket gate)",
          ],
          grammarFocus: [
            "〜は何番線ですか (which platform is ~)",
            "〜行きの電車 (train going to ~)",
            "切符はどこで買えますか (where can I buy a ticket)",
          ],
        },
      ],
    },
  ],
};
