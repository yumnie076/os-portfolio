import { Router, Request, Response } from 'express';
import { strictLimiter } from '../middleware/rateLimiter';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-placeholder'
});

router.post('/', strictLimiter, async (req: Request, res: Response) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });
    
    // Alleen OpenAI call doen als er een echte API key is, anders mock mocken
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-placeholder') {
      return res.json({ reply: 'Ik ben de AI assistent van Yumnie, maar momenteel is de OpenAI API sleutel nog niet geconfigureerd in de backend. Voeg deze toe in de .env file.' });
    }

    const messages = [
      { role: 'system', content: 'Je bent de AI-assistent voor het portfolio van Yumnie. Je praat vanuit haar perspectief of als haar assistent. Antwoord kort, bondig en wees behulpzaam over haar vaardigheden: React, TypeScript, Framer Motion, Node.js, Express, Socket.io.' },
      ...history,
      { role: 'user', content: message }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages as any,
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

export default router;
