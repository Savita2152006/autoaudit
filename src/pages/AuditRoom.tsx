import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, 
  File, 
  X, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Database,
  Cpu,
  ShieldAlert,
  Search
} from "lucide-react";
import { cn } from "../lib/utils";

interface AuditResult {
  status: string;
  summary: {
    totalRecords: number;
    anomaliesDetected: number;
    complianceScore: number;
  };
  anomalies: Array<{
    id: number;
    type: string;
    severity: string;
    description: string;
    date: string;
  }>;
}

export default function AuditRoom() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith(".csv") || droppedFile.name.endsWith(".xlsx"))) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const runAnalysis = async () => {
    if (!file) return;
    setAnalyzing(true);
    
    setTimeout(async () => {
      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, data: Array(1500).fill({}) })
        });
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Analysis failed", error);
      } finally {
        setAnalyzing(false);
      }
    }, 2500);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 mt-10">
      <header className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-bold uppercase tracking-widest mx-auto"
        >
          <Cpu className="w-3 h-3" />
          Neural Engine v4 Active
        </motion.div>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 !leading-tight italic serif">Analyze <span className="text-blue-600 not-italic sans">Compliance</span></h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          Upload financial archives for deep structural auditing and risk detection.
        </p>
      </header>

      {!result ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
            className={cn(
              "relative border-2 border-dashed rounded-3xl p-16 lg:p-24 transition-all duration-300 text-center group cursor-pointer bg-white shadow-sm",
              file ? "border-blue-500 bg-blue-50/30" : "border-slate-200 hover:border-blue-300 hover:bg-slate-50",
              analyzing && "pointer-events-none opacity-50"
            )}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".csv,.xlsx" 
              onChange={handleFileSelect}
            />

            <div className="space-y-6">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform border border-slate-200 shadow-sm">
                {file ? (
                  <File className="w-10 h-10 text-blue-600" />
                ) : (
                  <Upload className="w-10 h-10 text-slate-400 group-hover:text-blue-500" />
                )}
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  {file ? file.name : "Secure Upload Portal"}
                </h2>
                <p className="text-slate-500 text-sm font-medium">
                  {file ? `${(file.size / 1024).toFixed(2)} KB • System ready` : "Enterprise XLS/CSV exports only"}
                </p>
              </div>

              {file && !analyzing && (
                <div className="flex items-center justify-center gap-4 pt-4">
                  <button 
                    onClick={(e) => { e.stopPropagation(); reset(); }}
                    className="px-6 py-2.5 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); runAnalysis(); }}
                    className="px-10 py-3 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 flex items-center gap-3 active:scale-95 transition-all"
                  >
                    <Search className="w-4 h-4" />
                    Deep Analysis
                  </button>
                </div>
              )}

              {analyzing && (
                <div className="flex flex-col items-center gap-4 pt-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest animate-pulse">Running Neural Compliance Scan...</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-medium">
            {[
              { icon: Database, title: "Pattern Analysis", desc: "Maps cyclical inconsistencies across transactional nodes." },
              { icon: ShieldAlert, title: "GST Safeguard", desc: "Automated verification against G-240 reporting standards." },
              { icon: CheckCircle2, title: "Audit Integrity", desc: "Ensures immutable documentation for regulatory submission." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="card-polish"
              >
                <f.icon className="w-6 h-6 text-blue-600 mb-6" />
                <h3 className="text-base font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                   <h2 className="font-bold text-slate-800">Anomaly Identification Report</h2>
                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ref: RA-9281-Z</span>
                </div>
                <div className="p-6 space-y-4">
                  {result.anomalies.map((anom) => (
                    <div key={anom.id} className="p-5 bg-slate-50/50 border border-slate-200 rounded-xl hover:bg-white transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider",
                            anom.severity === "High" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                          )}>
                            {anom.severity}
                          </span>
                          <h4 className="text-slate-900 text-sm font-bold">{anom.type}</h4>
                        </div>
                        <span className="text-slate-400 text-[10px] font-mono font-bold uppercase">{anom.date}</span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed font-medium">{anom.description}</p>
                    </div>
                  ))}
                </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
                <p className="text-blue-400 text-[10px] uppercase tracking-widest font-bold mb-1">Audit Score</p>
                <div className="flex items-baseline gap-2 mb-4">
                   <h3 className="text-6xl font-bold font-mono tracking-tighter">{result.summary.complianceScore}</h3>
                   <span className="text-slate-500 font-bold text-xl">/100</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.summary.complianceScore}%` }}
                    className="h-full bg-blue-500"
                  />
                </div>
                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                   <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                   <p className="text-[11px] text-slate-300 leading-snug font-medium italic">
                     "Identified {result.summary.anomaliesDetected} critical discrepancies across {result.summary.totalRecords} records. Action required on flagged TXN nodes."
                   </p>
                </div>
              </div>

              <button 
                onClick={reset}
                className="w-full py-4 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-[0.98] shadow-sm text-sm"
              >
                Reset Audit Parameters
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
