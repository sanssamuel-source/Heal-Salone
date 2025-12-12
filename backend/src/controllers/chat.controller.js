const prisma = require('../prisma/client');
const { z } = require('zod');
const OpenAI = require('openai');

// Initialize OpenAI only if key is present to avoid crashes
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

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
            { role: "system", content: "You are a helpful health assistant for 'Heal Salone', a platform in Sierra Leone. Provide concise, accurate health advice with a disclaimer that you are an AI and they should see a doctor for emergencies." },
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
