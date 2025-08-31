import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

// impplementation details
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long'),
   conversationId: z.uuid(),
});

// public interface
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      // Validate request body
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(400).json(parseResult.error.format());
         return;
      }

      // fetch response from openrouter api
      try {
         const { prompt, conversationId } = parseResult.data;
         const answer = await chatService.sendMassage(prompt, conversationId);

         // Return response
         res.json({ answer });
      } catch (error) {
         res.status(500).json({
            error: 'Error communicating with OpenRouter API',
            details: error,
         });
      }
   },
};
