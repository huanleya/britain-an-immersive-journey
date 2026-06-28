import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { SplitText } from "./SplitText";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

// Ensure GSAP plugins are registered safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ChapterHeroProps {
  onExplore: () => void;
}

export const ChapterHero: React.FC<ChapterHeroProps> = ({ onExplore }) => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Background layer: subtle slow movement down (reverse parallax) to ground the visual
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 12,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Midground misty layer: floats upwards gently, adding cloud-like 3D depth
      if (midRef.current) {
        gsap.to(midRef.current, {
          yPercent: -15,
          opacity: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Foreground Text/Headline elements: float up much faster to exaggerate spatial depth
      if (fgRef.current) {
        gsap.to(fgRef.current, {
          yPercent: -28,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="chapter-01"
      className="relative w-full h-screen bg-[#050505] flex flex-col justify-center items-center overflow-hidden z-10 select-none px-6 md:px-12"
    >
      {/* LAYER 1: Panoramic Background Image (Slowest Parallax) */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[115%] -top-[5%] pointer-events-none origin-center"
      >
        <div className="absolute inset-0 bg-[#050505]/35 z-10" /> {/* Ambient overlay */}
        
        <img
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1920&auto=format&fit=crop"
          alt="Cinematic drone photography of London rooftops in the morning mist at sunrise"
          className="w-full h-full object-cover select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        
        {/* Cinematic gradient fading into dark ground */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
      </div>

      {/* LAYER 2: Midground Atmospheric Mist / Light Leak (Medium Parallax) */}
      <div
        ref={midRef}
        className="absolute inset-0 w-full h-[110%] pointer-events-none mix-blend-screen opacity-[0.12] z-10"
      >
        <img
          src="https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1000&auto=format&fit=crop"
          alt="Atmospheric light flare dust overlay"
          className="w-full h-full object-cover select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* LAYER 3: Interactive Geometric Accent Lines (Adds sharp desktop frame depth) */}
      <div className="absolute inset-0 border-[1px] border-[#C9B07C]/5 m-8 md:m-16 pointer-events-none z-15 rounded" />

      {/* Hero Title Block (Foreground Parallax) */}
      <div
        ref={fgRef}
        className="relative z-20 text-center max-w-4xl flex flex-col items-center pointer-events-none"
      >
        <motion.span
          className="text-xs md:text-sm font-mono tracking-[0.6em] text-[#C9B07C] uppercase mb-4 animate-pulse"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          {t('chapterHero.prologue')}
        </motion.span>

        <SplitText
          text={t('chapterHero.title')}
          type="chars"
          stagger={0.08}
          delayOffset={1.0}
          className="text-7xl md:text-9xl font-serif text-[#F6F6F6] tracking-[0.15em] font-normal"
        />

        <SplitText
          type="lines"
          delayOffset={1.8}
          text={t('chapterHero.description')}
          className="text-base md:text-lg lg:text-xl font-serif italic text-[#B4B4B4] tracking-wide mt-8 max-w-2xl font-light leading-relaxed text-center"
        />
      </div>

      {/* Floating interactive scroll invite indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={onExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#8B8B8B] uppercase group-hover:text-[#C9B07C] transition-colors duration-500">
          {t('chapterHero.scroll_to_begin')}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-[#8B8B8B] group-hover:text-[#C9B07C] transition-colors duration-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};
