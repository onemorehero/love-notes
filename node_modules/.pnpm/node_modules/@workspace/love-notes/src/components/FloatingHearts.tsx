import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface FloatingHeart {
  id: number;
  x: number;
  scale: number;
  duration: number;
  delay: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Generate static initial hearts to avoid hydration mismatch
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 15, // 15-25s
      delay: Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-10%]"
          style={{ left: `${heart.x}%` }}
          animate={{
            y: ["0vh", "-120vh"],
            x: ["0vw", `${(Math.random() - 0.5) * 20}vw`],
            rotate: [0, Math.random() * 360],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <Heart 
            className="text-primary fill-primary/20" 
            style={{ 
              width: `${24 * heart.scale}px`, 
              height: `${24 * heart.scale}px` 
            }} 
          />
        </motion.div>
      ))}
    </div>
  );
}
