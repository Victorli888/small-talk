import type { Topic } from "../../../types.ts";

export const TRAVEL_TOPIC: Topic = {
  id: "travel",
  emoji: "✈️",
  name: "Travel",
  description: "Hotels, airports, tourism",
  subtopics: [
    {
      id: "hotels-tourism",
      name: "旅行",
      description: "Handle hotel check-in and explore tourist spots.",
      setting: "Hotels and tourist attractions in Japan",
      agentRole: "Hotel staff or tourist guide",
      scenarios: [
        {
          id: "hotel-checkin",
          title: "Hotel Check-In",
          context:
            "You've arrived at a traditional Japanese inn (旅館) in Kyoto after a long journey. You approach the front desk to check in for your two-night stay.",
          userGoal:
            "Check in smoothly, confirm your room type, and ask about dinner, breakfast, and local sightseeing tips.",
          agentRole: "Ryokan receptionist (旅館のフロント)",
          setting: "Traditional ryokan in Kyoto",
          beats: [
            {
              speaker: "agent",
              intent: "Welcome the guest warmly and ask for their name.",
              example: "いらっしゃいませ！ご予約のお名前をお伺いできますか？",
            },
            {
              speaker: "user",
              intent: "Give your name and confirm the booking dates.",
            },
            {
              speaker: "agent",
              intent:
                "Confirm the room, explain check-out time, and mention dinner arrangements.",
            },
            {
              speaker: "user",
              intent:
                "Ask for a local sightseeing recommendation and what time dinner is.",
            },
          ],
          vocabulary: [
            "ご予約 (reservation / booking, polite)",
            "チェックイン/チェックアウト (check-in / check-out)",
            "夕食 (dinner)",
            "朝食 (breakfast)",
            "観光スポット (tourist spot)",
            "浴衣 (yukata / casual kimono)",
          ],
          grammarFocus: [
            "〜を予約した〜と申します (I made a reservation, my name is ~)",
            "〜はいつですか (when is ~)",
            "おすすめの場所はありますか (are there any recommended places)",
          ],
        },
        {
          id: "tourist-attraction",
          title: "At a Tourist Attraction",
          context:
            "You're visiting a famous shrine (神社) in Kyoto. You're curious about the shrine's history and rituals, and you approach a staff member or shrine guide.",
          userGoal:
            "Find out about the shrine's history, learn about local customs (how to pray, hand washing), and ask for a good photo spot.",
          agentRole: "Shrine guide or staff member (神社の方)",
          setting: "Famous Shinto shrine in Kyoto",
          beats: [
            {
              speaker: "agent",
              intent:
                "Approach the curious-looking visitor and offer to explain the shrine.",
              example: "お参りは初めてですか？よかったら、ご説明しましょうか？",
            },
            {
              speaker: "user",
              intent:
                "Say it's your first time and ask how to properly pray at the shrine.",
            },
            {
              speaker: "agent",
              intent:
                "Explain the hand-washing ritual and the steps for praying.",
            },
            {
              speaker: "user",
              intent:
                "Thank them and ask about the history of the shrine and the best photo spot.",
            },
          ],
          vocabulary: [
            "お参り (visiting a shrine / prayer)",
            "手水舎 (hand-washing basin at shrine)",
            "拝殿 (main hall of worship)",
            "おみくじ (fortune slip)",
            "神社の歴史 (history of the shrine)",
            "映える (photogenic / Instagram-worthy)",
          ],
          grammarFocus: [
            "〜のやり方を教えてもらえますか (could you show me how to ~)",
            "〜はどこにありますか (where is ~)",
            "〜はいつ建てられましたか (when was ~ built)",
          ],
        },
      ],
    },
  ],
};
