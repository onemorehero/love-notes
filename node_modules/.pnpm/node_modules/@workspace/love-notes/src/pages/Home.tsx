import { FloatingHearts } from "@/components/FloatingHearts";
import { MessageInput } from "@/components/MessageInput";
import { MessageList } from "@/components/MessageList";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative bg-background">
      <FloatingHearts />
      
      {/* Header */}
      <header className="pt-10 pb-6 px-6 text-center relative z-10 shrink-0">
        <div className="inline-flex items-center justify-center gap-3 bg-white/40 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/60 shadow-sm mb-4">
          <Heart className="w-4 h-4 text-primary fill-primary/20" />
          <span className="text-xs font-bold tracking-widest uppercase text-primary/80">Only For Us</span>
          <Heart className="w-4 h-4 text-primary fill-primary/20" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground drop-shadow-sm">
          Our Little Space
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Leave a note, a thought, or just some love.
        </p>
      </header>

      {/* Main Feed */}
      <MessageList />

      {/* Input bottom bar */}
      <MessageInput />
    </main>
  );
}
