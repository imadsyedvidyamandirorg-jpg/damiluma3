import React, { useState, useRef, useEffect } from 'react';
import { getDamiAriesResponse } from '../../services/gemini';
import { Send, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Dami Aries v9.0 Online. Awaiting command.' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const aiText = await getDamiAriesResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900/50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-2 rounded ${m.role === 'user' ? 'bg-green-900 text-white' : 'bg-black border border-green-500 text-green-400'}`}>
              {m.role === 'ai' && <div className="text-xs font-bold mb-1 flex items-center gap-1"><Bot size={12}/> DAMI_ARIES</div>}
              <div className="text-sm whitespace-pre-wrap">{m.text}</div>
            </div>
          </div>
        ))}
        {loading && <div className="text-green-500 animate-pulse text-sm">Processing neural query...</div>}
      </div>
      
      <div className="p-2 border-t border-green-900 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Dami Aries..."
          className="flex-1 bg-black border border-green-700 p-2 text-green-500 outline-none focus:border-green-400"
        />
        <button onClick={handleSend} className="bg-green-800 p-2 hover:bg-green-700 text-white">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};