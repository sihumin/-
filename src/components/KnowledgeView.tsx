import React, { useEffect, useState } from 'react';
import { Globe, Plus, Trash2, Search, Link as LinkIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface KnowledgeDoc {
  id: string;
  url: string;
  title: string;
  text: string;
  created_at: string;
}

export default function KnowledgeView() {
  const [docs, setDocs] = useState<KnowledgeDoc[]>([]);
  const [url, setUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchKnowledge = () => {
    fetch('/api/knowledge')
      .then(res => res.json())
      .then(setDocs)
      .catch(console.error);
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsImporting(true);
    setError(null);
    try {
      const res = await fetch('/api/knowledge/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUrl('');
      fetchKnowledge();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsImporting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/knowledge/${id}`, { method: 'DELETE' });
      setDocs(prev => prev.filter(d => d.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <header className="h-16 border-b border-slate-100 flex items-center px-8 shrink-0">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Knowledge Base</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Import Section */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Import Site</h3>
            <p className="text-sm text-slate-500 mb-6">Enter a URL to crawl and index specific knowledge into Jarvis.</p>
            
            <form onSubmit={handleImport} className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="url"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                />
              </div>
              <button 
                disabled={isImporting}
                className="px-6 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isImporting ? <span className="animate-spin text-lg">⏳</span> : <Plus className="w-4 h-4" />}
                Import
              </button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}
          </div>

          {/* List Section */}
          <div className="flex items-center justify-between mb-6 px-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Indexed Documents ({docs.length})</h3>
          </div>

          {docs.length === 0 ? (
            <div className="py-20 text-center opacity-40">
              <Globe className="w-12 h-12 mx-auto mb-4" />
              <p className="text-sm font-medium">No documents in knowledge base.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {docs.map((doc) => (
                  <motion.div
                    key={doc.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-white border border-slate-100 rounded-2xl group hover:border-slate-200 transition-all flex items-start justify-between"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="text-sm font-bold text-slate-800 truncate mb-1">{doc.title}</h4>
                      <div className="flex items-center gap-3">
                        <a href={doc.url} target="_blank" rel="noreferrer" className="text-[10px] text-blue-500 font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
                          <LinkIcon className="w-3 h-3" /> {new URL(doc.url).hostname}
                        </a>
                        <span className="text-[10px] text-slate-400 font-medium">Indexed {new Date(doc.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-3 text-xs text-slate-500 line-clamp-2 leading-relaxed italic">
                        "{doc.text.substring(0, 150)}..."
                      </p>
                    </div>
                    <button 
                      onClick={() => handleDelete(doc.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
