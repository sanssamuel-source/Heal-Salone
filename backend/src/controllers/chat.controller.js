const prisma = require('../prisma/client');
const { z } = require('zod');
const OpenAI = require('openai');

// Initialize OpenAI only if key is present to avoid crashes
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const SYSTEM_PROMPT = `
You are 'HealthBot', the AI triage assistant for HEAL Salone, serving communities in Sierra Leone.
YOUR GOAL: To provide immediate, accurate, and calm health guidance to users who may be in remote areas.

GUIDELINES:
1. CONTEXT: You are in Sierra Leone. Recommend "Peripheral Health Units" (PHUs) or "Government Hospitals" for care.
2. TONE: Empathetic, reassuring, and use simple, plain English (Sierra Leonean English context is okay).
3. SAFETY: You are NOT a doctor. You are an AI. You CANNOT diagnose.
   - ALWAYS start or end with: "I am an AI, not a doctor. Please visit a clinic for confirmed medical help."
   - If the user mentions severe bleeding, difficulty breathing, or unconsciousness, tell them to go to a hospital IMMEDIATELY.
4. SCOPE: Answer questions about symptoms, hygiene (Cholera/Malaria prevention), and maternal health.
   - If asked about politics or unrelated topics, politely decline.
`;

const chatSchema = z.object({
  message: z.string().min(1),
});

exports.askAssistant = async (req, res, next) => {
  try {
    const { message } = chatSchema.parse(req.body);

    let reply = '';

    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message }
          ],
          model: "gpt-3.5-turbo",
        });
        reply = completion.choices[0].message.content;
      } catch (aiError) {
        console.error('OpenAI Error:', aiError);
        reply = "I'm having trouble connecting to my knowledge base right now. Please try again later.";
      }
    } else {
      // Fallback stub if no API key
      reply = `(Stub) I am an AI assistant. You asked: "${message}". Please configure OPENAI_API_KEY to get real answers.`;
    }

    const chatLog = await prisma.chatLog.create({
      data: {
        userId: req.user.id,
        message,
        reply,
      },
    });

    res.json(chatLog);
  } catch (error) {
    next(error);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const history = await prisma.chatLog.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(history);
  } catch (error) {
    next(error);
  }
};
