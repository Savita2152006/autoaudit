import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  BarChart3, 
  Lock, 
  Search, 
  Zap,
  Globe,
  Database
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest"
          >
            <Zap className="w-3 h-3" />
            Audit Engine v4.2.0 • Stable Release
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 !leading-[0.9]"
          >
            Intelligent Financial <br />
            <span className="text-blue-600 italic serif font-medium">Audit Compliance.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto font-medium"
          >
            Automate financial transparency with AI-driven precision. Resolve anomalies, monitor compliance, and ensure total statutory adherence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link 
              to="/audit"
              className="px-8 py-4 bg-slate-900 rounded-xl text-sm font-bold text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 flex items-center gap-3 transition-all active:scale-95"
            >
              Start Audit Scan
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/dashboard"
              className="px-8 py-4 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
            >
              View Analytics
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              icon: Cpu, 
              title: "Neural Anomaly Detection", 
              desc: "Proprietary ML models identifies invisible discrepancies in transaction matrices with sub-second precision." 
            },
            { 
              icon: ShieldCheck, 
              title: "Regulatory Guardrails", 
              desc: "Hardened compliance logic for GST, G-240, and international reporting standards updated in real-time." 
            },
            { 
              icon: BarChart3, 
              title: "Semantic Reconciliation", 
              desc: "Intelligent matching algorithms bridge the gap between invoices and payments across fragmented ledgers." 
            },
            { 
              icon: Lock, 
              title: "Enterprise Encryption", 
              desc: "TLS 1.3 and SOC2 compliant data processing protocols ensuring total security for high-value assets." 
            },
            { 
              icon: Search, 
              title: "Forensic Audit Trail", 
              desc: "Generates immutable evidence chains for every AI-identified flag, ready for human auditor verification." 
            },
            { 
              icon: Globe, 
              title: "Jurisdictional Rulesets", 
              desc: "Seamless switching between tax frameworks for APAC, EMEA, and North American markets." 
            },
          ].map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-all group cursor-default shadow-sm"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-blue-50 transition-all font-bold text-slate-500 group-hover:text-blue-600">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-xs font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="bg-slate-900 rounded-[40px] p-12 lg:p-20 text-center space-y-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
        <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight">Optimizing compliance for <br />the next generation of finance.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Anomalies Resolved", val: "1.2M+" },
            { label: "Audit Precision", val: "99.9%" },
            { label: "Market Cap", val: "$4.8B" },
            { label: "Active Institutions", val: "500+" },
          ].map(s => (
            <div key={s.label}>
              <p className="text-4xl font-bold font-mono text-white mb-1 tracking-tighter">{s.val}</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span className="text-slate-900">AutoAudit AI</span>
        </div>
        <p className="normal-case font-medium text-slate-400">© 2026 AutoAudit Technologies. Licensed under Apache 2.0.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Security</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Documentation</a>
        </div>
      </footer>
    </div>
  );
}
