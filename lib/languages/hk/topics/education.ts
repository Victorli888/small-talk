import type { Topic } from "../../../types.ts";

export const HK_EDUCATION: Topic = {
  id: "education",
  emoji: "📚",
  name: "Education",
  description: "Studying, classes, learning",
  subtopics: [
    {
      id: "study-chat",
      name: "Study & Learning",
      description:
        "Talk about studying, ask for help, and share learning experiences.",
      setting: "Classroom, library, or study group",
      agentRole: "Teacher, tutor, or classmate",
      scenarios: [
        {
          id: "asking-teacher",
          title: "Asking the Teacher for Help",
          context:
            "You're in class and you don't understand something the teacher just explained. You wait until after class to ask for clarification.",
          userGoal:
            "Politely ask your teacher to explain something again and make sure you understand.",
          agentRole: "Teacher or tutor (老師)",
          setting: "Classroom or after class, school in Hong Kong",
          beats: [
            {
              speaker: "user",
              intent:
                "Politely get the teacher's attention and say you didn't quite understand something.",
            },
            {
              speaker: "agent",
              intent: "Welcome the question and ask what part was confusing.",
              example: "唔緊要㗎！係咩嘢唔明㗎？你講俾我知。",
            },
            {
              speaker: "user",
              intent: "Explain which part you found difficult and why.",
            },
            {
              speaker: "agent",
              intent: "Re-explain clearly and check if it makes sense now.",
            },
          ],
          vocabulary: [
            "唔明 (don't understand)",
            "再講一次 (say it again)",
            "解釋 (explain)",
            "例子 (example)",
            "意思 (meaning)",
            "難 (difficult)",
          ],
          grammarFocus: [
            "我唔係好明… (I don't quite understand)",
            "可唔可以再解釋吓 (can you explain again)",
            "即係話… (meaning / so you're saying)",
          ],
        },
        {
          id: "study-habits",
          title: "Discussing Study Habits",
          context:
            "You're in a study group and start chatting about how everyone prepares for exams. Everyone seems to have different methods.",
          userGoal:
            "Share your study habits and learn how your classmates prepare for exams.",
          agentRole: "Classmate in the same study group (同學)",
          setting: "Library or study room at school",
          beats: [
            {
              speaker: "agent",
              intent: "Ask how the learner usually prepares for exams.",
              example: "你平時點樣溫書㗎？係咪成日溫到好夜？",
            },
            {
              speaker: "user",
              intent:
                "Describe your study habits and whether you find them effective.",
            },
            {
              speaker: "agent",
              intent: "Share their own approach and compare.",
            },
            {
              speaker: "user",
              intent: "Ask if they have any tips for the upcoming exam.",
            },
          ],
          vocabulary: [
            "溫書 (study / revise)",
            "考試 (exam)",
            "功課 (homework)",
            "習慣 (habit)",
            "有效 (effective)",
            "溫夜書 (study late at night)",
          ],
          grammarFocus: [
            "我通常… (I usually)",
            "點樣溫書 (how to study)",
            "有冇咩方法 (any tips/methods)",
          ],
        },
      ],
    },
  ],
};
