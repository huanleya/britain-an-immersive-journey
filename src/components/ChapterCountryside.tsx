import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight, ChevronLeft, Wind } from "lucide-react";
import { SplitText } from "./SplitText";
import { ParallaxImage } from "./ParallaxImage";
import { haptics } from "../utils/haptics";
import imgLakeDistrict from "../assets/images/lake_district.png";
import imgCoastalVan from "../assets/images/coastal_van.jpg";
import { useTranslation } from "react-i18next";

interface CountrysideItem {
  id: string;
  imageUrl: string;
}

const itemsData: CountrysideItem[] = [
  { id: "cotswolds-mist", imageUrl: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=1200&auto=format&fit=crop" },
  { id: "ivy-cottage", imageUrl: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?q=80&w=1200&auto=format&fit=crop" },
  { id: "yorkshire-hills", imageUrl: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?q=80&w=1200&auto=format&fit=crop" },
  { id: "lake-district", imageUrl: imgLakeDistrict },
  { id: "coastal-road-trip", imageUrl: imgCoastalVan },
];

export const ChapterCountryside: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track manual horizontal scroll of the gallery container
  const handleScroll = () => {
    if (!scrollTrackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollTrackRef.current;
    const progress = scrollLeft / (scrollWidth - clientWidth);
    setScrollProgress(progress || 0);
  };

  const scrollLeft = () => {
    if (!scrollTrackRef.current) return;
    haptics.lightTap();
    scrollTrackRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollTrackRef.current) return;
    haptics.lightTap();
    scrollTrackRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  // Subtle wind particles drawing
  const [windLines, setWindLines] = useState<{ id: number; y: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate organic wind visual lines floating in background
    const lines = Array.from({ length: 5 }).map((_, idx) => ({
      id: idx,
      y: 20 + Math.random() * 60, // percentage height
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4, // speed
    }));
    setWindLines(lines);
  }, []);

  return (
    <section
      ref={containerRef}
      id="chapter-05"
      data-slow-scroll="true"
      className="relative min-h-screen bg-[#050505] flex flex-col justify-center py-24 md:py-32 overflow-hidden select-none border-b border-[#1D1D1D]"
    >
      {/* Dynamic drifting wind lines to suggest breeze visually */}
      <div className="absolute inset-y-0 right-0 left-0 overflow-hidden pointer-events-none z-0">
        {windLines.map((line) => (
          <motion.div
            key={line.id}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#C9B07C]/15 to-transparent w-96"
            style={{ top: `${line.y}%` }}
            initial={{ x: "-100%" }}
            animate={{ x: "250%" }}
            transition={{
              repeat: Infinity,
              duration: line.duration,
              delay: line.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col gap-12 z-10 relative">
        {/* Editorial Title header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.4em] text-[#C9B07C] uppercase font-mono flex items-center gap-2">
              <Wind className="w-3 h-3 text-[#C9B07C] animate-spin" style={{ animationDuration: "12s" }} />
              {t('chapterCountryside.chapter_title')}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#F6F6F6] font-normal tracking-wide">
              <SplitText text={t('chapterCountryside.title')} type="words" />
            </h2>
          </div>

          {/* Navigation and indicator */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-[#8B8B8B] tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#C9B07C] animate-pulse" />
              {t('chapterAwakening.drag_or_scroll')} • {t('chapterAwakening.scroll_stabilized')}
            </span>
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                className="p-2.5 border border-[#1D1D1D] rounded-full hover:border-[#C9B07C] hover:text-[#C9B07C] text-[#F6F6F6] transition-colors duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className="p-2.5 border border-[#1D1D1D] rounded-full hover:border-[#C9B07C] hover:text-[#C9B07C] text-[#F6F6F6] transition-colors duration-300 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal sliding gallery track */}
        <div
          ref={scrollTrackRef}
          onScroll={handleScroll}
          className="w-full flex gap-8 md:gap-12 overflow-x-scroll scrollbar-none py-4 px-1 cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        >
          {itemsData.map((item, idx) => (
            <div
              key={item.id}
              className="w-[85vw] md:w-[480px] shrink-0 snap-center flex flex-col gap-6"
            >
              {/* Photo Frame */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded border border-[#1D1D1D]">
                {/* Reveal mask */}
                <motion.div
                  className="absolute inset-0 bg-[#050505] z-10"
                  initial={{ width: "100%" }}
                  whileInView={{ width: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: idx * 0.15 }}
                />
                
                <ParallaxImage
                  src={item.imageUrl}
                  alt={t(`chapterCountryside.items.${idx}.title`)}
                />
                <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/5 shadow-lg pointer-events-none">
                  <span className="font-mono text-[10px] text-[#C9B07C] tracking-widest uppercase font-semibold">
                    {t(`chapterCountryside.items.${idx}.coords`)}
                  </span>
                </div>
              </div>

              {/* Caption metadata */}
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif italic text-xl md:text-2xl text-[#F6F6F6]">
                    <SplitText text={t(`chapterCountryside.items.${idx}.title`)} type="words" />
                  </h3>
                  <span className="font-mono text-xs text-[#8B8B8B] font-semibold">
                    05.{idx + 1}
                  </span>
                </div>
                <SplitText
                  key={item.id}
                  type="lines"
                  text={t(`chapterCountryside.items.${idx}.description`)}
                  className="text-sm text-[#D1D1D1] font-sans font-light leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Gallery bottom track progress line */}
        <div className="w-full h-[1px] bg-[#1D1D1D] relative mt-4">
          <div
            className="absolute top-0 h-full bg-[#C9B07C] transition-all duration-300"
            style={{
              left: `${scrollProgress * 80}%`,
              width: "20%",
            }}
          />
        </div>
      </div>
    </section>
  );
};
