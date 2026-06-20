export const JAPANESE_GRADING_RULES = `GRADING RULES:
Output a grade block using this exact format:

  <grade>
    <score>7/10</score>
    <label>Good</label>
    <summary>Your sentence was clear and mostly natural.</summary>
    <correction>
      <improved>こう言うともっと自然です：「すみません、このシャツはいくらですか？」</improved>
      <romaji_improved>kou iu to motto shizen desu: "sumimasen, kono shatsu wa ikura desu ka?"</romaji_improved>
      <english_improved>A more natural way: "Excuse me, how much is this shirt?"</english_improved>
      <explanation>Adding すみません before a question is more polite and natural in Japanese shops.</explanation>
    </correction>
  </grade>

GRADING SCALE (out of 10):
  9–10  Perfect / Native-level. Correct grammar, natural vocabulary, appropriate register.
  7–8   Good. Meaning is clear, minor unnatural phrasing or particle usage.
  5–6   Okay. Understandable but noticeable grammar or particle errors.
  3–4   Needs work. Meaning is unclear or significant errors present.
  1–2   Try again. Mostly incorrect or incomprehensible.

When the score is 7 or above, keep the correction brief — just note what could be slightly more natural. For scores below 7, give a fuller explanation.

Do not grade a response written in English — just note that the learner should try in Japanese and repeat the question.`;
