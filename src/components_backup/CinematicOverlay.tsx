import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CinematicOverlayProps {
  currentChapter: number;
}

export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({ currentChapter }) => {
  const [triggerFlash, setTriggerFlash] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);

  // Trigger brief light-leak flash whenever the active chapter transitions
  useEffect(() => {
    if (currentChapter === 1) return; // Skip initial load as LoadingScreen handles it
    
    setTriggerFlash(true);
    setFlashKey((prev) => prev + 1);

    const timer = setTimeout(() => {
      setTriggerFlash(false);
    }, 1800); // Allow smooth long transition fade-out

    return () => clearTimeout(timer);
  }, [currentChapter]);

  // Track scroll velocity and apply a dynamic lens-focus backdrop blur
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let targetBlur = 0;
    let currentBlur = 0;
    let frameId: number;

    const handleScroll = () => {
      const now = performance.now();
      const scrollY = window.scrollY;
      
      const dt = now - lastTime;
      const dy = Math.abs(scrollY - lastScrollY);

      if (dt > 0) {
        // Calculate velocity (pixels per millisecond)
        const velocity = dy / dt;
        
        // Map velocity to an elegant max blur of 6px (high-fidelity subtle focus)
        targetBlur = Math.min(velocity * 2.5, 6);
        
        lastScrollY = scrollY;
        lastTime = now;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Core high-performance frame animation and smooth decay loop
    const update = () => {
      // Natural decay rate of the lens-focus target blur
      targetBlur = Math.max(0, targetBlur - 0.15);
      
      // Smooth linear interpolation (lerp) for seamless transitions
      currentBlur = currentBlur + (targetBlur - currentBlur) * 0.12;

      // Threshold to avoid infinite micro-renders
      if (currentBlur < 0.1) {
        currentBlur = 0;
      }

      setBlurAmount(parseFloat(currentBlur.toFixed(2)));
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      {/* 1. Dynamic Lens-Focus Scroll Velocity Backdrop Blur */}
      {blurAmount > 0 && (
        <div
          id="lens-focus-blur-overlay"
          className="fixed inset-0 pointer-events-none z-40 transition-all duration-75 ease-out"
          style={{
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
          }}
        />
      )}

      {/* 2. Persistent Premium Fine Film-Grain Noise Overlay */}
      <div 
        id="persistent-film-grain"
        className="fixed inset-0 pointer-events-none z-45 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Dynamic Documentary Light-Leak Flash Transition */}
      <AnimatePresence mode="wait">
        {triggerFlash && (
          <motion.div
            key={flashKey}
            className="fixed inset-0 pointer-events-none z-45 mix-blend-color-dodge flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0.2, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top-Right warm amber light leak flare */}
            <motion.div
              className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(201,176,124,0.45) 0%, rgba(139,139,139,0.05) 50%, rgba(5,5,5,0) 80%)",
                filter: "blur(80px)",
              }}
              initial={{ scale: 0.85, x: 50, y: -50 }}
              animate={{ scale: 1.15, x: 0, y: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />

            {/* Bottom-Left subtle cool morning mist light flare */}
            <motion.div
              className="absolute -bottom-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(29,29,29,0.3) 0%, rgba(139,139,139,0.02) 60%, rgba(5,5,5,0) 90%)",
                filter: "blur(60px)",
              }}
              initial={{ scale: 0.9, x: -30, y: 30 }}
              animate={{ scale: 1.1, x: 0, y: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />

            {/* Subtle vintage film frame scanline or scratch flash */}
            <motion.div 
              className="absolute inset-0 bg-white/[0.015] w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.12, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
