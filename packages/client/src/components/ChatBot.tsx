import chatService from '@/services/chat.service';
import { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
   const [messages, setMessages] = useState([
      { role: 'assistant', content: 'Hi! Ask me anything.' },
   ]);
   const [input, setInput] = useState('');
   const [loading, setLoading] = useState(false);
   const endRef = useRef(null);

   useEffect(() => {
      (endRef.current as HTMLDivElement | null)?.scrollIntoView({
         behavior: 'smooth',
      });
   }, [messages]);

   const sendMessage = async () => {
      const text = input.trim();
      if (!text || loading) return;

      const newMessages = [...messages, { role: 'user', content: text }];
      setMessages(newMessages);
      setInput('');
      setLoading(true);

      const formData: {
         message: string;
         history: { role: string; content: string }[];
      } = {
         message: text,
         history: newMessages.slice(-8), // light history for context
      };

      try {
         const data = await chatService.sendMessage(formData);
         data.json().then((data) => {
            console.log(data);
            setMessages((m) => [
               ...m,
               { role: 'assistant', content: data.reply ?? '…' },
            ]);
         });
      } catch {
         setMessages((m) => [
            ...m,
            { role: 'assistant', content: 'Sorry, I had an error.' },
         ]);
      } finally {
         setLoading(false);
      }
   };

   const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         sendMessage();
      }
   };

   return (
      <div className="max-w-xl mx-auto h-[70vh] flex flex-col rounded-2xl border shadow-sm">
         <header className="p-3 border-b font-semibold">
            Simple Chat Agent
         </header>
         <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m, i) => (
               <div
                  key={i}
                  className={`px-3 py-2 rounded-2xl max-w-[85%] ${
                     m.role === 'user'
                        ? 'bg-blue-100 self-end ml-auto'
                        : 'bg-gray-100'
                  }`}
               >
                  {m.content}
               </div>
            ))}
            <div ref={endRef} />
         </div>
         <div className="p-3 border-t flex gap-2">
            <textarea
               className="flex-1 resize-none rounded-xl border p-2 focus:outline-none focus:ring"
               rows={1}
               placeholder="Type a message..."
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={onKey}
            />
            <button
               onClick={sendMessage}
               disabled={loading}
               className="rounded-xl px-4 py-2 border shadow-sm hover:shadow disabled:opacity-50"
            >
               {loading ? '…' : 'Send'}
            </button>
         </div>
      </div>
   );
};

export default ChatBot;
