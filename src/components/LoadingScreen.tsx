import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { haptics } from "../utils/haptics";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Britain", "History", "Architecture", "Light"];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // Elegant incremental counter progress
    let start = 0;
    const duration = 2800; // 2.8 seconds total
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      start += step + Math.random() * 2; // slight organic variation in speed
      if (start >= 100) {
        setProgress(100);
        clearInterval(timer);
        // Trigger subtle haptic rumble to signal completion
        haptics.immersionWave();
        // Add a slight cinematic pause at 100% before transitioning
        setTimeout(() => {
          onComplete();
        }, 600);
      } else {
        setProgress(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    // Cycle centered words as counter runs
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 600);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div
      id="cinematic-loader"
      className="fixed inset-0 bg-[#050505] z-50 flex flex-col justify-between p-8 md:p-16 select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} // Heavy documentary easing
    >
      {/* Top left mini text */}
      <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-[#8B8B8B] font-mono uppercase">
        <span>A Huanleya Production</span>
        <span>Vol. I — Immersive Documentary</span>
      </div>

      {/* Main cycling text block */}
      <div className="flex flex-col items-center justify-center relative flex-1">
        <div className="h-16 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={words[wordIndex]}
              className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-[#F6F6F6] tracking-wide"
              initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {words[wordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom status layout */}
      <div className="w-full flex flex-col gap-6">
        {/* Progress Bar (Hairline line expanding) */}
        <div className="w-full h-[1px] bg-[#1D1D1D] relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-[#C9B07C]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Counter and Labels */}
        <div className="flex items-end justify-between font-mono">
          <div className="text-left">
            <span className="text-[10px] tracking-[0.2em] text-[#8B8B8B] block uppercase">
              CHAPTER ZERO
            </span>
            <span className="text-xs text-[#F6F6F6] font-sans font-medium tracking-wider">
              Awaiting Sunrise
            </span>
          </div>

          <div className="text-right flex items-baseline">
            <span className="text-5xl md:text-7xl font-sans font-thin tracking-tighter text-[#F6F6F6]">
              {String(progress).padStart(3, "0")}
            </span>
            <span className="text-xs text-[#8B8B8B] ml-1">%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
