import { useEffect, useState } from 'react';
import { Activity, Brain, Server, CheckCircle2, AlertCircle } from 'lucide-react';

interface TrainingStatus {
  trainedModelExists: boolean;
  usingFallbackModel: boolean;
  modelSource: string;
  modelPath: string;
  inference_engine: string;
}

export default function TrainingView() {
  const [status, setStatus] = useState<TrainingStatus | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchStatus = () => {
    fetch('/api/training/status')
      .then(res => res.json())
      .then(setStatus)
      .catch(console.error);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const toggleFallback = async () => {
    if (!status) return;
    setIsUpdating(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ useFallbackModel: !status.usingFallbackModel })
      });
      fetchStatus();
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!status) return null;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <header className="h-16 border-b border-slate-100 flex items-center px-8 shrink-0">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Training Dashboard</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Inference Engine</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {status.modelSource === 'user_trained_local' ? 'Custom Brain Active' : 
                   status.modelSource === 'fallback_pretrained_test_model' ? 'Fallback Active (Testing)' :
                   'No Brain Active'}
                </h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
                  {status.trainedModelExists 
                    ? "Jarvis is running on your proprietary knowledge base." 
                    : "Custom model missing. Using pretrained fallback for testing purposes only."}
                </p>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                <Brain className="w-48 h-48" />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${status.trainedModelExists ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                {status.trainedModelExists ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Custom Model</div>
              <p className={`text-sm font-bold ${status.trainedModelExists ? 'text-green-600' : 'text-amber-600'}`}>
                {status.trainedModelExists ? 'Trained' : 'Missing'}
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-slate-400" />
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Model Settings</h4>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div>
                  <div className="text-sm font-bold text-slate-800">Use Fallback Model</div>
                  <p className="text-xs text-slate-500">Enable distilgpt2 for testing when custom model is missing.</p>
                </div>
                <button 
                  disabled={isUpdating}
                  onClick={toggleFallback}
                  className={`w-12 h-7 rounded-full transition-colors relative ${status.usingFallbackModel ? 'bg-slate-900' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${status.usingFallbackModel ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-slate-100 rounded-2xl">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source</div>
                  <div className="text-sm font-bold text-slate-800">{status.modelSource}</div>
                </div>
                <div className="p-4 border border-slate-100 rounded-2xl">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Engine</div>
                  <div className="text-sm font-bold text-slate-800">{status.inference_engine}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-slate-100" />
              </div>
              <div>
                <h4 className="font-bold">Phase 2: Custom Model Training</h4>
                <p className="text-xs text-slate-400">Train your Jarvis brain from scratch using Google Colab.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">1</div>
                <div className="flex-1">
                  <div className="text-sm font-bold">Download Training Dataset</div>
                  <p className="text-[10px] text-slate-400">Export your crawled and cleaned knowledge base.</p>
                </div>
                <a href="/api/training/download-dataset" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all">Download</a>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">2</div>
                <div className="flex-1">
                  <div className="text-sm font-bold">Download Colab Notebook</div>
                  <p className="text-[10px] text-slate-400">Use our pre-configured training lab to build your model.</p>
                </div>
                <a href="/api/training/download-notebook" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all">Download .ipynb</a>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">3</div>
                <div className="flex-1">
                  <div className="text-sm font-bold">Upload Results</div>
                  <p className="text-[10px] text-slate-400">Place the resulting model files into /model/final directory.</p>
                </div>
                <div className="px-4 py-2 bg-slate-800 text-slate-500 rounded-xl text-xs font-bold italic">Manual Step</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
