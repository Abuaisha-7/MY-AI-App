import { conversationRepository } from '../repositories/conversation.repository';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const chatService = {
   // Add service methods here
   async sendMassage(
      message: string,
      history: Array<{ role: string; content: string }>
   ) {
      // Implementation details
      const SYSTEM_PROMPT = `You are a concise, friendly assistant. 
      - Keep answers short and clear.
      - If unsure, ask a brief clarifying question.
      - For code, prefer minimal runnable snippets.`;

      // Call OpenRouter API with full conversation history

      const response = await fetch(
         'https://openrouter.ai/api/v1/chat/completions',
         {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${OPENAI_API_KEY}`, // Ensure you have your API key in the .env file
               'HTTP-Referer': 'https://my-ai-app-dby3.onrender.com', // Optional. Site URL for rankings on openrouter.ai.
               'X-Title': 'My Chat App', // Optional. Site title for rankings on openrouter.ai.
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               model: 'gpt-3.5-turbo',
               messages: [
                  { role: 'system', content: SYSTEM_PROMPT },
                  ...history,
                  { role: 'user', content: message },
               ],
               temperature: 0.7,
               max_new_tokens: 100,
            }),
         }
      );

      const data = await response.json();
      // Type guard to ensure 'data' is an object
      if (typeof data !== 'object' || data === null) {
         throw new Error('Invalid response from OpenRouter API');
      }
      // console.log('Full OpenRouter response:', JSON.stringify(data, null, 2));
      // Get the assistant’s response safely
      const answer =
         Array.isArray((data as any).choices) &&
         (data as any).choices[0]?.message?.content
            ? (data as any).choices[0].message.content
            : 'No answer found';

      console.log('@ service : ', answer);

      return { reply: answer };
   },
};
