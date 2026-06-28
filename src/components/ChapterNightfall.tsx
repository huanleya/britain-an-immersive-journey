import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SplitText } from "./SplitText";
import { useTranslation } from "react-i18next";

interface Star {
  id: number;
  top: number;
  left: number;
  scale: number;
  duration: number;
  delay: number;
}

export const ChapterNightfall: React.FC = () => {
  const { t } = useTranslation();
  const [stars, setStars] = useState<Star[]>([]);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate organic micro glowing stars for the night sky backdrop
    const generatedStars = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: Math.random() * 55, // only in upper half
      left: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.2,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      setIsInView(true);
    }, 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          clearTimeout(safetyTimeout);
          observer.disconnect();
        }
      },
      {
        rootMargin: "600px", // 600px on all sides for multi-directional scroll protection
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(safetyTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="chapter-07"
      data-slow-scroll="true"
      className="relative w-full min-h-screen bg-[#030303] flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 select-none border-b border-[#1D1D1D]"
    >
      {/* Absolute Shimmering Stars Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.scale * 2}px`,
              height: `${star.scale * 2}px`,
              filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))",
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: star.duration,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Cinematic Night Skyline Frame */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/60 to-[#030303] z-10" />
        {isInView && (
          <img
            src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1920&auto=format&fit=crop"
            alt="London illuminated skyline long exposure reflecting in Thames at night"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-[1500ms] ease-out ${
              isLoaded ? "opacity-35 blur-0 scale-100" : "opacity-0 blur-md scale-[1.03]"
            }`}
            referrerPolicy="no-referrer"
          />
        )}
      </div>

      {/* Centered Editorial Copy */}
      <div className="relative z-10 text-center max-w-4xl flex flex-col items-center">
        <motion.span
          className="text-[10px] tracking-[0.5em] text-[#C9B07C] uppercase font-mono block mb-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {t('chapterNightfall.chapter_title')}
        </motion.span>
        
        <h2 className="text-4xl md:text-7xl font-serif text-[#F6F6F6] font-normal tracking-wide leading-tight mb-6">
          <SplitText text={t('chapterNightfall.title_part1')} type="words" /> <span className="font-serif italic text-[#C9B07C]"><SplitText text={t('chapterNightfall.title_part2')} type="words" delayOffset={0.2} /></span>
        </h2>

        <motion.div
          className="h-[1px] w-12 bg-[#C9B07C]/40 mb-8 animate-pulse"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <motion.p
          className="text-base md:text-lg lg:text-xl text-[#B4B4B4] font-sans font-light leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {t('chapterNightfall.description')}
        </motion.p>

        <div className="flex items-center gap-2 mt-2 font-mono text-[10px] md:text-xs text-[#C9B07C] uppercase tracking-widest font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9B07C] animate-pulse" />
          <span>{t('chapterNightfall.scroll')}</span>
        </div>

        <motion.div
          className="mt-12 flex items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <span className="font-mono text-[9px] text-[#8B8B8B] uppercase tracking-wider">{t('chapterNightfall.status_label')}</span>
            <span className="font-sans text-xs text-[#C9B07C] font-light mt-1">{t('chapterNightfall.status_value')}</span>
          </div>
          <div className="w-[1px] h-8 bg-[#1D1D1D]" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-[9px] text-[#8B8B8B] uppercase tracking-wider">{t('chapterNightfall.time_label')}</span>
            <span className="font-sans text-xs text-[#C9B07C] font-light mt-1">{t('chapterNightfall.time_value')}</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
};
