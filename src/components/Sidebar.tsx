import { MessageSquare, Globe, Brain, Activity, Settings } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'memory', label: 'Memory', icon: Brain },
  { id: 'knowledge', label: 'Knowledge', icon: Globe },
  { id: 'training', label: 'Training', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 h-full border-r border-slate-200 flex flex-col bg-slate-50 overflow-y-auto">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-600" />
          JARVIS
          <span className="text-[10px] font-medium bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 uppercase">v1.0</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200 font-medium'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
            JD
          </div>
          <div className="text-xs font-semibold text-slate-800">Private Instance</div>
        </div>
      </div>
    </div>
  );
}
