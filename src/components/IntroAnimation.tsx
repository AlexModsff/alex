import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const title = "ALEX STORE";
  const subtext = "Tu mejor opción";

  useEffect(() => {
    // Subtext starts at 2.5s + 1.2s duration = 3.7s. 
    // Reduced stay time to 0.3s after animation finishes = 4.0s total.
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Quick fade out
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* 1. Top Cinematic Line - Slower expansion */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "220px", opacity: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="absolute top-[43%] h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_2px_rgba(168,85,247,0.4)]"
          />

          <div className="relative z-10 text-center mt-4">
            {/* 2. Typewriter Title - Slower typewriter effect */}
            <div className="flex justify-center mb-3">
              {title.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.1,
                    delay: 1.0 + index * 0.12,
                    ease: "linear"
                  }}
                  className="text-4xl md:text-5xl font-black tracking-[0.15em] text-white drop-shadow-[0_0_20px_rgba(168,85,247,1)] uppercase italic"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* 3. Fading Subtext - Later and slower appearance */}
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 2.5,
                ease: "easeOut"
              }}
              className="text-[10px] md:text-xs font-light tracking-[0.4em] text-zinc-400 uppercase"
            >
              {subtext}
            </motion.p>
          </div>

          {/* Background Ambient Glow - Changed to Purple */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-purple-500/5 blur-3xl" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
