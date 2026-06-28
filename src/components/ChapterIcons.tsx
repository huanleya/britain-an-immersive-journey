import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SplitText } from "./SplitText";
import { ParallaxImage } from "./ParallaxImage";
import imgLondonEye from "../assets/images/london_eye.png";
import imgTowerBridge from "../assets/images/tower_bridge.png";
import imgStPauls from "../assets/images/st_pauls.png";
import imgBigBen from "../assets/images/big_ben.jpg";
import imgBuckingham from "../assets/images/buckingham.jpg";
import imgEdinburghCastle from "../assets/images/edinburgh_castle.jpg";
import imgBritishMuseum from "../assets/images/british_museum.jpg";
import { useTranslation } from "react-i18next";
import imgUnsplash148629926707083823f5448dd from "../assets/images/unsplash_1486299267070-83823f5448dd.jpg";

interface Landmark {
  id: string;
  imageUrl: string;
}

const landmarksData: Landmark[] = [
  { id: "tower-bridge", imageUrl: imgTowerBridge },
  { id: "westminster", imageUrl: {imgUnsplash148629926707083823f5448dd} },
  { id: "st-pauls", imageUrl: imgStPauls },
  { id: "london-eye", imageUrl: imgLondonEye },
  { id: "big-ben", imageUrl: imgBigBen },
  { id: "buckingham", imageUrl: imgBuckingham },
  { id: "edinburgh-castle", imageUrl: imgEdinburghCastle },
  { id: "british-museum", imageUrl: imgBritishMuseum },
];

export const ChapterIcons: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section
      id="chapter-04"
      className="relative bg-[#050505] flex flex-col items-center py-24 md:py-32 select-none border-b border-[#1D1D1D]"
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-16 md:mb-24">
        <motion.span
          className="text-[10px] tracking-[0.4em] text-[#C9B07C] uppercase font-mono block mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {t('chapterIcons.chapter_title')}
        </motion.span>
        
        <h2 className="text-4xl md:text-6xl font-serif text-[#F6F6F6] font-normal tracking-wide">
          <SplitText text={t('chapterIcons.title')} type="words" />
        </h2>
      </div>

      {/* Stacked Interactive Viewports */}
      <div className="w-full flex flex-col gap-32 md:gap-48">
        {landmarksData.map((landmark, idx) => (
          <LandmarkSection key={landmark.id} landmark={landmark} index={idx} t={t} />
        ))}
      </div>
    </section>
  );
};

interface LandmarkSectionProps {
  landmark: Landmark;
  index: number;
  t: any;
}

const LandmarkSection: React.FC<LandmarkSectionProps> = ({ landmark, index, t }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end start"],
  });

  // Slow continuous zoom on scroll for the cinematic imagery
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={elementRef}
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
        
        {/* Landmark Image Frame (takes 7 cols) */}
        <div className={`lg:col-span-7 relative h-[400px] md:h-[550px] rounded overflow-hidden border border-[#1D1D1D] shadow-2xl ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          {/* Cover Mask */}
          <motion.div
            className="absolute inset-0 bg-[#050505] z-10"
            initial={{ height: "100%" }}
            whileInView={{ height: "0%" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div className="w-full h-full" style={{ scale: imgScale, y: imgY }}>
            <ParallaxImage
              src={landmark.imageUrl}
              alt={t(`chapterIcons.landmarks.${index}.name`)}
            />
          </motion.div>
          
          {/* Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent z-10 pointer-events-none" />
        </div>

        {/* Landmark Narrative details (takes 5 cols) */}
        <div data-slow-scroll="true" className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-[#C9B07C] uppercase font-semibold">
              {t(`chapterIcons.landmarks.${index}.location`)}
            </span>
            
            <h3 className="text-3xl md:text-5xl font-serif text-[#F6F6F6] font-normal leading-tight tracking-wide">
              <SplitText text={t(`chapterIcons.landmarks.${index}.name`)} type="chars" />
            </h3>
            
            <span className="text-sm font-serif italic text-[#C0C0C0] tracking-wider block mt-1">
              — {t(`chapterIcons.landmarks.${index}.sub`)}
            </span>
          </div>

          <motion.div
            className="h-[1px] w-12 bg-[#C9B07C]/40 animate-pulse"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />

          {/* Body text appears smoothly after image reveal settled */}
          <motion.p
            className="text-sm md:text-base text-[#D1D1D1] font-sans font-light leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            {t(`chapterIcons.landmarks.${index}.description`)}
          </motion.p>

          <motion.div
            className="flex items-center gap-4 text-xs font-mono tracking-widest text-[#A8A8A8] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-[#C9B07C] font-semibold">0{index + 4}.{landmark.id.slice(0, 2).toUpperCase()}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9B07C] animate-pulse" />
              Scroll Stabilized
            </span>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
