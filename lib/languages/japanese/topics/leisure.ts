import type { Topic } from "../../../types.ts";

export const LEISURE_TOPIC: Topic = {
  id: "leisure",
  emoji: "🎮",
  name: "Leisure",
  description: "Hobbies, movies, weekend plans",
  subtopics: [
    {
      id: "free-time",
      name: "趣味と余暇",
      description: "Talk about hobbies and how you spend your free time.",
      setting: "Casual settings in Japan",
      agentRole: "Friend or classmate",
      scenarios: [
        {
          id: "hobbies-chat",
          title: "Talking About Hobbies",
          context:
            "You're hanging out with a Japanese friend at a cafe on a Sunday afternoon. The conversation turns to how you each like to spend your free time.",
          userGoal:
            "Share your hobbies and interests, ask about theirs, and find common ground.",
          agentRole: "Japanese friend at the cafe (友達)",
          setting: "Relaxed cafe in Tokyo on a Sunday afternoon",
          beats: [
            {
              speaker: "agent",
              intent: "Ask what the learner likes to do in their free time.",
              example: "ねえ、休みの日って何してるの？最近ハマってることある？",
            },
            {
              speaker: "user",
              intent: "Share one or two hobbies you enjoy.",
            },
            {
              speaker: "agent",
              intent:
                "React with interest, share a related opinion or their own hobby, and ask a follow-up question.",
            },
            {
              speaker: "user",
              intent:
                "Ask about their hobbies and suggest doing something together.",
            },
          ],
          vocabulary: [
            "趣味 (hobby)",
            "ハマる (to get hooked on / obsessed with)",
            "〜が好き (like ~)",
            "時間があるとき (when I have time)",
            "一緒に (together)",
            "最近 (recently)",
          ],
          grammarFocus: [
            "〜するのが好きです (I like doing ~)",
            "最近〜にハマっています (I've been into ~ lately)",
            "〜しませんか (shall we ~? / why don't we ~?)",
          ],
        },
        {
          id: "karaoke",
          title: "Karaoke Night",
          context:
            "A group of friends have decided to go to karaoke. You're at the reception desk booking a room and then inside the booth choosing songs.",
          userGoal:
            "Book a karaoke room, order drinks, pick songs, and chat with friends between songs.",
          agentRole:
            "Karaoke reception staff, then friend in the booth (店員・友達)",
          setting: "Karaoke bar in Japan",
          beats: [
            {
              speaker: "agent",
              intent: "Greet and ask how many people and how long they'd like.",
              example:
                "いらっしゃいませ！何名様ですか？お時間はどのくらいご利用ですか？",
            },
            {
              speaker: "user",
              intent: "Say how many people and how long you want to book for.",
            },
            {
              speaker: "agent",
              intent:
                "Confirm the booking, mention the drinks plan, and take you to the room.",
            },
            {
              speaker: "user",
              intent:
                "Ask about song selection and order drinks (now acting as friend in the room).",
            },
          ],
          vocabulary: [
            "〜名 (~ people / persons)",
            "フリードリンク (all-you-can-drink)",
            "曲 (song)",
            "入れる (to queue / add a song)",
            "〜時間 (~ hours)",
            "盛り上がる (to get hyped / to liven up)",
          ],
          grammarFocus: [
            "〜名で〜時間お願いします (~ people for ~ hours please)",
            "〜の曲を入れてもいいですか (can I queue ~ song)",
            "次は〜を歌おうよ (let's sing ~ next, casual)",
          ],
        },
      ],
    },
  ],
};
