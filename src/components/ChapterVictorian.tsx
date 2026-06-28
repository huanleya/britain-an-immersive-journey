import React from "react";
import { motion } from "motion/react";
import { SplitText } from "./SplitText";
import { ParallaxImage } from "./ParallaxImage";
import { useTranslation } from "react-i18next";
import imgVicWestminster from "../assets/images/vic_westminster.png";
import imgVicRain from "../assets/images/vic_rain.png";
import imgVicTownhouse from "../assets/images/vic_townhouse.png";
import imgModTowerBridge from "../assets/images/mod_tower_bridge.jpg";
import imgModRegentStreet from "../assets/images/mod_regent_street.jpg";
import imgModBigBen from "../assets/images/mod_big_ben_sunset.jpg";

export const ChapterVictorian: React.FC = () => {
  const { t } = useTranslation();
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
            {t('chapterVictorian.chapter_title')}
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-serif text-[#F6F6F6] font-normal leading-tight tracking-wide">
            <SplitText text={t('chapterVictorian.title')} type="words" />
          </h2>
          
          <div data-slow-scroll="true" className="flex flex-col gap-4">
            <SplitText
              type="lines"
              text={t('chapterVictorian.description')}
              className="text-base md:text-lg lg:text-xl text-[#B4B4B4] font-sans font-light leading-relaxed max-w-2xl"
            />
            <div className="flex items-center gap-2 mt-2 font-mono text-[10px] md:text-xs text-[#C9B07C] uppercase tracking-widest font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9B07C] animate-pulse" />
              <span>{t('chapterVictorian.scroll')}</span>
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
                src={imgVicWestminster}
                alt="A double-decker red bus passing Westminster under moody clouds"
              />
              {/* Absolute Caption */}
              <div className="absolute bottom-4 left-4 z-20">
                <p className="font-mono text-[11px] tracking-wider text-[#F6F6F6] uppercase font-medium">
                  {t('chapterVictorian.img1_title')}
                </p>
                <p className="font-sans text-[11px] text-[#C0C0C0] mt-0.5">
                  {t('chapterVictorian.img1_desc')}
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
                src={imgVicRain}
                alt="Classic red telephone box on wet London street after rain shower"
              />
              {/* Absolute Caption */}
              <div className="absolute bottom-6 left-6 z-20">
                <p className="font-serif italic text-xl md:text-2xl text-[#F6F6F6] tracking-wide">
                  {t('chapterVictorian.img2_title')}
                </p>
                <p className="font-mono text-[11px] tracking-widest text-[#C9B07C] mt-1.5 uppercase font-medium">
                  {t('chapterVictorian.img2_desc')}
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
                src={imgVicTownhouse}
                alt="Intricate black wrought iron gates and masonry facades"
              />
              {/* Absolute Caption */}
              <div className="absolute bottom-4 left-4 z-20">
                <p className="font-mono text-[11px] tracking-wider text-[#F6F6F6] uppercase font-medium">
                  {t('chapterVictorian.img3_title')}
                </p>
                <p className="font-sans text-[11px] text-[#C0C0C0] mt-0.5">
                  {t('chapterVictorian.img3_desc')}
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Modern Contrast Section Header */}
        <div className="max-w-3xl flex flex-col gap-4 mt-16 md:mt-32">
          <motion.span
            className="text-[10px] tracking-[0.4em] text-[#C9B07C] uppercase font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {t('chapterVictorian.modern_chapter_title')}
          </motion.span>
          
          <h3 className="text-3xl md:text-5xl font-serif text-[#F6F6F6] font-normal leading-tight tracking-wide">
            <SplitText text={t('chapterVictorian.modern_title')} type="words" />
          </h3>
        </div>

        {/* Second Natural Overlapping Collage Layout (Modern) */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end min-h-[500px]">
          
          {/* Left card: Tower Bridge (overlaps behind center) */}
          <div className="md:col-span-4 z-10">
            <motion.div
              className="relative w-full aspect-[4/5] rounded overflow-hidden border border-[#1D1D1D]"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="absolute inset-0 bg-[#050505] z-10"
                initial={{ width: "100%" }}
                whileInView={{ width: "0%" }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
              />
              <ParallaxImage
                src={imgModTowerBridge}
                alt="Tower bridge modern skyline"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="font-mono text-[11px] tracking-wider text-[#F6F6F6] uppercase font-medium">
                  {t('chapterVictorian.img4_title')}
                </p>
                <p className="font-sans text-[11px] text-[#C0C0C0] mt-0.5">
                  {t('chapterVictorian.img4_desc')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Center card: Regent Street (Main card) */}
          <div className="md:col-span-5 md:translate-y-[-40px] z-20">
            <motion.div
              className="relative w-full aspect-[3/4] rounded overflow-hidden border border-[#1D1D1D] shadow-2xl"
              whileHover={{ y: -12, scale: 1.01 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="absolute inset-0 bg-[#050505] z-10"
                initial={{ height: "100%" }}
                whileInView={{ height: "0%" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
              />
              <ParallaxImage
                src={imgModRegentStreet}
                alt="Regent Street Cab and Bus"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <p className="font-serif italic text-xl md:text-2xl text-[#F6F6F6] tracking-wide">
                  {t('chapterVictorian.img5_title')}
                </p>
                <p className="font-mono text-[11px] tracking-widest text-[#C9B07C] mt-1.5 uppercase font-medium">
                  {t('chapterVictorian.img5_desc')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right card: Big Ben Sunset (overlaps in front) */}
          <div className="md:col-span-3 z-30">
            <motion.div
              className="relative w-full aspect-[4/5] rounded overflow-hidden border border-[#1D1D1D]"
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="absolute inset-0 bg-[#050505] z-10"
                initial={{ width: "100%" }}
                whileInView={{ width: "0%" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              />
              <ParallaxImage
                src={imgModBigBen}
                alt="Big ben at sunset"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="font-mono text-[11px] tracking-wider text-[#F6F6F6] uppercase font-medium">
                  {t('chapterVictorian.img6_title')}
                </p>
                <p className="font-sans text-[11px] text-[#C0C0C0] mt-0.5">
                  {t('chapterVictorian.img6_desc')}
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
