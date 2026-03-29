import { useState } from "react";
import { Send, Heart } from "lucide-react";
import { useCreateMessage } from "@/hooks/use-messages";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function MessageInput() {
  const [text, setText] = useState("");
  const [sender, setSender] = useState<"Me" | "My Love">("Me");
  const createMessage = useCreateMessage();

  const handleSend = () => {
    if (!text.trim()) return;
    
    createMessage.mutate({
      data: {
        text: text.trim(),
        sender
      }
    });
    
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white/80 backdrop-blur-xl border-t border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-10 relative">
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {/* Sender Selector */}
        <div className="flex items-center gap-2 self-start bg-secondary/50 p-1 rounded-full border border-secondary">
          {(["Me", "My Love"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setSender(option)}
              className={cn(
                "relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300",
                sender === option ? "text-primary-foreground" : "text-secondary-foreground hover:text-primary"
              )}
            >
              {sender === option && (
                <motion.div
                  layoutId="active-sender"
                  className="absolute inset-0 bg-primary rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{option}</span>
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a sweet note..."
            className="w-full bg-white/50 border border-border/60 rounded-2xl pl-4 pr-14 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 resize-none min-h-[60px] max-h-[120px]"
            rows={1}
          />
          <AnimatePresence>
            {text.trim() && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleSend}
                disabled={createMessage.isPending}
                className="absolute right-2 bottom-2 p-2 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm transition-colors duration-200 disabled:opacity-50"
              >
                {createMessage.isPending ? (
                  <Heart className="w-5 h-5 animate-pulse fill-white" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
