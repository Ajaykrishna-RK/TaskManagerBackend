import axios from "axios";

const OPENAI_KEY = process.env.OPENAI_API_KEY!;

export async function suggestPriorityFromText(text: string) {
  try {
    const prompt = `
      Read the following task  and decide the priority.
      Respond with ONLY one word: low, medium, or high.

      Task: "${text}"
    `;

    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const response = res.data.choices?.[0]?.message?.content
      ?.trim()
      ?.toLowerCase();

    if (!response) return "medium";
    if (response.includes("high")) return "high";
    if (response.includes("low")) return "low";

    return "medium";
  } catch (err) {
    console.error("AI Suggest Priority Error:", err);
    return "medium";
  }
}
