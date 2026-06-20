import type { Topic } from "../../../types.ts";

export const HK_WORK: Topic = {
  id: "work",
  emoji: "💼",
  name: "Work",
  description: "Meetings, tasks, workplace",
  subtopics: [
    {
      id: "workplace",
      name: "At the Office",
      description: "Navigate meetings, tasks, and everyday workplace chat.",
      setting: "Office environment in Hong Kong",
      agentRole: "Colleague or manager",
      scenarios: [
        {
          id: "meeting-intro",
          title: "Introducing Yourself in a Meeting",
          context:
            "You've joined a new team and it's the first team meeting. Everyone is asked to briefly introduce themselves.",
          userGoal:
            "Introduce yourself to the team, explain your role, and ask a question to show engagement.",
          agentRole: "Team meeting facilitator / manager (上司)",
          setting: "Conference room or video call",
          beats: [
            {
              speaker: "agent",
              intent:
                "Open the meeting and invite the new person to introduce themselves.",
              example:
                "好，我哋歡迎新同事！你好，可唔可以介紹吓自己，話俾大家知你係負責咩㗎？",
            },
            {
              speaker: "user",
              intent:
                "Introduce yourself, say what your role is, and where you came from.",
            },
            {
              speaker: "agent",
              intent:
                "Welcome them warmly and ask what they're hoping to work on or contribute to.",
            },
            {
              speaker: "user",
              intent:
                "Share what you're excited about and ask a question about the team or project.",
            },
          ],
          vocabulary: [
            "介紹 (introduce)",
            "負責 (responsible for)",
            "部門 (department)",
            "項目 (project)",
            "同事 (colleague)",
            "貢獻 (contribute)",
          ],
          grammarFocus: [
            "我係負責… (I'm responsible for)",
            "之前我喺… (I previously was at)",
            "我想問吓… (I'd like to ask…)",
          ],
        },
        {
          id: "task-checkin",
          title: "Checking In on a Task",
          context:
            "Your colleague was supposed to send you something for a report. It's overdue and you need to follow up — politely but clearly.",
          userGoal:
            "Ask your colleague about the status of a task or document without sounding pushy.",
          agentRole: "Colleague who owes you a deliverable (同事)",
          setting: "Office — casual conversation or instant message follow-up",
          beats: [
            {
              speaker: "user",
              intent:
                "Greet your colleague and ask how they're doing before getting to the point.",
            },
            {
              speaker: "agent",
              intent: "Respond and ask what's up.",
              example: "幾好呀，你呢？有咩嘢㗎？",
            },
            {
              speaker: "user",
              intent:
                "Politely ask about the status of the document or task they owe you.",
            },
            {
              speaker: "agent",
              intent: "Apologise and give an estimate of when it'll be ready.",
            },
          ],
          vocabulary: [
            "截止日期 (deadline)",
            "報告 (report)",
            "做好咗未 (is it finished yet)",
            "差唔多 (almost done)",
            "麻煩你 (sorry to trouble you)",
            "緊急 (urgent)",
          ],
          grammarFocus: [
            "唔知有冇… (I was wondering if)",
            "幾時得 (when will it be ready)",
            "唔好意思咁樣問 (sorry to ask like this)",
          ],
        },
      ],
    },
  ],
};
