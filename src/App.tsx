import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3,
  ShieldCheck,
  FileSearch,
  MessageSquare,
  LayoutDashboard,
  Settings,
  Bell,
  Menu,
  X,
  PlusCircle,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from "lucide-react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AuditRoom from "./pages/AuditRoom";
import ComplianceChat from "./pages/ComplianceChat";
import { cn } from "./lib/utils";

function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/", icon: ShieldCheck },
    { name: "Analysis Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Audit Engine", href: "/audit", icon: FileSearch },
    { name: "Compliance Chat", href: "/chat", icon: MessageSquare },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                AutoAudit
              </span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Compliance
            </div>
            {navItems.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 group text-sm",
                    active
                      ? "bg-slate-800 text-white shadow-inner"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-4 h-4",
                      active
                        ? "text-blue-400"
                        : "text-slate-500 group-hover:text-white",
                    )}
                  />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 mt-auto">
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">
                Audit Engine v4.2.0
              </p>
              <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-1 w-3/4 bg-blue-500 rounded-full" />
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                Real-time monitoring active
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-600 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500">
          <span className="hover:text-slate-800 cursor-pointer font-medium">
            Compliance
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-semibold italic serif underline decoration-blue-500/30 underline-offset-4">
            Audit Workflow
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center bg-green-50 border border-green-200 px-3 py-1 rounded-full">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
          <span className="text-[10px] font-bold text-green-700 uppercase tracking-tight">
            System Health: Optimal
          </span>
        </div>

        <div className="flex items-center gap-4 border-l border-slate-200 pl-6 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 leading-none mb-1">
              User
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              Chief Compliance Officer
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-600 text-sm">
            U
          </div>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div className="lg:pl-64 flex flex-col min-h-screen">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 p-6 md:p-8 lg:p-10 transition-all">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/audit" element={<AuditRoom />} />
                <Route path="/chat" element={<ComplianceChat />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </Router>
  );
}
