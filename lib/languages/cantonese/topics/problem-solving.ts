import type { Topic } from "../../../types.ts";

export const PROBLEM_SOLVING_TOPIC: Topic = {
  id: "problem-solving",
  emoji: "🔧",
  name: "Problem-Solving",
  description: "Complaints, requests, clarification",
  subtopics: [
    {
      id: "handling-issues",
      name: "Handling Issues",
      description:
        "Make complaints, ask for help, and clear up misunderstandings.",
      setting: "Restaurant, shop, or street in Hong Kong",
      agentRole: "Staff member or stranger",
      scenarios: [
        {
          id: "restaurant-complaint",
          title: "Complaining at a Restaurant",
          context:
            "You ordered something at a restaurant but there's a problem — wrong dish, something missing, or the food is cold. You flag down a waiter.",
          userGoal:
            "Politely explain the problem and ask for it to be fixed — either remade, corrected, or discounted.",
          agentRole: "Restaurant waiter (侍應)",
          setting: "Restaurant in Hong Kong",
          beats: [
            {
              speaker: "user",
              intent:
                "Get the waiter's attention and politely raise the problem.",
            },
            {
              speaker: "agent",
              intent: "Apologise and ask what the problem is.",
              example: "唔好意思，係咩問題呀？",
            },
            {
              speaker: "user",
              intent:
                "Explain clearly what went wrong — wrong order, cold food, or missing item.",
            },
            {
              speaker: "agent",
              intent:
                "Apologise again and offer to fix it — redo the dish or adjust the bill.",
            },
          ],
          vocabulary: [
            "唔啱 (wrong/incorrect)",
            "落錯單 (wrong order)",
            "凍咗 (gone cold)",
            "漏咗 (missing item)",
            "可唔可以… (can you please…)",
            "扣返 (deduct from the bill)",
          ],
          grammarFocus: [
            "唔好意思，呢個… (excuse me, this…)",
            "我訂咗… (I ordered)",
            "可唔可以幫我… (can you please)",
          ],
        },
        {
          id: "asking-stranger",
          title: "Asking a Stranger for Help",
          context:
            "You're stuck — maybe your phone died, you can't find a place, or you need change for a bus. You need to ask a stranger for a small favour.",
          userGoal:
            "Approach a stranger politely, explain your situation, and ask for help.",
          agentRole: "Passerby on the street (途人)",
          setting: "Street or MTR station in Hong Kong",
          beats: [
            {
              speaker: "user",
              intent:
                "Politely stop someone and ask if they can spare a moment to help.",
            },
            {
              speaker: "agent",
              intent: "Stop and ask what's wrong.",
              example: "係呀，有咩嘢㗎？",
            },
            {
              speaker: "user",
              intent: "Explain your situation and make your specific request.",
            },
            {
              speaker: "agent",
              intent:
                "Either help or explain why they can't, and suggest an alternative.",
            },
          ],
          vocabulary: [
            "唔好意思 (excuse me / sorry to bother)",
            "幫手 (help)",
            "借 (borrow / lend)",
            "搵緊 (looking for)",
            "唔知點算好 (don't know what to do)",
            "多謝晒 (thank you so much)",
          ],
          grammarFocus: [
            "唔好意思打擾你… (sorry to bother you)",
            "可唔可以幫我… (can you help me)",
            "係咁㗎 (that's the situation)",
          ],
        },
      ],
    },
  ],
};
