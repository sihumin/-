import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Fetch initial history
    fetch('/api/history')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMessages(data.map((m: any) => ({
            role: m.role,
            content: m.content
          })));
        }
      })
      .catch(console.error);

    // Fetch status
    fetch('/api/training/status')
      .then(res => res.json())
      .then(setStatus)
      .catch(console.error);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      
      const assistantMsg: Message = { 
        role: 'assistant', 
        content: data.response 
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection failed. Please ensure the local server is running.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full relative">
      {/* Header */}
      <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-500">Active Chat</span>
          <div className={`flex items-center gap-2 px-2 py-1 border rounded text-[10px] font-bold uppercase tracking-wider ${
            status?.modelSource === 'user_trained_local' ? 'bg-green-50 border-green-100 text-green-700' :
            status?.modelSource === 'fallback_pretrained_test_model' ? 'bg-amber-50 border-amber-100 text-amber-700' :
            'bg-slate-50 border-slate-100 text-slate-500'
          }`}>
            {status?.modelSource || 'Inference Loading...'}
          </div>
        </div>
        <div className="text-xs text-slate-400 font-medium">SQLite Session Active</div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-8 space-y-6 scrollbar-hide">
        <div className="max-w-3xl mx-auto space-y-8">
          <AnimatePresence initial={false}>
            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <Bot className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Hello, I'm Jarvis.</h3>
                <p className="text-sm text-slate-500 mt-2">All data is local. No external APIs connected.</p>
              </motion.div>
            )}
            
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center text-white text-[10px] font-bold ${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800'}`}>
                  {msg.role === 'user' ? 'ME' : 'J'}
                </div>
                <div className={`flex-1 space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div 
                    className={`p-4 rounded-2xl text-sm leading-relaxed inline-block ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none text-left' 
                        : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div className="text-[10px] text-slate-400 px-1 font-medium flex items-center gap-2 justify-start uppercase tracking-wider">
                    {msg.role === 'assistant' ? 'Jarvis Core • System Message' : 'User • Active Instance'}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-white text-[10px] font-bold">
                J
              </div>
              <div className="bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl rounded-tl-none flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Processing...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-8 border-t border-slate-100 shrink-0 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <form 
              onSubmit={handleSend}
              className="w-full relative flex items-center"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e as any);
                  }
                }}
                placeholder="Type a message to your private JARVIS..."
                className="w-full p-4 pr-16 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 text-sm h-14 overflow-hidden"
                rows={1}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-3 p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-30 transition-all"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                </div>
              </button>
            </form>
          </div>
          <div className="mt-3 flex justify-center gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> No External APIs Connected
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Local Inference Only
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
