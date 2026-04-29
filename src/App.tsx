import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import MemoryView from './components/MemoryView';
import KnowledgeView from './components/KnowledgeView';
import TrainingView from './components/TrainingView';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatWindow />;
      case 'memory':
        return <MemoryView />;
      case 'knowledge':
        return <KnowledgeView />;
      case 'training':
        return <TrainingView />;
      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 flex-shrink-0">
              <span className="text-2xl">⚙️</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 capitalize tracking-tight">{activeTab} Phase</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-sm leading-relaxed font-medium">
              This module is scheduled for maintenance. All external AI API keys are strictly forbidden here.
            </p>
            <button 
              onClick={() => setActiveTab('chat')}
              className="mt-8 px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-sm"
            >
              Return to Chat
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans selection:bg-slate-100 italic-selection:text-black">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {renderContent()}
      </main>
    </div>
  );
}
