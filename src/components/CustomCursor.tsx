import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);

  // Raw mouse coordinates for instant cursor feedback
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Highly responsive spring for the cursor arrow (no noticeable lag)
  const arrowXSpring = useSpring(cursorX, { damping: 40, stiffness: 600, mass: 0.1 });
  const arrowYSpring = useSpring(cursorY, { damping: 40, stiffness: 600, mass: 0.1 });

  // Soft lagging spring for the premium trailer aura
  const trailerXSpring = useSpring(cursorX, { damping: 25, stiffness: 120, mass: 0.6 });
  const trailerYSpring = useSpring(cursorY, { damping: 25, stiffness: 120, mass: 0.6 });

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest("[data-cursor]");
      if (closest) {
        setHoverType(closest.getAttribute("data-cursor"));
      } else {
        setHoverType(null);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Lagging Custom Ring Trailer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
        style={{
          x: trailerXSpring,
          y: trailerYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-[#C9B07C]/40 bg-[#C9B07C]/5 flex items-center justify-center overflow-hidden"
          animate={{
            width: hoverType === "zoom" ? 72 : 24,
            height: hoverType === "zoom" ? 72 : 24,
            backgroundColor: hoverType === "zoom" ? "rgba(201, 176, 124, 0.15)" : "rgba(201, 176, 124, 0.05)",
            borderColor: hoverType === "zoom" ? "rgba(201, 176, 124, 0.8)" : "rgba(201, 176, 124, 0.4)",
          }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
        >
          <AnimatePresence>
            {hoverType === "zoom" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="text-[9px] font-mono font-bold tracking-widest text-[#C9B07C] uppercase"
              >
                ZOOM
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* 2. Instant Custom Arrow Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
        style={{
          x: arrowXSpring,
          y: arrowYSpring,
          translateX: "-1px",
          translateY: "-1px",
        }}
        animate={{
          scale: hoverType === "zoom" ? 0 : 1,
          opacity: hoverType === "zoom" ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <svg
          width="18"
          height="22"
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#C9B07C] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          <path
            d="M1 1 L1 18 L5.5 13.5 L9.5 21 L11.5 19.5 L7.5 12 L13 12 Z"
            fill="currentColor"
            stroke="#050505"
            strokeWidth="1.5"
            strokeLinejoin="miter"
          />
        </svg>
      </motion.div>
    </>
  );
};
