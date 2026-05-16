import { motion } from "motion/react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  LineChart,
  Line
} from "recharts";
import { 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  FileText,
  PlusCircle
} from "lucide-react";
import { cn } from "../lib/utils";

const data = [
  { name: "Jan", compliance: 85, anomalies: 12 },
  { name: "Feb", compliance: 88, anomalies: 8 },
  { name: "Mar", compliance: 92, anomalies: 5 },
  { name: "Apr", compliance: 90, anomalies: 7 },
  { name: "May", compliance: 94, anomalies: 3 },
  { name: "Jun", compliance: 96, anomalies: 2 },
];

const anomalyTypes = [
  { name: "GSTR Variance", value: 45, color: "#3B82F6" },
  { name: "Duplicate Invoices", value: 25, color: "#10B981" },
  { name: "Vendor Non-compliance", value: 20, color: "#F59E0B" },
  { name: "Other", value: 10, color: "#EF4444" },
];

function StatCard({ title, value, change, trend, icon: Icon, delay = 0, isAlert = false }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        "card-polish flex flex-col justify-between group",
        isAlert && "border-l-4 border-l-red-500"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{title}</p>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded",
          trend === "up" ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"
        )}>
          {change}
        </div>
      </div>
      <div>
        <h3 className={cn("text-2xl font-bold tracking-tight", isAlert ? "text-red-600" : "text-slate-900")}>
          {value}
        </h3>
        <p className={cn(
          "text-[10px] mt-1 font-medium",
          trend === "up" ? "text-green-600" : "text-slate-400"
        )}>
          {trend === "up" ? "Optimal performance" : "Requires review"}
        </p>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold tracking-tight text-slate-900 mb-1"
          >
            Compliance <span className="text-blue-600 italic serif font-medium">Dashboard</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-sm font-medium"
          >
            Intelligent monitoring and ML-driven anomaly detection.
          </motion.p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            Export Audit Trail
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm active:scale-95 flex items-center gap-2">
            <PlusCircle className="w-3.5 h-3.5" />
            New Audit
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Audit Accuracy" value="99.8%" change="+0.4%" trend="up" icon={ShieldCheck} delay={0.1} />
        <StatCard title="Anomalies Found" value="07" change="Critical" trend="down" icon={AlertTriangle} delay={0.2} isAlert />
        <StatCard title="GST Verification" value="Compliant" change="Verified" trend="up" icon={TrendingUp} delay={0.3} />
        <StatCard title="Pending Review" value="14 Tasks" change="Ongoing" trend="up" icon={Clock} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden"
        >
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Compliance Analytics</h2>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Score
              </div>
            </div>
          </div>

          <div className="p-8 h-[350px] w-full bg-slate-50/30">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="compliance" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorCompliance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Flags */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-4 flex flex-col space-y-6"
        >
          <div className="bg-slate-900 rounded-xl shadow-lg p-6 text-white flex-1 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-20 h-20" />
             </div>
             <h2 className="font-bold text-sm tracking-tight mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Assistant Insight
             </h2>
             <p className="text-xs text-slate-300 leading-relaxed italic mb-8">
               "Detected 3 duplicate invoice numbers reported across different jurisdictions in Nova Supplies Ltd portfolio. Recommend flagging for internal audit review before month-end settlement."
             </p>
             <button className="w-full py-2 bg-blue-600 rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all">
                Run Forensic Scan
             </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-3 tracking-widest">Recent Regulatory Change</h4>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center font-bold">§</div>
              <div>
                <p className="text-xs font-semibold text-slate-800">New Regulation G-240</p>
                <p className="text-[10px] text-slate-500 leading-tight">Internal ML models updated to match Oct 1 filing requirements.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Critical Alerts / Anomalies List */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Critical Transaction Alerts</h2>
          <button className="text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:underline">View All Records</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-3">Ref ID</th>
                <th className="px-6 py-3">Detection Pattern</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Risk Level</th>
                <th className="text-right px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: "TXN-9921", type: "GSTR Mismatch", status: "Flagged", level: "High", risk: 88, color: "text-red-700 bg-red-100" },
                { id: "TXN-9918", type: "Duplicate Inv", status: "Pending", level: "Medium", risk: 45, color: "text-amber-700 bg-amber-100" },
                { id: "TXN-9877", type: "Vendor Alert", status: "Cleared", level: "Low", risk: 12, color: "text-green-700 bg-green-100" },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-xs font-mono text-slate-600 font-bold">{row.id}</td>
                  <td className="px-6 py-4">
                    <span className="text-slate-900 font-semibold text-sm">{row.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider", row.color)}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-32">
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                       <div 
                         className={cn("h-full", row.level === 'High' ? 'bg-red-500' : row.level === 'Medium' ? 'bg-amber-500' : 'bg-green-500')} 
                         style={{ width: `${row.risk}%` }} 
                        />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                      <FileText className="w-4 h-4 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
