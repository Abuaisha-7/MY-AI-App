import { conversationRepository } from '../repositories/conversation.repository';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const chatService = {
   // Add service methods here
   async sendMassage(prompt: string, conversationId: string) {
      // Implementation details
      // Get or initialize history for this conversation
      const history = conversationRepository.getMessageHistory(conversationId);

      // Add current user prompt to history
      history.push({ role: 'user', content: prompt });

      // Call OpenRouter API with full conversation history

      const response = await fetch(
         'https://openrouter.ai/api/v1/chat/completions',
         {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${OPENAI_API_KEY}`, // Ensure you have your API key in the .env file
               'HTTP-Referer': 'http://localhost:3000', // Optional. Site URL for rankings on openrouter.ai.
               'X-Title': 'My Chat App', // Optional. Site title for rankings on openrouter.ai.
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               model: 'gpt-3.5-turbo',
               messages: history,
               temperature: 0.7,
               max_new_tokens: 100,
            }),
         }
      );

      const data = await response.json();
      console.log('Full OpenRouter response:', JSON.stringify(data, null, 2));
      // Get the assistant’s response
      const answer = data.choices?.[0]?.message?.content || 'No answer found';

      // Add assistant response to history
      history.push({ role: 'assistant', content: answer });

      // Save updated history
      conversationRepository.addMessageToHistory(conversationId, history);

      return answer;
   },
};
