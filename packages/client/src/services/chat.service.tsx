// Import from the env
const api_url = import.meta.env.VITE_API_URL;

// A function to send the message to the server
export const sendMessage = async (formData: {
   message: string;
   history: { role: string; content: string }[];
}) => {
   console.log(formData);
   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
   };
   const response = await fetch(`${api_url}/api/chat`, requestOptions);

   return response;
};

// Export the functions to the client
const chatService = {
   sendMessage,
};

export default chatService;
