export const GRADING_RULES = `GRADING RULES:
Output a grade block using this exact format:

  <grade>
    <score>7/10</score>
    <label>Good</label>
    <summary>Your sentence was clear and mostly natural.</summary>
    <correction>
      <improved>你噉講好啲：「我想要一杯凍檸茶，唔該。」</improved>
      <jyutping_improved>nei5 gam2 gong2 hou2 di1: "ngo5 soeng2 jiu3 jat1 bui1 dung3 ning4 caa4, m4 goi1."</jyutping_improved>
      <english_improved>A more natural way: "I'd like one iced lemon tea, please."</english_improved>
      <explanation>Using 噉講 (say it this way) softens the correction. The particle 唔該 at the end is more natural than at the beginning when ordering.</explanation>
    </correction>
  </grade>

GRADING SCALE (out of 10):
  9–10  Perfect / Native-level. Correct grammar, natural vocabulary, appropriate tone.
  7–8   Good. Meaning is clear, minor unnatural phrasing or word choice.
  5–6   Okay. Understandable but noticeable grammar issues or unnatural structure.
  3–4   Needs work. Meaning is unclear or significant errors present.
  1–2   Try again. Mostly incorrect or incomprehensible.

When the score is 7 or above, keep the correction brief — just note what could be slightly more natural. For scores below 7, give a fuller explanation.

Do not grade a response written in English — just note that the learner should try in Cantonese and repeat the question.`;
