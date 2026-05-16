import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  RefreshCw, 
  BookOpen, 
  Scale, 
  AlertCircle,
  Sparkles
} from "lucide-react";
import { getAuditChatResponse } from "../lib/gemini";
import { cn } from "../lib/utils";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function ComplianceChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Greetings. I'm AutoAudit AI. How can I assist you with your financial compliance or GST queries today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const response = await getAuditChatResponse(userMsg, messages);
      if (response) {
        setMessages(prev => [...prev, { role: "model", content: response }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "model", content: "I apologize, but I encountered an error. Please try again or rephrase your compliance query." }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    { text: "What constitutes a GST mismatch?", icon: AlertCircle },
    { text: "Filing deadlines for Q2 FY26", icon: BookOpen },
    { text: "Compliance checklist for NGOs", icon: Scale },
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col bg-white border border-slate-200 rounded-2xl shadow-xl relative overflow-hidden">
      {/* Chat Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Compliance Assistant</h2>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Gemini v1.0
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth bg-slate-50/30"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                m.role === "user" ? "bg-white border border-slate-200" : "bg-slate-900"
              )}>
                {m.role === "user" ? <User className="w-4 h-4 text-slate-400" /> : <Bot className="w-4 h-4 text-blue-400" />}
              </div>
              <div className={cn(
                "p-4 rounded-xl text-xs leading-relaxed font-medium shadow-sm",
                m.role === "user" 
                  ? "bg-blue-600 text-white" 
                  : "bg-slate-900 text-slate-200 border border-slate-800"
              )}>
                {m.content}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 max-w-[85%] mr-auto"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-blue-400" />
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-8 py-4 flex flex-wrap gap-2 border-t border-slate-100">
          {suggestions.map((s) => (
            <button
              key={s.text}
              onClick={() => setInput(s.text)}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-all flex items-center gap-2 active:scale-95"
            >
              <s.icon className="w-3 h-3 text-blue-600" />
              {s.text}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-8 border-t border-slate-100 bg-slate-50/50">
        <div className="relative group">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your compliance query..."
            className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-6 pr-14 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 p-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50 disabled:grayscale transition-all active:scale-95 shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[9px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest leading-none">
          AI Generated. Cross-reference with legal advisors for final decisions.
        </p>
      </div>
    </div>
  );
}
