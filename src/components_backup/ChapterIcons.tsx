import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SplitText } from "./SplitText";
import { ParallaxImage } from "./ParallaxImage";
import imgLondonEye from "../assets/images/london_eye.png";
import imgTowerBridge from "../assets/images/tower_bridge.png";
import imgStPauls from "../assets/images/st_pauls.png";

interface Landmark {
  id: string;
  name: string;
  sub: string;
  location: string;
  description: string;
  imageUrl: string;
}

const landmarks: Landmark[] = [
  {
    id: "big-ben",
    name: "Big Ben",
    sub: "Elizabeth Tower",
    location: "Westminster, London",
    description: "The towering guardian of the River Thames. Completed in 1859, the Elizabeth Tower stands as an iconic symbol of London and a pinnacle of Gothic Revival design, envisioned by architect Augustus Pugin. For over a century and a half, its majestic Great Clock has reliably marked London's timeline. Its massive 13.7-ton bell, known colloquially as Big Ben, chimes the hours across the bustling capital, embodying the quiet resilience, perseverance, and timeless heritage of Great Britain.",
    imageUrl: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: "tower-bridge",
    name: "Tower Bridge",
    sub: "Suspension Bascule Bridge",
    location: "Tower Hamlets, London",
    description: "Built between 1886 and 1894, this iconic suspension and bascule bridge blends monumental Victorian stone masonry with advanced steel-frame suspension engineering. Clad in Cornish granite and Portland stone to protect the structural ironwork, it remains a vital artery of London. The bridge gracefully spans the Thames, connecting the city's ancient maritime past and industrial revolution heritage with its dynamic, modern architectural vision.",
    imageUrl: imgTowerBridge,
  },
  {
    id: "westminster",
    name: "Westminster",
    sub: "Palace of Westminster",
    location: "Westminster, London",
    description: "The historic and political heart of British democracy, situated majestically on the north bank of the River Thames. Rising above the water with intricate golden stone carvings, towering spires, and grand gothic arches, the Palace is a UNESCO World Heritage site representing centuries of political and artistic heritage. It hosts the Houses of Parliament, where the echoes of defining historical speeches linger in magnificent chambers designed by Charles Barry.",
    imageUrl: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: "st-pauls",
    name: "St Paul's",
    sub: "St Paul's Cathedral",
    location: "City of London",
    description: "An architectural masterpiece designed by Sir Christopher Wren, its breathtaking dome has dominated the City of London skyline for over 300 years. Built in the late 17th century as a symbol of London's resurrection after the Great Fire of 1666, it represents English Baroque design at its most supreme. Sunlight filters beautifully through the high clerestory windows, illuminating magnificent mosaics, quiet whispering galleries, and centuries of national remembrance.",
    imageUrl: imgStPauls,
  },
  {
    id: "london-eye",
    name: "London Eye",
    sub: "The Millennium Wheel",
    location: "Lambeth, London",
    description: "The giant, cantilevered observation wheel situated on the South Bank of the River Thames. Originally conceived as a celebration of the turn of the millennium, this elegant tensioned steel-and-glass wheel offers an expansive, breathtaking 360-degree panorama of the entire metropolis. As day turns to dusk, the wheel transitions gracefully, lighting up the purple twilight and offering a striking modern contrast to the ancient spires of Westminster.",
    imageUrl: imgLondonEye,
  },
];

export const ChapterIcons: React.FC = () => {
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
          Chapter 04 — Icons of Britain
        </motion.span>
        
        <h2 className="text-4xl md:text-6xl font-serif text-[#F6F6F6] font-normal tracking-wide">
          <SplitText text="Monoliths of Heritage" type="words" />
        </h2>
      </div>

      {/* Stacked Interactive Viewports */}
      <div className="w-full flex flex-col gap-32 md:gap-48">
        {landmarks.map((landmark, idx) => (
          <LandmarkSection key={landmark.id} landmark={landmark} index={idx} />
        ))}
      </div>
    </section>
  );
};

interface LandmarkSectionProps {
  landmark: Landmark;
  index: number;
}

const LandmarkSection: React.FC<LandmarkSectionProps> = ({ landmark, index }) => {
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
              alt={landmark.name}
            />
          </motion.div>
          
          {/* Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent z-10 pointer-events-none" />
        </div>

        {/* Landmark Narrative details (takes 5 cols) */}
        <div data-slow-scroll="true" className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-[#C9B07C] uppercase font-semibold">
              {landmark.location}
            </span>
            
            <h3 className="text-3xl md:text-5xl font-serif text-[#F6F6F6] font-normal leading-tight tracking-wide">
              <SplitText text={landmark.name} type="chars" />
            </h3>
            
            <span className="text-sm font-serif italic text-[#C0C0C0] tracking-wider block mt-1">
              — {landmark.sub}
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
            {landmark.description}
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
