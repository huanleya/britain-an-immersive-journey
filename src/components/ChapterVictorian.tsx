import React from "react";
import { motion } from "motion/react";
import { SplitText } from "./SplitText";
import { ParallaxImage } from "./ParallaxImage";

export const ChapterVictorian: React.FC = () => {
  return (
    <section
      id="chapter-03"
      className="relative min-h-screen bg-[#050505] flex flex-col justify-center items-center py-24 md:py-32 overflow-hidden px-6 md:px-12 border-b border-[#1D1D1D]"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 md:gap-24">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl flex flex-col gap-4">
          <motion.span
            className="text-[10px] tracking-[0.4em] text-[#C9B07C] uppercase font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Chapter 03 — Victorian Heritage
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-serif text-[#F6F6F6] font-normal leading-tight tracking-wide">
            <SplitText text="Victorian London" type="words" />
          </h2>
          
          <div data-slow-scroll="true" className="flex flex-col gap-4">
            <SplitText
              type="lines"
              text="Stately Victorian townhouses wrapped in elaborate, dark wrought iron railings line the peaceful residential streets of Chelsea and Kensington. Wet asphalt after a sudden heavy rain shower glistens in the twilight, glowing with the rich, ambient amber reflections of heritage streetlamps. The deep crimson pop of an iconic K6 telephone kiosk or a passing double-decker bus creates a striking, unforgettable contrast against the moody, slate-gray skies. This delicate interplay of texture, color, and vintage atmosphere forms the eternal visual pulse of historical London, inviting you to wander through paths carved by time."
              className="text-base md:text-lg lg:text-xl text-[#B4B4B4] font-sans font-light leading-relaxed max-w-2xl"
            />
            <div className="flex items-center gap-2 mt-2 font-mono text-[10px] md:text-xs text-[#C9B07C] uppercase tracking-widest font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9B07C] animate-pulse" />
              <span>Scroll Stabilized for Reading</span>
            </div>
          </div>
        </div>

        {/* Natural Overlapping Collage Layout */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end min-h-[500px]">
          
          {/* Left card: Double Decker Bus (overlaps behind center) */}
          <div className="md:col-span-4 z-10">
            <motion.div
              className="relative w-full aspect-[4/5] rounded overflow-hidden border border-[#1D1D1D]"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Elegant clip mask reveal */}
              <motion.div
                className="absolute inset-0 bg-[#050505] z-10"
                initial={{ width: "100%" }}
                whileInView={{ width: "0%" }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
              />
              <ParallaxImage
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop"
                alt="A double-decker red bus passing Westminster under moody clouds"
              />
              {/* Absolute Caption */}
              <div className="absolute bottom-4 left-4 z-20">
                <p className="font-mono text-[11px] tracking-wider text-[#F6F6F6] uppercase font-medium">
                  Westminster crossing
                </p>
                <p className="font-sans text-[11px] text-[#C0C0C0] mt-0.5">
                  03.A — Dynamic Contrast
                </p>
              </div>
            </motion.div>
          </div>

          {/* Center card: Rain street & Phone Box (Main card) */}
          <div className="md:col-span-5 md:translate-y-[-40px] z-20">
            <motion.div
              className="relative w-full aspect-[3/4] rounded overflow-hidden border border-[#1D1D1D] shadow-2xl"
              whileHover={{ y: -12, scale: 1.01 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Elegant clip mask reveal */}
              <motion.div
                className="absolute inset-0 bg-[#050505] z-10"
                initial={{ height: "100%" }}
                whileInView={{ height: "0%" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
              />
              <ParallaxImage
                src="https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1200&auto=format&fit=crop"
                alt="Classic red telephone box on wet London street after rain shower"
              />
              {/* Absolute Caption */}
              <div className="absolute bottom-6 left-6 z-20">
                <p className="font-serif italic text-xl md:text-2xl text-[#F6F6F6] tracking-wide">
                  Rain Reflections
                </p>
                <p className="font-mono text-[11px] tracking-widest text-[#C9B07C] mt-1.5 uppercase font-medium">
                  London W1 • England
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right card: Iron Railings / Victorian details (overlaps in front) */}
          <div className="md:col-span-3 z-30">
            <motion.div
              className="relative w-full aspect-[4/5] rounded overflow-hidden border border-[#1D1D1D]"
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Elegant clip mask reveal */}
              <motion.div
                className="absolute inset-0 bg-[#050505] z-10"
                initial={{ width: "100%" }}
                whileInView={{ width: "0%" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              />
              <ParallaxImage
                src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=800&auto=format&fit=crop"
                alt="Intricate black wrought iron gates and masonry facades"
              />
              {/* Absolute Caption */}
              <div className="absolute bottom-4 left-4 z-20">
                <p className="font-mono text-[11px] tracking-wider text-[#F6F6F6] uppercase font-medium">
                  Wrought Iron Facades
                </p>
                <p className="font-sans text-[11px] text-[#C0C0C0] mt-0.5">
                  03.C — W11 Townhouses
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
