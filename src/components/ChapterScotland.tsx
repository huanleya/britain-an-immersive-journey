import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SplitText } from "./SplitText";
import { ParallaxImage } from "./ParallaxImage";
import { haptics } from "../utils/haptics";
import imgEileanDonan from "../assets/images/eilean_donan.png";
import imgGlencoe from "../assets/images/glencoe.png";
import imgStorr from "../assets/images/storr.png";
import imgLochNess from "../assets/images/loch_ness.png";
interface ScotlandStory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  accent: string;
}

const stories: ScotlandStory[] = [
  {
    id: "scot-castle",
    title: "Eilean Donan Castle",
    description: "Rising dramatically from the cold, dark tidal waters of three meeting lochs, the ancient stone fortifications of Eilean Donan stand as an eternal sentinel. Framed by majestic misty peaks and pine-covered shores, the castle's iconic silhouette tells tales of legendary Highland clans, hard-fought wars, and timeless architectural endurance. As fog wraps around its ancient battlements, the spirit of medieval Scotland is kept alive within its rugged walls.",
    imageUrl: imgEileanDonan,
    accent: "Kintail Highlands",
  },
  {
    id: "scot-glencoe",
    title: "The Pass of Glencoe",
    description: "An awe-inspiring volcanic valley of immense scale, flanked by sheer, brooding mountains and deep ravines. Heavy, low-hanging clouds constantly spill over the rocky ridges of the Three Sisters, sweeping cold rain, mountain breezes, and a thick morning fog across empty paths paved by ancient footsteps. This dramatic, untamed landscape encapsulates the solemn majesty and untamable wildness of the Scottish Highlands.",
    imageUrl: imgGlencoe,
    accent: "Argyll & Bute",
  },
  {
    id: "scot-bridge",
    title: "The Sligachan Stone Bridge",
    description: "An old, beautifully arched stone bridge cutting through the wild, sweeping landscapes beneath the Red Cuillin mountains on the Isle of Skye. Cold mountain water flows violently and clearly underneath, originating from high, mist-enshrouded peaks enveloped in heavy rolling gray fog. This historic bridge binds the primeval volcanic geology of Skye with traditional masonry, serving as a crossing between physical worlds and legend.",
    imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1200&auto=format&fit=crop",
    accent: "Isle of Skye",
  },
  {
    id: "scot-storr",
    title: "The Old Man of Storr",
    description: "A monumental, jagged basalt rock pinnacle rising abruptly from the steep, grassy hillside of the Trotternish peninsula on the Isle of Skye. Standing tall against a moody, misty sky, these dramatic ancient rock formations look like they belong to a legendary, untamed prehistoric world.",
    imageUrl: imgStorr,
    accent: "Isle of Skye",
  },
  {
    id: "scot-lochness",
    title: "Loch Ness",
    description: "A deep, dark, and narrow freshwater loch stretching through the Scottish Highlands. Surrounded by steep pine-covered hills and the romantic ruins of Urquhart Castle, the still waters are often cloaked in thick morning fog. It is a place evoking deep mystery, folklore, and the enduring legend of the loch's elusive monster.",
    imageUrl: imgLochNess,
    accent: "Scottish Highlands",
  },
];

export const ChapterScotland: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section
      id="chapter-06"
      data-slow-scroll="true"
      className="relative min-h-screen bg-[#020202] py-24 md:py-32 overflow-hidden px-6 md:px-12 border-b border-[#1D1D1D] transition-colors duration-1000"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative">
        
        {/* Left Side: Story Navigation Nodes */}
        <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-28 z-20">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.4em] text-[#C9B07C] uppercase font-mono block">
              Chapter 06 — Northern Kingdom
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#F6F6F6] font-normal leading-none tracking-wide">
              <SplitText text="The Highland" type="words" />
              <br />
              <span className="font-serif italic text-[#C9B07C]">
                <SplitText text="Shadows" type="words" delayOffset={0.25} />
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-6 mt-6">
            {stories.map((story, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={story.id}
                  onClick={() => {
                    haptics.lightTap();
                    setActiveStep(index);
                  }}
                  className="flex items-start text-left gap-6 group relative py-4 border-b border-[#1D1D1D] focus:outline-none cursor-pointer outline-none w-full"
                >
                  {/* Step counter */}
                  <span
                    className={`font-mono text-xs tracking-wider transition-colors duration-500 mt-1 ${
                      isActive ? "text-[#C9B07C] font-semibold" : "text-[#8B8B8B] group-hover:text-[#F6F6F6]"
                    }`}
                  >
                    06.0{index + 1}
                  </span>

                  {/* Step text content */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <h3
                      className={`font-serif text-lg md:text-xl tracking-wider transition-colors duration-500 ${
                        isActive ? "text-[#F6F6F6]" : "text-[#8B8B8B] group-hover:text-[#F6F6F6]"
                      }`}
                    >
                      {story.title}
                    </h3>
                    
                    {/* Expandable description card */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 8 : 0,
                      }}
                      className="overflow-hidden"
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <SplitText
                        key={story.id}
                        type="lines"
                        text={story.description}
                        className="text-sm md:text-base text-[#D1D1D1] font-sans font-light leading-relaxed mb-3"
                      />
                      <span className="font-mono text-[10px] md:text-xs text-[#C9B07C] tracking-widest uppercase flex items-center gap-1.5 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9B07C] animate-pulse" />
                        {story.accent} • Scroll Stabilized
                      </span>
                    </motion.div>
                  </div>

                  {/* Active highlight side line */}
                  {isActive && (
                    <motion.div
                      layoutId="scotland-indicator"
                      className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#C9B07C]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Pinned Interactive Viewport Frame */}
        <div 
          onClick={() => { haptics.lightTap(); setIsZoomed(true); }}
          className="lg:col-span-7 w-full lg:sticky lg:top-28 relative aspect-[16/10] md:aspect-[16/9] rounded overflow-hidden border border-[#1D1D1D] shadow-2xl z-10 cursor-zoom-in group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Overcast gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/45 via-transparent to-[#020202]/35 z-10" />
              
              <ParallaxImage
                src={stories[activeStep].imageUrl}
                alt={stories[activeStep].title}
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating diagnostic lens HUD badge */}
          <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-[#1D1D1D] px-3.5 py-1.5 rounded flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#F6F6F6] uppercase">
              CAMERA LENS LOCKED
            </span>
          </div>
          
          {/* Hover indicator */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-20 flex items-center justify-center pointer-events-none">
             <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white/80 font-mono text-xs tracking-widest uppercase border border-white/20 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => { haptics.lightTap(); setIsZoomed(false); }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
          >
            <motion.img 
              src={stories[activeStep].imageUrl} 
              alt={stories[activeStep].title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-full max-h-full object-contain rounded shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
