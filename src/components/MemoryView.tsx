import { useEffect, useState } from 'react';
import { Trash2, Brain, Calendar, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Memory {
  id: number;
  type: string;
  content: string;
  importance: number;
  created_at: string;
}

export default function MemoryView() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMemories = () => {
    fetch('/api/memory')
      .then(res => res.json())
      .then(data => {
        setMemories(data);
        setIsLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/memory/${id}`, { method: 'DELETE' });
      setMemories(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div className="flex-1 p-8 text-center text-slate-400">Loading memories...</div>;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <header className="h-16 border-b border-slate-100 flex items-center px-8 shrink-0">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Memory Store</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {memories.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Brain className="w-8 h-8 text-slate-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Memories Yet</h3>
              <p className="text-sm text-slate-500 mt-2">Jarvis will automatically extract facts and preferences from your chats.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {memories.map((memory) => (
                  <motion.div
                    key={memory.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-slate-50 border border-slate-100 rounded-2xl group transition-all hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        memory.type === 'profile' ? 'bg-blue-100 text-blue-700' :
                        memory.type === 'preference' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-200 text-slate-600'
                      }`}>
                        {memory.type}
                      </div>
                      <button 
                        onClick={() => handleDelete(memory.id)}
                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed mb-4">{memory.content}</p>
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest border-t border-slate-100 pt-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(memory.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Imp: {memory.importance}/5
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
