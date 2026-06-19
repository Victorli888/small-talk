import type { Topic } from "../../../types.ts";

export const SMALL_TALK_TOPIC: Topic = {
  id: "small-talk",
  emoji: "💬",
  name: "Small Talk",
  description: "Greetings, opinions, casual chat",
  subtopics: [
    {
      id: "social",
      name: "Everyday Chit-Chat",
      description: "Break the ice and keep a casual conversation flowing.",
      setting: "Lift, lobby, party, or street in Hong Kong",
      agentRole: "Neighbour, acquaintance, or new person at a social event",
      scenarios: [
        {
          id: "lift-chat",
          title: "Chatting in the Lift",
          context:
            "You step into the lift of your apartment building. Your neighbour — someone you've seen before but never really spoken to — gets in too.",
          userGoal:
            "Make small talk, exchange a few pleasantries, and maybe learn something about your neighbour.",
          agentRole: "Neighbour in the lift (鄰居)",
          setting: "Residential apartment building lift in Hong Kong",
          beats: [
            {
              speaker: "agent",
              intent: "Comment on the weather or something topical to start.",
              example: "哎呀，今日好熱呀！你係住幾樓㗎？",
            },
            {
              speaker: "user",
              intent:
                "Agree and respond, then ask how long they've been living in the building.",
            },
            {
              speaker: "agent",
              intent: "Answer and ask a question back to keep things going.",
            },
            {
              speaker: "user",
              intent:
                "Answer naturally and end warmly as you reach your floor.",
            },
          ],
          vocabulary: [
            "天氣 (weather)",
            "熱/凍 (hot/cold)",
            "鄰居 (neighbour)",
            "幾耐 (how long)",
            "係咪 (is it / right?)",
            "好似 (seems like)",
          ],
          grammarFocus: [
            "你係唔係… (are you…)",
            "住咗幾耐 (how long have you lived)",
            "係囉 (yeah, exactly)",
          ],
        },
        {
          id: "party-icebreaker",
          title: "Breaking the Ice at a Party",
          context:
            "You're at a casual gathering and don't know many people. Someone friendly approaches you and starts chatting. It's a good chance to practice.",
          userGoal:
            "Make conversation, share an opinion or two, and find some common ground.",
          agentRole: "Friendly person at the party (聚會友人)",
          setting: "Casual gathering or house party in Hong Kong",
          beats: [
            {
              speaker: "agent",
              intent:
                "Break the ice with a light observation or compliment and ask the learner's name.",
              example: "你好呀！係唔係第一次嚟㗎？我係阿怡，你叫咩名？",
            },
            {
              speaker: "user",
              intent: "Introduce yourself and say how you know the host.",
            },
            {
              speaker: "agent",
              intent:
                "Ask the learner's opinion on something — music, food at the party, etc.",
            },
            {
              speaker: "user",
              intent: "Share your opinion and ask what they think too.",
            },
          ],
          vocabulary: [
            "覺得 (think/feel)",
            "你點睇 (what do you think)",
            "我覺得… (I think…)",
            "係喎 (oh yeah, you're right)",
            "其實 (actually)",
            "唔錯 (not bad)",
          ],
          grammarFocus: [
            "你覺得點 (what do you think)",
            "係咪… (is it…/right?)",
            "好似… (seems like…)",
          ],
        },
      ],
    },
  ],
};
