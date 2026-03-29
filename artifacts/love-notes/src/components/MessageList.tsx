import { useMessages, useDeleteMessage } from "@/hooks/use-messages";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function MessageList() {
  const { data: messages, isLoading, isError } = useMessages();
  const deleteMessage = useDeleteMessage();

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-primary/50 py-20">
        <Heart className="w-8 h-8 animate-bounce fill-primary/20" />
        <p className="font-display text-lg italic">Gathering our memories...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <p className="text-destructive font-medium bg-destructive/10 px-6 py-3 rounded-full">
          Failed to load messages. Love will find a way... soon!
        </p>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground py-20">
        <div className="w-24 h-24 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm border border-white">
          <Sparkles className="w-10 h-10 text-primary/40" />
        </div>
        <h3 className="font-display text-2xl text-primary/80 mt-4">It's quiet here</h3>
        <p className="text-center max-w-sm px-6 leading-relaxed">
          Send the first little note to start filling this space with your love.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 relative z-10 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
        <AnimatePresence initial={false}>
          {messages.map((message) => {
            const isMe = message.sender === "Me";

            return (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className={cn(
                  "flex flex-col group max-w-[85%]",
                  isMe ? "self-end items-end" : "self-start items-start"
                )}
              >
                <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground/80 mb-1 px-2">
                  {message.sender}
                </span>
                
                <div 
                  className={cn(
                    "relative px-5 py-3.5 shadow-sm transition-shadow duration-300 hover:shadow-md border",
                    isMe 
                      ? "bg-gradient-to-br from-primary to-rose-400 text-white rounded-3xl rounded-tr-sm border-transparent" 
                      : "bg-white/90 backdrop-blur-sm text-foreground rounded-3xl rounded-tl-sm border-white/60"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {message.text}
                  </p>
                  
                  {/* Action row container */}
                  <div className={cn(
                    "flex items-center gap-3 mt-2",
                    isMe ? "justify-end text-primary-foreground/80" : "justify-start text-muted-foreground"
                  )}>
                    <span className="text-[10px] opacity-80">
                      {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                    </span>
                    
                    <button
                      onClick={() => deleteMessage.mutate({ id: message.id })}
                      className={cn(
                        "opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-black/10",
                        isMe ? "text-white hover:text-white" : "text-destructive hover:bg-destructive/10"
                      )}
                      title="Delete note"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
