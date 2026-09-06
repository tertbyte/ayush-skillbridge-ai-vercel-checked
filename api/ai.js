import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const SYSTEM = `You are Ayush SkillBridge AI, a concise assistant for an AYUSH internship, skills and placement platform. Explain internship verification, Skill Passports, competency development, job matching and platform workflows. Do not provide medical diagnosis or treatment. Do not request or expose patient-identifying information. For recruitment, use only job-relevant verified evidence and state that AI recommends while a human makes the final hiring decision.`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "AI is not configured. Add OPENAI_API_KEY in Vercel Environment Variables." });
  try {
    const { message, context } = req.body || {};
    if (!message || typeof message !== "string" || message.length > 2000) return res.status(400).json({ error: "Please provide a message up to 2000 characters." });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5",
      store: false,
      instructions: SYSTEM,
      input: [{ role: "user", content: [{ type: "input_text", text: `Portal context: ${JSON.stringify(context || {})}\n\nUser: ${message}` }] }]
    });
    return res.status(200).json({ answer: response.output_text || "I couldn't generate a response right now." });
  } catch (error) {
    console.error("AI request failed", error);
    return res.status(500).json({ error: "AI service temporarily unavailable." });
  }
}
