import type { Topic } from "../../../types.ts";

export const PERSONAL_IDENTITY_TOPIC: Topic = {
  id: "personal-identity",
  emoji: "👤",
  name: "Personal Identity",
  description: "Name, background, family, occupation",
  subtopics: [
    {
      id: "first-meeting",
      name: "自己紹介",
      description: "Introduce yourself in social or professional settings.",
      setting: "Social or professional setting in Japan",
      agentRole: "New acquaintance",
      scenarios: [
        {
          id: "welcome-party",
          title: "Meeting at a Welcome Party",
          context:
            "You've just joined a new company in Tokyo and there's a welcome party (歓迎会) tonight. A friendly colleague comes over to chat and get to know you.",
          userGoal:
            "Introduce yourself, share where you're from, what you do, and start building rapport.",
          agentRole: "Friendly colleague at the welcome party (同僚)",
          setting: "Izakaya in Tokyo for a company welcome party",
          beats: [
            {
              speaker: "agent",
              intent: "Welcome the new colleague warmly and ask their name.",
              example:
                "はじめまして！新しい方ですよね？よろしくお願いします。お名前は何とおっしゃいますか？",
            },
            {
              speaker: "user",
              intent: "Give your name and say you're happy to be here.",
            },
            {
              speaker: "agent",
              intent: "Ask where they're from and what brought them to Japan.",
            },
            {
              speaker: "user",
              intent: "Share your hometown and why you came to Japan.",
            },
          ],
          vocabulary: [
            "はじめまして (nice to meet you for the first time)",
            "よろしくお願いします (pleased to meet you / thank you in advance)",
            "出身 (hometown / where you're from)",
            "〜と申します (my name is ~, formal)",
            "どちらから (where are you from)",
            "こちらこそ (likewise / same to you)",
          ],
          grammarFocus: [
            "〜と申します (I am called ~, polite)",
            "〜出身です (I'm from ~)",
            "よろしくお願いします (set phrase for greetings)",
          ],
        },
        {
          id: "new-colleague",
          title: "First Day at the Office",
          context:
            "It's your first day at a Japanese office. A team member comes over to your desk to welcome you and find out about your background.",
          userGoal:
            "Introduce yourself professionally, mention your previous experience, and start fitting in.",
          agentRole: "Team member welcoming a new hire (チームメンバー)",
          setting: "Open-plan office in Tokyo",
          beats: [
            {
              speaker: "agent",
              intent:
                "Welcome them and ask what department they'll be working in.",
              example:
                "ようこそ！どの部署に配属されたんですか？前のお仕事は何をされていたんですか？",
            },
            {
              speaker: "user",
              intent: "Say which department you're in and your role.",
            },
            {
              speaker: "agent",
              intent:
                "Ask about their previous work experience or what they'll mainly be doing.",
            },
            {
              speaker: "user",
              intent:
                "Describe your previous experience or new responsibilities.",
            },
          ],
          vocabulary: [
            "部署 (department)",
            "配属 (assignment / posted to)",
            "担当 (in charge of)",
            "経験 (experience)",
            "前職 (previous job)",
            "よろしくお願いします (please treat me well)",
          ],
          grammarFocus: [
            "〜を担当します (I will be in charge of ~)",
            "〜に配属されました (I was assigned to ~)",
            "〜年間働いていました (I worked for ~ years)",
          ],
        },
      ],
    },
  ],
};
