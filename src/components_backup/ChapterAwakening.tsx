import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SplitText } from "./SplitText";
import { ParallaxImage } from "./ParallaxImage";

export const ChapterAwakening: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Multilayered parallax maps
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const secondaryImageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textTranslateY = useTransform(scrollYProgress, [0, 0.5], [30, 0]);

  return (
    <section
      ref={containerRef}
      id="chapter-02"
      className="relative min-h-screen bg-[#050505] flex flex-col justify-center items-center py-24 md:py-32 overflow-hidden select-none px-6 md:px-12 border-b border-[#1D1D1D]"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        
        {/* Left Editorial Text Block */}
        <div className="lg:col-span-5 flex flex-col gap-6 z-20">
          <motion.span
            className="text-[10px] tracking-[0.4em] text-[#C9B07C] uppercase font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1 }}
          >
            Chapter 02 — The Awakening City
          </motion.span>

          <h2 className="text-3xl md:text-5xl font-serif text-[#F6F6F6] leading-[1.15] tracking-wide">
            <SplitText text="The Awakening" type="words" delayOffset={0.1} />
            <br />
            <span className="font-serif italic text-[#C9B07C]">
              <SplitText text="City" type="words" delayOffset={0.3} />
            </span>
          </h2>

          <motion.div
            className="h-[1px] w-16 bg-[#C9B07C]/40"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />

          <div data-slow-scroll="true" className="flex flex-col gap-6 text-sm md:text-base lg:text-lg text-[#B4B4B4] font-sans font-light leading-relaxed max-w-xl">
            <SplitText
              type="lines"
              text="As the golden morning sun slowly pierces through the dense British fog, London’s majestic rooftops and historic chimney pots are gradually uncovered in the soft daylight. The metropolis awakens in absolute, breathtaking silence, draped in a delicate veil of early morning mist that hangs low over the quiet Thames."
              className="text-sm md:text-base lg:text-lg text-[#B4B4B4] font-sans font-light leading-relaxed"
            />
            <SplitText
              type="lines"
              text='"The river glides at his own sweet will: Dear God! the very houses seem asleep; And all that mighty heart is lying still!"'
              className="border-l-2 border-[#C9B07C] pl-4 italic text-base md:text-lg text-[#D1D1D1] my-2 font-serif"
            />
            <SplitText
              type="lines"
              text="Over the centuries, the ancient red brick, weathered Portland stone, and traditional masonry structures of these historic mews and townhouses have absorbed both the rain and the soft, golden English sun. Each architectural layer reflects a rich tapestry of history, capturing quiet stories of generations who walked these cobbled streets under the changing British sky."
              className="text-sm md:text-base lg:text-lg text-[#B4B4B4] font-sans font-light leading-relaxed"
            />
            <div className="flex items-center gap-2 mt-2 font-mono text-[10px] md:text-xs text-[#C9B07C] uppercase tracking-widest font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9B07C] animate-pulse" />
              <span>Scroll Stabilized for Reading</span>
            </div>
          </div>
        </div>

        {/* Right Layered Parallax Composition */}
        <div className="lg:col-span-7 relative h-[500px] md:h-[650px] flex items-center justify-center z-10">
          {/* Main Large Roof Image Layer */}
          <motion.div
            className="absolute left-4 top-12 w-[75%] h-[75%] overflow-hidden rounded border border-[#1D1D1D] shadow-2xl"
            style={{ y: backgroundY }}
          >
            {/* Elegant clip mask reveal overlay */}
            <motion.div
              className="absolute inset-0 bg-[#050505] z-10"
              initial={{ height: "100%" }}
              whileInView={{ height: "0%" }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <ParallaxImage
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop"
              alt="Elizabeth Tower enveloped in soft early morning mist"
            />
          </motion.div>

          {/* Overlapping Secondary Masonry Texture Layer */}
          <motion.div
            className="absolute right-4 bottom-8 w-[45%] h-[50%] overflow-hidden rounded border border-[#1D1D1D] shadow-2xl z-20"
            style={{ y: secondaryImageY }}
          >
            <motion.div
              className="absolute inset-0 bg-[#050505] z-10"
              initial={{ height: "100%" }}
              whileInView={{ height: "0%" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            />
            <ParallaxImage
              src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=800&auto=format&fit=crop"
              alt="Vintage brick and architectural rooftops details of London houses"
            />
          </motion.div>

          {/* Minimal Floating Caption */}
          <motion.div
            className="absolute left-8 bottom-4 font-mono text-[9px] tracking-widest text-[#8B8B8B] flex items-center gap-3"
            style={{ y: foregroundY }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9B07C] animate-pulse" />
            <span>SONY A7R V • 35MM F1.8 • RAW</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
