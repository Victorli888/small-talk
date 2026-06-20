import type { Topic } from "../../../types.ts";

export const WORK_TOPIC: Topic = {
  id: "work",
  emoji: "💼",
  name: "Work",
  description: "Meetings, tasks, workplace",
  subtopics: [
    {
      id: "office-life",
      name: "職場で",
      description: "Navigate everyday work situations in a Japanese office.",
      setting: "Japanese office environment",
      agentRole: "Colleague or manager",
      scenarios: [
        {
          id: "morning-office",
          title: "Morning Office Greetings",
          context:
            "You've just arrived at the office. Your manager greets you and you exchange the usual morning pleasantries before diving into work.",
          userGoal:
            "Exchange appropriate workplace greetings and brief small talk, then update your manager on what you'll be working on today.",
          agentRole: "Team manager (上司)",
          setting: "Japanese open-plan office, morning",
          beats: [
            {
              speaker: "agent",
              intent: "Greet the learner as they arrive.",
              example:
                "おはようございます！今日も早いですね。昨日の件、確認できましたか？",
            },
            {
              speaker: "user",
              intent: "Return the greeting and give a brief status update.",
            },
            {
              speaker: "agent",
              intent:
                "Ask what the learner is planning to focus on today and mention a meeting.",
            },
            {
              speaker: "user",
              intent:
                "Outline your plan for the day and confirm attendance at the meeting.",
            },
          ],
          vocabulary: [
            "おはようございます (good morning, workplace)",
            "確認する (to confirm / check)",
            "進捗 (progress)",
            "会議 (meeting)",
            "〜の件 (regarding ~ / the matter of ~)",
            "承知しました (understood / I'll do that)",
          ],
          grammarFocus: [
            "〜について話し合いましょう (let's discuss ~)",
            "〜を確認してから (after confirming ~)",
            "承知いたしました (understood, humble form)",
          ],
        },
        {
          id: "project-discussion",
          title: "Discussing a Project",
          context:
            "You and a colleague need to align on the plan for an upcoming project. You sit down together at a meeting table to go over the details.",
          userGoal:
            "Discuss the project timeline, divide responsibilities, and agree on next steps.",
          agentRole: "Project colleague (同僚)",
          setting: "Small meeting room at the office",
          beats: [
            {
              speaker: "agent",
              intent: "Open the discussion by summarising the project goal.",
              example:
                "今回のプロジェクトですが、来月末までに完成させる必要がありますね。どう進めましょうか？",
            },
            {
              speaker: "user",
              intent: "Suggest how to divide the tasks.",
            },
            {
              speaker: "agent",
              intent:
                "Agree or suggest adjustments, then ask about the timeline.",
            },
            {
              speaker: "user",
              intent:
                "Propose a timeline and ask about the next check-in point.",
            },
          ],
          vocabulary: [
            "役割分担 (division of roles)",
            "締め切り (deadline)",
            "スケジュール (schedule)",
            "担当する (to be in charge of)",
            "共有する (to share)",
            "進める (to proceed / move forward)",
          ],
          grammarFocus: [
            "〜を担当してもらえますか (could you take charge of ~)",
            "〜までに完成させましょう (let's finish it by ~)",
            "〜はどう思いますか (what do you think about ~)",
          ],
        },
      ],
    },
  ],
};
