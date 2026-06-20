import type { Topic } from "../../../types.ts";

export const HK_DIRECTIONS: Topic = {
  id: "directions",
  emoji: "🗺️",
  name: "Directions",
  description: "Navigation, transport, landmarks",
  subtopics: [
    {
      id: "getting-around",
      name: "Getting Around Hong Kong",
      description: "Ask locals for directions and navigate the city.",
      setting: "Streets, MTR stations, and taxis in Hong Kong",
      agentRole: "Local resident or taxi driver",
      scenarios: [
        {
          id: "asking-local",
          title: "Asking a Local for Directions",
          context:
            "You're exploring a neighbourhood on foot and realise you've lost your way. You spot a local who looks like they know the area.",
          userGoal:
            "Ask for walking directions to a nearby landmark or MTR station.",
          agentRole: "Local Hong Kong resident (街坊)",
          setting: "A busy street in Hong Kong",
          beats: [
            {
              speaker: "user",
              intent:
                "Politely stop the local and ask for directions to a specific place.",
            },
            {
              speaker: "agent",
              intent: "Respond helpfully and give walking directions.",
              example: "係呀，唔係好遠㗎。你直行，過咗個紅綠燈之後轉左。",
            },
            {
              speaker: "user",
              intent: "Ask how far it is or how long it takes to walk.",
            },
            {
              speaker: "agent",
              intent:
                "Give an estimate and mention a landmark to look out for.",
            },
          ],
          vocabulary: [
            "唔該 (excuse me / thank you)",
            "直行 (go straight)",
            "轉左/右 (turn left/right)",
            "紅綠燈 (traffic lights)",
            "幾遠 (how far)",
            "行幾耐 (how long to walk)",
          ],
          grammarFocus: [
            "點去… (how to get to)",
            "過咗…之後 (after passing)",
            "喺…附近 (near)",
          ],
        },
        {
          id: "taxi-direction",
          title: "Giving a Taxi Driver Directions",
          context:
            "You flag down a red taxi in Hong Kong and slide in. The driver asks where you're going — but your destination needs a bit of explaining.",
          userGoal:
            "Tell the taxi driver your destination and clarify the exact drop-off point.",
          agentRole: "Taxi driver (的士司機)",
          setting: "Inside a Hong Kong red taxi",
          beats: [
            {
              speaker: "agent",
              intent: "Ask the passenger where they want to go.",
              example: "你好！去邊度呀？",
            },
            {
              speaker: "user",
              intent:
                "State your destination and mention a nearby landmark if needed.",
            },
            {
              speaker: "agent",
              intent:
                "Confirm the destination and warn about possible traffic.",
            },
            {
              speaker: "user",
              intent:
                "Ask how long it'll take and clarify the exact drop-off spot.",
            },
          ],
          vocabulary: [
            "的士 (taxi)",
            "去…度 (going to)",
            "附近 (nearby/near)",
            "塞車 (traffic jam)",
            "落車 (get off / drop off)",
            "大概 (approximately)",
          ],
          grammarFocus: [
            "去邊度 (where are you going)",
            "落喺…度 (drop me at)",
            "大概幾耐 (approximately how long)",
          ],
        },
      ],
    },
  ],
};
