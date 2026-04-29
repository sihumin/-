import { useEffect, useState } from 'react';
import { Database, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface DatasetStatus {
  exists: boolean;
  size_bytes: number;
  path: string;
}

export default function DatasetView() {
  const [status, setStatus] = useState<DatasetStatus | null>(null);

  useEffect(() => {
    fetch('/api/dataset/status')
      .then(res => res.json())
      .then(setStatus)
      .catch(console.error);
  }, []);

  if (!status) return null;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <header className="h-16 border-b border-slate-100 flex items-center px-8 shrink-0">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Dataset Manager</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                <Database className="w-6 h-6 text-slate-800" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Local Training Data</h3>
                <p className="text-sm text-slate-500">Collected from your trusted domains.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <FileText className="w-3.5 h-3.5" />
                  Primary File
                </div>
                <p className="text-sm font-bold text-slate-800 truncate">{status.path}</p>
                <div className="mt-4 flex items-center gap-2">
                  {status.exists ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" /> Ready for Training
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      <AlertCircle className="w-3 h-3" /> No Data Found
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Size</div>
                <p className="text-2xl font-bold text-slate-800">{(status.size_bytes / 1024 / 1024).toFixed(2)} <span className="text-sm font-medium text-slate-400">MB</span></p>
                <p className="mt-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Phase 2 Output</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Next Steps</h4>
            <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Run <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-900">python3 scripts/crawler.py</code> to gather raw data.
              </p>
            </div>
            <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Process data with <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-900">python3 scripts/cleaner.py</code> to generate this dataset.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
