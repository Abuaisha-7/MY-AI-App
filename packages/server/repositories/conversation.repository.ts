// impplementation details
// Store conversation history in memory
// Key: conversationId, Value: array of messages
const messageHistory = new Map<string, { role: string; content: string }[]>();

export const conversationRepository = {
   // Add repository methods here
   getMessageHistory(conversationId: string) {
      return messageHistory.get(conversationId) || [];
   },

   addMessageToHistory(
      conversationId: string,
      history: { role: string; content: string }[]
   ) {
      messageHistory.set(conversationId, history);
   },
};
