import type { Topic } from "../../../types.ts";

export const PERSONAL_IDENTITY_TOPIC: Topic = {
  id: "personal-identity",
  emoji: "👤",
  name: "Personal Identity",
  description: "Name, background, family, occupation",
  subtopics: [
    {
      id: "first-meeting",
      name: "Meeting Someone New",
      description: "Introduce yourself in social or professional settings.",
      setting: "Social or professional setting in Hong Kong",
      agentRole: "New acquaintance",
      scenarios: [
        {
          id: "social-event",
          title: "Meeting at a Gathering",
          context:
            "You're at a friend's gathering in Hong Kong and don't know many people. A friendly stranger approaches you and starts chatting.",
          userGoal:
            "Introduce yourself, share where you're from and what you do, and get to know the other person.",
          agentRole: "Friendly stranger at the gathering (聚會友人)",
          setting: "A friend's apartment in Hong Kong",
          beats: [
            {
              speaker: "agent",
              intent: "Greet warmly and ask the learner's name.",
              example: "你好！我係阿偉，係主人家嘅朋友。你係咩人嚟㗎？叫咩名？",
            },
            {
              speaker: "user",
              intent: "Give your name and say how you know the host.",
            },
            {
              speaker: "agent",
              intent:
                "Share what you do for work and ask about the learner's job or studies.",
            },
            {
              speaker: "user",
              intent:
                "Describe your job or studies and ask a follow-up question.",
            },
          ],
          vocabulary: [
            "叫咩名 (what's your name)",
            "係邊度人 (where are you from)",
            "做緊咩 (what do you do)",
            "識得 (know/met)",
            "朋友 (friend)",
            "嚟自 (from)",
          ],
          grammarFocus: [
            "我係… (I am)",
            "我嚟自… (I'm from)",
            "你係做咩㗎 (what do you do)",
          ],
        },
        {
          id: "new-colleague",
          title: "First Day at Work",
          context:
            "It's your first day at a new office in Hong Kong. A friendly colleague comes over to welcome you and learn about your background.",
          userGoal:
            "Introduce yourself professionally, mention your background, and start building rapport.",
          agentRole: "Friendly colleague welcoming a new team member (同事)",
          setting: "Open-plan office in Hong Kong",
          beats: [
            {
              speaker: "agent",
              intent: "Welcome the new colleague and ask where they're from.",
              example: "歡迎！係新嚟㗎？係邊度人嚟㗎？之前係邊度做嘢？",
            },
            {
              speaker: "user",
              intent: "Introduce yourself and say where you're from.",
            },
            {
              speaker: "agent",
              intent:
                "Ask about previous work experience or what role they'll be doing.",
            },
            {
              speaker: "user",
              intent: "Describe your previous experience or new role.",
            },
          ],
          vocabulary: [
            "歡迎 (welcome)",
            "之前 (before/previously)",
            "經驗 (experience)",
            "負責 (responsible for)",
            "部門 (department)",
            "同事 (colleague)",
          ],
          grammarFocus: [
            "我之前喺… (I previously was at)",
            "負責… (responsible for)",
            "做咗…年 (worked for X years)",
          ],
        },
      ],
    },
  ],
};
