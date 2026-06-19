import type { Topic } from "../../../types.ts";

export const TRAVEL_TOPIC: Topic = {
  id: "travel",
  emoji: "✈️",
  name: "Travel",
  description:
    "Practice real Hong Kong travel situations — hotels, airports, and getting around.",
  subtopics: [
    {
      id: "hotel-check-in",
      name: "Hotel Check-in",
      description:
        "Check in, upgrade your room, find amenities, and book the restaurant.",
      setting: "Hotel lobby / front desk",
      agentRole: "Hotel staff",
      scenarios: [
        {
          id: "room-upgrade",
          title: "Asking for a Room Upgrade",
          context:
            "You've just arrived at a hotel after a long journey. You approach the front desk to check in, and decide to ask whether a better room — maybe a higher floor or sea view — is available.",
          userGoal:
            "Ask if a higher floor or sea-view room is available, ideally at no extra charge or a small premium.",
          agentRole: "Hotel front desk agent (酒店接待員)",
          setting: "Hotel lobby check-in counter",
          beats: [
            {
              speaker: "agent",
              intent:
                "Greet the guest warmly and ask for their name and reservation details.",
              example: "你好，歡迎入住！請問大名係？有冇預訂？",
            },
            {
              speaker: "user",
              intent:
                "Provide name, confirm the booking, then ask if any room upgrade is available.",
            },
            {
              speaker: "agent",
              intent:
                "Check the system, describe the upgrade options (higher floor / sea view / executive suite) and the price difference.",
            },
            {
              speaker: "user",
              intent:
                "Ask what the upgrade includes — e.g. whether breakfast is included or if there's a lounge.",
            },
            {
              speaker: "agent",
              intent:
                "Explain the inclusions and gently encourage the upgrade.",
            },
            {
              speaker: "user",
              intent:
                "Negotiate a small discount or accept / politely decline.",
            },
          ],
          vocabulary: [
            "升級 (upgrade)",
            "海景 (sea view)",
            "高層 (high floor)",
            "差價 (price difference)",
            "行政套房 (executive suite)",
            "包唔包早餐 (does it include breakfast)",
            "貴賓廊 (executive lounge)",
            "預訂 (reservation)",
          ],
          grammarFocus: [
            "有冇 for availability",
            "差幾多錢 (how much difference)",
            "係咪包括 (does it include)",
          ],
        },
        {
          id: "amenities-location",
          title: "Finding Hotel Amenities",
          context:
            "You've checked in and dropped off your bags. You're exploring the lobby and spot the concierge desk. You want to find out where the gym, swimming pool, and breakfast restaurant are.",
          userGoal:
            "Find out where the gym, pool, and breakfast restaurant are located and their hours.",
          agentRole: "Hotel concierge (禮賓部職員)",
          setting: "Hotel lobby near the concierge desk",
          beats: [
            {
              speaker: "agent",
              intent: "Spot the guest looking around and offer help.",
              example: "你好！有冇嘢需要幫手？",
            },
            {
              speaker: "user",
              intent: "Ask where the gym is and what floor it's on.",
            },
            {
              speaker: "agent",
              intent:
                "Give directions to the gym, mention the floor and opening hours.",
            },
            {
              speaker: "user",
              intent:
                "Ask about the swimming pool — location and whether there are time restrictions.",
            },
            {
              speaker: "agent",
              intent:
                "Describe the pool location and any age or session restrictions.",
            },
            {
              speaker: "user",
              intent: "Ask where breakfast is served and until what time.",
            },
            {
              speaker: "agent",
              intent:
                "Direct the guest to the restaurant floor and state the breakfast hours.",
            },
          ],
          vocabulary: [
            "健身室 (gym)",
            "泳池 (swimming pool)",
            "餐廳 (restaurant)",
            "幾樓 (which floor)",
            "開放時間 (opening hours)",
            "幾點 (what time)",
            "早餐 (breakfast)",
            "升降機 (lift/elevator)",
          ],
          grammarFocus: [
            "喺幾樓 (on which floor)",
            "幾點至幾點 (from X to Y o'clock)",
          ],
        },
        {
          id: "dinner-reservation",
          title: "Booking a Dinner Table",
          context:
            "You're settled into your hotel room and feeling hungry. You call down to the hotel restaurant to book a table for dinner tonight.",
          userGoal:
            "Reserve a table at the hotel restaurant for dinner tonight.",
          agentRole: "Hotel restaurant hostess (餐廳接待員)",
          setting: "Hotel restaurant reception or phone call to restaurant",
          beats: [
            {
              speaker: "agent",
              intent: "Answer and greet the caller / guest, ask how to help.",
              example: "你好，呢度係海景餐廳，有咩可以幫到你？",
            },
            {
              speaker: "user",
              intent: "Say you'd like to book a table for dinner tonight.",
            },
            {
              speaker: "agent",
              intent: "Ask for the time and number of guests.",
            },
            {
              speaker: "user",
              intent: "Specify the time (e.g. 7pm) and number of people.",
            },
            {
              speaker: "agent",
              intent:
                "Check availability, confirm or suggest an alternative time.",
            },
            {
              speaker: "user",
              intent:
                "Confirm the time, provide your name, and ask if any special arrangement is needed.",
            },
            {
              speaker: "agent",
              intent: "Confirm the booking details and welcome the guest.",
            },
          ],
          vocabulary: [
            "訂位 (make a reservation)",
            "幾多位 (how many people)",
            "今晚 (tonight)",
            "姓名 (name)",
            "確認 (confirm)",
            "有冇位 (is there availability)",
            "特別要求 (special request)",
          ],
          grammarFocus: [
            "我想訂…位 (I'd like to reserve a table for…)",
            "方唔方便 for polite alternatives",
          ],
        },
      ],
    },
    {
      id: "airport",
      name: "At the Airport",
      description:
        "Check in for your flight, go through immigration, and deal with lost luggage.",
      setting: "Hong Kong International Airport",
      agentRole: "Airport / airline staff",
      scenarios: [
        {
          id: "check-in-counter",
          title: "Checking In at the Counter",
          context:
            "You're at the airport for your departure flight. You wheel your suitcase up to the check-in counter, passport and booking confirmation in hand.",
          userGoal:
            "Check in for a flight, request a window seat, and drop off luggage.",
          agentRole: "Airline check-in agent (值機人員)",
          setting: "Check-in counter, HKIA",
          beats: [
            {
              speaker: "agent",
              intent: "Greet the passenger and ask for passport and booking.",
              example: "你好！請出示護照同機票確認書。",
            },
            {
              speaker: "user",
              intent: "Hand over passport and mention the flight number.",
            },
            {
              speaker: "agent",
              intent: "Ask about luggage — how many bags and estimated weight.",
            },
            {
              speaker: "user",
              intent: "State the number of bags and ask for a window seat.",
            },
            {
              speaker: "agent",
              intent:
                "Assign seat, tag the luggage, and hand over the boarding pass.",
            },
            {
              speaker: "user",
              intent: "Ask which gate and when boarding starts.",
            },
          ],
          vocabulary: [
            "護照 (passport)",
            "登機證 (boarding pass)",
            "行李 (luggage)",
            "窗口位 (window seat)",
            "走廊位 (aisle seat)",
            "登機閘口 (gate)",
            "幾點登機 (boarding time)",
            "超重 (overweight)",
          ],
          grammarFocus: [
            "我想要…位 (I'd like a … seat)",
            "幾號閘口 (which gate number)",
          ],
        },
        {
          id: "immigration",
          title: "Going Through Immigration",
          context:
            "You've landed in Hong Kong and are walking through the immigration hall. You join the queue, and it's your turn at the counter.",
          userGoal:
            "Answer the immigration officer's questions to enter Hong Kong.",
          agentRole: "Immigration officer (入境處職員)",
          setting: "Immigration hall, HKIA",
          beats: [
            {
              speaker: "agent",
              intent: "Request the passport and ask the purpose of visit.",
              example: "護照，唔該。嚟香港做咩呀？",
            },
            {
              speaker: "user",
              intent:
                "Hand over passport and state the purpose — tourism or business.",
            },
            {
              speaker: "agent",
              intent: "Ask how long the visitor plans to stay.",
            },
            {
              speaker: "user",
              intent: "State the length of stay in days or weeks.",
            },
            {
              speaker: "agent",
              intent: "Ask where the visitor is staying.",
            },
            {
              speaker: "user",
              intent: "Give the hotel name and area.",
            },
          ],
          vocabulary: [
            "護照 (passport)",
            "旅遊 (tourism)",
            "商務 (business)",
            "住幾耐 (how long staying)",
            "落腳地方 (accommodation)",
            "入境 (entry/immigration)",
            "逗留 (stay/remain)",
          ],
          grammarFocus: [
            "嚟做咩 (what are you here for)",
            "住喺 (staying at)",
          ],
        },
        {
          id: "lost-luggage",
          title: "Reporting Lost Luggage",
          context:
            "You've been waiting at baggage claim for 20 minutes and your suitcase still hasn't appeared. Everyone else has left. You walk over to the baggage services desk.",
          userGoal:
            "Report that your bag hasn't arrived at baggage claim and file a report.",
          agentRole: "Airline baggage service agent (行李服務員)",
          setting: "Baggage services desk, HKIA arrivals hall",
          beats: [
            {
              speaker: "agent",
              intent:
                "Greet the distressed passenger at the desk and ask what happened.",
              example: "你好，有咩可以幫到你？係唔係有咩嘢唔見咗？",
            },
            {
              speaker: "user",
              intent:
                "Explain that the luggage hasn't come out at baggage claim.",
            },
            {
              speaker: "agent",
              intent: "Ask for the flight number and a description of the bag.",
            },
            {
              speaker: "user",
              intent:
                "Give the flight number and describe the bag (colour, size, brand).",
            },
            {
              speaker: "agent",
              intent:
                "Explain next steps — check the system, take contact details, estimate timeline.",
            },
            {
              speaker: "user",
              intent:
                "Provide contact details (phone/hotel) and ask about compensation or delivery.",
            },
          ],
          vocabulary: [
            "行李 (luggage)",
            "唐手箱 (suitcase/hard-shell case)",
            "顏色 (colour)",
            "航班號碼 (flight number)",
            "聯絡方式 (contact details)",
            "送返去 (deliver back)",
            "賠償 (compensation)",
            "報告 (report/file a report)",
          ],
          grammarFocus: [
            "行李未出嚟 (luggage hasn't come out)",
            "幾時送到 (when will it arrive)",
          ],
        },
      ],
    },
    {
      id: "asking-directions",
      name: "Asking for Directions",
      description:
        "Navigate Hong Kong on foot and by taxi — ask locals for directions and get around.",
      setting: "Hong Kong streets, MTR stations, taxi",
      agentRole: "Local resident or taxi driver",
      scenarios: [
        {
          id: "to-mtr-station",
          title: "Getting to the MTR Station",
          context:
            "You're exploring a neighbourhood on foot and realise you're not sure how to get back to the MTR. You spot a local who looks like they know the area.",
          userGoal:
            "Ask a local for walking directions to the nearest MTR station.",
          agentRole: "Local Hong Kong resident (街坊)",
          setting: "A street in a busy Hong Kong district",
          beats: [
            {
              speaker: "user",
              intent:
                "Excuse yourself and ask the local if they know where the MTR station is.",
            },
            {
              speaker: "agent",
              intent: "Respond helpfully and begin giving directions.",
              example:
                "係呀，唔係好遠㗎。你沿呢條路直行，過咗個紅綠燈之後轉左。",
            },
            {
              speaker: "user",
              intent: "Ask how far it is or how long it takes to walk.",
            },
            {
              speaker: "agent",
              intent:
                "Estimate the walking time and mention a landmark to look out for.",
            },
            {
              speaker: "user",
              intent: "Confirm you've understood and thank them.",
            },
          ],
          vocabulary: [
            "地鐵站 (MTR station)",
            "直行 (go straight)",
            "轉左 / 轉右 (turn left / right)",
            "幾遠 (how far)",
            "行幾耐 (how long to walk)",
            "紅綠燈 (traffic lights)",
            "唔該 (excuse me / thank you)",
          ],
          grammarFocus: [
            "點去 (how to get to)",
            "喺…附近 (near…)",
            "過咗…之後 (after passing…)",
          ],
        },
        {
          id: "to-landmark",
          title: "Directions to a Landmark",
          context:
            "You want to visit a famous Hong Kong spot — maybe the Peak or Temple Street — but you're not sure how to get there from where you are. You duck into a nearby shop.",
          userGoal:
            "Get directions to a famous Hong Kong location such as the Peak or Temple Street.",
          agentRole: "Nearby shop owner (附近商舖東主)",
          setting: "Outside a shop in a Hong Kong neighbourhood",
          beats: [
            {
              speaker: "user",
              intent:
                "Ask for directions to a specific landmark (e.g. 山頂 or 廟街).",
            },
            {
              speaker: "agent",
              intent:
                "Explain it's not walkable from here and suggest taking the bus or MTR.",
              example: "哦，山頂呀？行路去太遠喇，最好搭地鐵或者巴士。",
            },
            {
              speaker: "user",
              intent: "Ask which bus number or which MTR line to take.",
            },
            {
              speaker: "agent",
              intent:
                "Give specific transport details — bus number or MTR line name and exit.",
            },
            {
              speaker: "user",
              intent: "Ask roughly how long the journey takes.",
            },
            {
              speaker: "agent",
              intent: "Estimate journey time and wish them well.",
            },
          ],
          vocabulary: [
            "山頂 (Victoria Peak)",
            "廟街 (Temple Street)",
            "搭巴士 (take the bus)",
            "搭地鐵 (take the MTR)",
            "出口 (exit)",
            "幾號巴士 (which bus number)",
            "幾耐 (how long)",
            "換車 (change transport)",
          ],
          grammarFocus: [
            "行路太遠 (too far to walk)",
            "搭…去 (take … to get there)",
          ],
        },
        {
          id: "taxi-ride",
          title: "Taking a Taxi",
          context:
            "You're outside and need to get to your destination across town. You flag down a red taxi, open the door, and slide in.",
          userGoal:
            "Tell the taxi driver your destination and handle any clarifying questions during the ride.",
          agentRole: "Taxi driver (的士司機)",
          setting: "Inside a Hong Kong taxi",
          beats: [
            {
              speaker: "agent",
              intent: "Ask the passenger where they want to go.",
              example: "你好！去邊度呀？",
            },
            {
              speaker: "user",
              intent: "State the destination (e.g. 尖沙咀，半島酒店附近).",
            },
            {
              speaker: "agent",
              intent:
                "Confirm the destination and mention there may be traffic.",
            },
            {
              speaker: "user",
              intent: "Ask how long it will take given the traffic.",
            },
            {
              speaker: "agent",
              intent:
                "Give an estimate and ask for a more specific street or landmark.",
            },
            {
              speaker: "user",
              intent: "Clarify the exact drop-off point.",
            },
          ],
          vocabulary: [
            "的士 (taxi)",
            "去…度 (going to…)",
            "尖沙咀 (Tsim Sha Tsui)",
            "塞車 (traffic jam)",
            "落車 (get off / drop off)",
            "大概 (approximately)",
            "收費 (fare)",
            "找錢 (change/give change)",
          ],
          grammarFocus: [
            "去邊度 (where are you going)",
            "落喺…度 (drop me at…)",
          ],
        },
      ],
    },
  ],
};
