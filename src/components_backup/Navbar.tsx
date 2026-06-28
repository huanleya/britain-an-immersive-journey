import React from "react";
import { motion } from "motion/react";
import { Compass, Volume2, VolumeX, Sun, Moon } from "lucide-react";

interface NavbarProps {
  currentChapter: number; // 1 to 7
  totalChapters: number;
  onChapterClick: (index: number) => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const chaptersMetadata = [
  { num: "01", name: "Prologue" },
  { num: "02", name: "The Awakening" },
  { num: "03", name: "Victorian London" },
  { num: "04", name: "Monoliths & Icons" },
  { num: "05", name: "The Countryside" },
  { num: "06", name: "Scotland Heights" },
  { num: "07", name: "Nightfall" },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentChapter,
  onChapterClick,
  audioEnabled,
  onToggleAudio,
  theme,
  onToggleTheme,
}) => {
  return (
    <motion.header
      id="main-navigation"
      className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-6 flex items-center justify-between mix-blend-difference select-none"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
    >
      {/* Brand logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onChapterClick(1)}
      >
        <Compass className="w-4 h-4 text-[#C9B07C] transition-transform duration-700 group-hover:rotate-180" />
        <span className="font-sans text-xs font-semibold tracking-[0.4em] text-[#F6F6F6] uppercase">
          Britain
        </span>
      </div>

      {/* Center Chapter progress dots / lines */}
      <nav className="hidden lg:flex items-center gap-6">
        {chaptersMetadata.map((ch, idx) => {
          const isActive = currentChapter === idx + 1;
          return (
            <button
              key={ch.num}
              onClick={() => onChapterClick(idx + 1)}
              className="flex items-center gap-2 group text-left relative py-2 outline-none focus:outline-none"
            >
              <span
                className={`font-mono text-[10px] tracking-widest transition-colors duration-500 ${
                  isActive ? "text-[#C9B07C] font-semibold" : "text-[#8B8B8B] group-hover:text-[#F6F6F6]"
                }`}
              >
                {ch.num}
              </span>
              
              <span
                className={`font-sans text-[11px] tracking-wider transition-all duration-500 overflow-hidden max-w-0 ${
                  isActive ? "max-w-[120px] text-[#F6F6F6] ml-1" : "group-hover:max-w-[120px] group-hover:text-[#8B8B8B] group-hover:ml-1"
                }`}
              >
                {ch.name}
              </span>

              {/* Stable, elegant horizontal timeline bar underneath active node */}
              <div
                className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C9B07C] transition-all duration-500 ease-out origin-left ${
                  isActive ? "w-full opacity-100 scale-x-100" : "w-0 opacity-0 scale-x-0 group-hover:w-full group-hover:opacity-50 group-hover:scale-x-100"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Right control action */}
      <div className="flex items-center gap-6">
        {/* Dynamic active chapter status badge */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.2em] text-[#8B8B8B] uppercase">
            Chapter
          </span>
          <span className="font-mono text-xs text-[#C9B07C]">
            {String(currentChapter).padStart(2, "0")}
          </span>
        </div>

        {/* Light / Dark Mode Toggle button */}
        <button
          onClick={onToggleTheme}
          className="p-2 border border-[#1D1D1D] rounded-full hover:border-[#C9B07C] transition-colors duration-500 cursor-pointer text-[#F6F6F6] relative group"
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? (
            <Moon className="w-3.5 h-3.5 text-[#C9B07C]" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-[#8B8B8B] hover:text-[#C9B07C]" />
          )}
          {/* Subtle tooltip */}
          <span className="absolute top-12 right-0 bg-[#111111] text-[#F6F6F6] text-[9px] tracking-widest uppercase py-1 px-2.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-[#1D1D1D]">
            {theme === "light" ? "Dark Theme" : "Light Theme"}
          </span>
        </button>

        {/* Ambient atmospheric sound generator button */}
        <button
          onClick={onToggleAudio}
          className="p-2 border border-[#1D1D1D] rounded-full hover:border-[#C9B07C] transition-colors duration-500 cursor-pointer text-[#F6F6F6] relative group"
          title={audioEnabled ? "Disable Ambient Sound" : "Enable Ambient Sound"}
        >
          {audioEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[#C9B07C] animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#8B8B8B]" />
          )}
          {/* Subtle tooltip */}
          <span className="absolute top-12 right-0 bg-[#111111] text-[#F6F6F6] text-[9px] tracking-widest uppercase py-1 px-2.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-[#1D1D1D]">
            {audioEnabled ? "Mute Ambience" : "Play Ambience"}
          </span>
        </button>
      </div>
    </motion.header>
  );
};
