import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

// impplementation details
const chatSchema = z.object({
   message: z
      .string()
      .trim()
      .min(1, 'message is required')
      .max(1000, 'message is too long'),
   history: z.array(
      z.object({
         role: z.string(),
         content: z.string(),
      })
   ),
});

// public interface
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      // Validate request body
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(400).json({ errors: parseResult.error.issues });
         return;
      }

      // fetch response from openrouter api
      try {
         const { message, history } = parseResult.data;
         const answer = await chatService.sendMassage(message, history);
         console.log(answer);
         // Return response
         res.send(answer);
      } catch (error) {
         res.status(500).json({
            error: 'Error communicating with OpenRouter API',
            details: error,
         });
      }
   },
};
