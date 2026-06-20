import type { Topic } from "../../../types.ts";

export const HK_TECHNOLOGY: Topic = {
  id: "technology",
  emoji: "📱",
  name: "Technology",
  description: "Phones, apps, internet",
  subtopics: [
    {
      id: "tech-trouble",
      name: "Tech Trouble",
      description: "Ask for help with phones, apps, and internet issues.",
      setting: "Home, café, or office with tech problems",
      agentRole: "Tech-savvy friend or shop assistant",
      scenarios: [
        {
          id: "phone-crash",
          title: "My Phone Keeps Crashing",
          context:
            "Your phone has been acting up — freezing, crashing, or running very slowly. You ask a tech-savvy friend for help.",
          userGoal:
            "Describe the phone problem and follow your friend's troubleshooting steps.",
          agentRole: "Tech-savvy friend who can help (識科技嘅朋友)",
          setting: "Café or living room",
          beats: [
            {
              speaker: "user",
              intent:
                "Describe the phone problem and ask if your friend knows how to fix it.",
            },
            {
              speaker: "agent",
              intent: "Ask what specifically happens when the phone crashes.",
              example: "係咩情況㗎？係死機定係好慢㗎？",
            },
            {
              speaker: "user",
              intent: "Describe the symptoms in more detail.",
            },
            {
              speaker: "agent",
              intent:
                "Suggest a fix — restart, clear cache, or update the system — and walk through it.",
            },
          ],
          vocabulary: [
            "死機 (crash/freeze)",
            "好慢 (very slow)",
            "重啟 (restart)",
            "更新 (update)",
            "刪除 (delete)",
            "儲存空間 (storage space)",
          ],
          grammarFocus: [
            "部電話… (my phone…)",
            "試吓… (try…)",
            "係咪要… (do I need to…)",
          ],
        },
        {
          id: "wifi-issue",
          title: "The WiFi Isn't Working",
          context:
            "You're trying to get online but the WiFi at a café or at home isn't working. You ask a staff member or a friend for help.",
          userGoal:
            "Explain the WiFi problem and get help connecting or troubleshooting.",
          agentRole: "Café staff member or tech-savvy friend (職員/朋友)",
          setting: "Café or home",
          beats: [
            {
              speaker: "user",
              intent:
                "Tell the staff member or friend that the WiFi isn't connecting.",
            },
            {
              speaker: "agent",
              intent:
                "Ask what device they're using and what error message they see.",
              example: "係咩設備㗎？你試咗入密碼未㗎？係咪話連唔到？",
            },
            {
              speaker: "user",
              intent: "Explain what you tried and what happened.",
            },
            {
              speaker: "agent",
              intent:
                "Suggest a fix — check the password, restart the router, or move closer to the router.",
            },
          ],
          vocabulary: [
            "WiFi / 無線網絡 (WiFi / wireless internet)",
            "密碼 (password)",
            "連唔到 (can't connect)",
            "路由器 (router)",
            "訊號 (signal)",
            "設備 (device)",
          ],
          grammarFocus: [
            "連唔到… (can't connect to)",
            "試咗…都唔得 (tried…but it didn't work)",
            "係咪要… (do I need to…)",
          ],
        },
      ],
    },
  ],
};
