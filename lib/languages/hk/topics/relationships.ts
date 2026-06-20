import type { Topic } from "../../../types.ts";

export const HK_RELATIONSHIPS: Topic = {
  id: "relationships",
  emoji: "❤️",
  name: "Relationships",
  description: "Friends, emotions, feelings",
  subtopics: [
    {
      id: "heart-to-heart",
      name: "Heart-to-Heart",
      description: "Share feelings and support a friend through a hard time.",
      setting: "Quiet café or private chat",
      agentRole: "Close friend",
      scenarios: [
        {
          id: "venting",
          title: "A Friend Vents to You",
          context:
            "Your friend messages you saying they're having a rough time and asks to meet. Over tea, they start opening up about what's bothering them.",
          userGoal:
            "Listen, respond with empathy, and ask the right questions to support your friend.",
          agentRole: "Friend who is struggling and needs to talk (好友)",
          setting: "Quiet café in Hong Kong",
          beats: [
            {
              speaker: "agent",
              intent: "Open up and start sharing what's been bothering them.",
              example:
                "最近好攰囉…工作壓力好大，又同個上司唔啱傾。你明唔明白我講嘅感覺㗎？",
            },
            {
              speaker: "user",
              intent:
                "Show empathy and ask them to tell you more about what happened.",
            },
            {
              speaker: "agent",
              intent:
                "Share more detail and express their feelings more openly.",
            },
            {
              speaker: "user",
              intent:
                "Offer support, validation, and maybe a piece of gentle advice.",
            },
          ],
          vocabulary: [
            "壓力 (stress/pressure)",
            "攰 (tired)",
            "難受 (feel awful)",
            "明白 (understand)",
            "支持 (support)",
            "唔好咁諗 (don't think that way)",
          ],
          grammarFocus: [
            "我明白你嘅感受 (I understand how you feel)",
            "難怪… (no wonder)",
            "其實… (actually / the thing is)",
          ],
        },
        {
          id: "friendship-reflection",
          title: "Reflecting on a Friendship",
          context:
            "You and a friend are catching up and the conversation turns deeper — talking about what you value in friendships and people in your life.",
          userGoal:
            "Share your thoughts on friendship, what matters to you in relationships, and ask your friend the same.",
          agentRole: "Thoughtful friend in a reflective mood (好友)",
          setting: "Late evening walk or quiet spot in Hong Kong",
          beats: [
            {
              speaker: "agent",
              intent:
                "Kick off the deeper conversation with a reflective question.",
              example: "你覺得，一段好嘅友誼係點樣㗎？係咪需要成日見面先算？",
            },
            {
              speaker: "user",
              intent: "Share your view on what makes a good friendship.",
            },
            {
              speaker: "agent",
              intent:
                "Agree or add to the point and share their own perspective.",
            },
            {
              speaker: "user",
              intent:
                "Ask a thoughtful question about someone who matters to them.",
            },
          ],
          vocabulary: [
            "友誼 (friendship)",
            "信任 (trust)",
            "誠實 (honesty)",
            "掛住 (miss someone)",
            "珍惜 (cherish)",
            "心入面 (in your heart)",
          ],
          grammarFocus: [
            "我覺得… (I think/feel)",
            "對我嚟講… (for me / as far as I'm concerned)",
            "你點睇 (what do you think)",
          ],
        },
      ],
    },
  ],
};
