import type { Topic } from "../../../types.ts";

export const HK_LEISURE: Topic = {
  id: "leisure",
  emoji: "🎮",
  name: "Leisure",
  description: "Hobbies, movies, weekend plans",
  subtopics: [
    {
      id: "free-time",
      name: "Free Time",
      description: "Talk about hobbies, movies, and weekend plans.",
      setting: "Casual conversation — café, park, or after work",
      agentRole: "Friend or colleague",
      scenarios: [
        {
          id: "movie-recommendation",
          title: "Recommending a Movie",
          context:
            "You and a friend are figuring out what to watch tonight. You saw something great recently and want to recommend it.",
          userGoal:
            "Recommend a movie or show, explain why you liked it, and convince your friend to watch it.",
          agentRole: "Friend deciding what to watch tonight (朋友)",
          setting: "Casual chat — messaging or in person",
          beats: [
            {
              speaker: "agent",
              intent: "Ask if the learner has any recommendations for tonight.",
              example: "今晚唔知睇咩好？你有冇推介嘅戲㗎？",
            },
            {
              speaker: "user",
              intent: "Recommend a specific movie and say why you liked it.",
            },
            {
              speaker: "agent",
              intent: "Ask what genre it is and if it has subtitles.",
            },
            {
              speaker: "user",
              intent:
                "Answer and try to seal the deal — convince them to watch it.",
            },
          ],
          vocabulary: [
            "推介 (recommend)",
            "好睇 (good/worth watching)",
            "戲 (movie)",
            "劇集 (TV series)",
            "字幕 (subtitles)",
            "驚慄/愛情/動作 (thriller/romance/action)",
          ],
          grammarFocus: [
            "我推介你睇… (I recommend you watch)",
            "因為… (because)",
            "你一定會鍾意㗎 (you'll definitely like it)",
          ],
        },
        {
          id: "weekend-plans",
          title: "Making Weekend Plans",
          context:
            "It's Friday afternoon and your colleague asks what you're doing this weekend. You're hoping to make plans together.",
          userGoal:
            "Share your tentative weekend plans and try to arrange something with your colleague.",
          agentRole: "Colleague wrapping up on a Friday (同事)",
          setting: "Office, end of the work week",
          beats: [
            {
              speaker: "agent",
              intent: "Ask what the learner is up to this weekend.",
              example: "今個週末有咩打算呀？得唔得閒㗎？",
            },
            {
              speaker: "user",
              intent: "Share your plans and ask what they're doing.",
            },
            {
              speaker: "agent",
              intent:
                "Suggest doing something together — hiking, eating, or catching a movie.",
            },
            {
              speaker: "user",
              intent:
                "Agree or counter-propose a time/activity and confirm a plan.",
            },
          ],
          vocabulary: [
            "週末 (weekend)",
            "得閒 (free/available)",
            "打算 (plan to)",
            "去行山 (go hiking)",
            "食飯 (have a meal)",
            "下晝 (afternoon)",
          ],
          grammarFocus: [
            "我打算… (I plan to)",
            "不如… (how about we)",
            "幾點好呀 (what time would be good)",
          ],
        },
      ],
    },
  ],
};
