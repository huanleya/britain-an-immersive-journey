import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Mail, ShieldAlert, Award, Compass, RefreshCw } from "lucide-react";
import { SplitText } from "./SplitText";
import { haptics } from "../utils/haptics";
import imgEpilogueBg from "../assets/images/epilogue_bg.png";
import { useTranslation } from "react-i18next";

interface ChapterEndingProps {
  onRestart: () => void;
}

export const ChapterEnding: React.FC<ChapterEndingProps> = ({ onRestart }) => {
  const { t } = useTranslation();
  const [modalType, setModalType] = useState<"contact" | "credits" | null>(null);

  return (
    <section
      id="chapter-ending"
      className="relative w-full h-screen bg-[#010101] flex flex-col justify-between p-8 md:p-16 overflow-hidden select-none"
    >
      {/* Subtle Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.img
          src={imgEpilogueBg}
          alt="Ancient stones under a starry night sky"
          className="w-full h-full object-cover opacity-90"
          initial={{ scale: 1.05, filter: "blur(4px)" }}
          whileInView={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 3, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        {/* Very light vignette just to ensure text readability in the center, without darkening the bottom stones */}
        <div className="absolute inset-0 bg-[#010101]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10" /> {/* spacing balance */}

      {/* Center Cinematic Statement */}
      <div className="flex flex-col items-center justify-center text-center relative z-10 max-w-4xl mx-auto">
        <motion.span
          className="text-[10px] tracking-[0.6em] text-[#C9B07C] uppercase font-mono block mb-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          {t('chapterEnding.epilogue')}
        </motion.span>

        <h2 className="text-4xl md:text-7xl font-serif text-[#F6F6F6] font-normal leading-tight tracking-wide mb-8">
          <SplitText text={t('chapterEnding.quote1')} type="words" />
          <br />
          <span className="font-serif italic text-[#C9B07C]">
            <SplitText text={t('chapterEnding.quote2')} type="words" delayOffset={0.3} />
          </span>
        </h2>

        <motion.div
          className="h-[1px] w-24 bg-[#C9B07C]/40 mb-8"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />

        <p className="text-xs md:text-sm text-[#8B8B8B] font-mono tracking-widest uppercase">
          {t('chapterEnding.completed')}
        </p>
      </div>

      {/* Footer (No clutter, pure premium utility) */}
      <footer className="w-full relative z-20 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#1D1D1D] text-xs font-mono text-[#8B8B8B]">
        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#C9B07C]" />
            <span className="tracking-[0.2em] uppercase text-[#F6F6F6]/80">Britain Immersive © 2026</span>
          </div>
          <span className="hidden sm:inline text-[#1D1D1D]">|</span>
          <a
            href="https://github.com/huanleya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8B8B8B] hover:text-[#C9B07C] transition-colors duration-300"
          >
            {t('chapterEnding.author')}: <span className="text-[#C9B07C]">huanleya</span>
          </a>
        </div>

        <div className="flex items-center gap-8">
          {/* Explore Again (Trigger restart) */}
          <button
            onClick={onRestart}
            className="flex items-center gap-2 hover:text-[#C9B07C] transition-colors duration-300 cursor-pointer text-left outline-none"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#C9B07C]" />
            <span>{t('chapterEnding.explore_again')}</span>
          </button>

          {/* Contact Trigger */}
          <button
            onClick={() => {
              haptics.mediumClick();
              setModalType("contact");
            }}
            className="hover:text-[#C9B07C] transition-colors duration-300 cursor-pointer outline-none"
          >
            {t('chapterEnding.contact')}
          </button>

          {/* Credits Trigger */}
          <button
            onClick={() => {
              haptics.mediumClick();
              setModalType("credits");
            }}
            className="hover:text-[#C9B07C] transition-colors duration-300 cursor-pointer outline-none"
          >
            {t('chapterEnding.credits')}
          </button>
        </div>
      </footer>

      {/* Pop-up Modals for Contact and Credits (Priscilla-quality interactive overlays) */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              haptics.lightTap();
              setModalType(null);
            }}
          >
            <motion.div
              className="bg-[#111111] border border-[#1D1D1D] rounded max-w-md w-full p-8 relative flex flex-col gap-6"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              {modalType === "contact" ? (
                <>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#C9B07C]" />
                    <h3 className="font-serif text-xl text-[#F6F6F6]">{t('chapterEnding.get_in_touch')}</h3>
                  </div>
                  <div className="h-[1px] w-full bg-[#1D1D1D]" />
                  <SplitText
                    type="lines"
                    text={t('chapterEnding.contact_desc')}
                    className="text-xs text-[#8B8B8B] leading-relaxed"
                  />
                  <a
                    href="mailto:mchuanle198@gmail.com"
                    className="flex items-center justify-between p-3 bg-[#050505] rounded border border-[#1D1D1D] text-xs text-[#C9B07C] hover:border-[#C9B07C] transition-colors duration-300"
                  >
                    <span>mchuanle198@gmail.com</span>
                    <ArrowUp className="w-3.5 h-3.5 rotate-45" />
                  </a>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-[#C9B07C]" />
                    <h3 className="font-serif text-xl text-[#F6F6F6]">{t('chapterEnding.production_credits')}</h3>
                  </div>
                  <div className="h-[1px] w-full bg-[#1D1D1D]" />
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#8B8B8B]">{t('chapterEnding.author')}</span>
                      <a href="https://github.com/huanleya" target="_blank" rel="noopener noreferrer" className="text-[#C9B07C] hover:underline font-mono">huanleya</a>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#8B8B8B]">{t('chapterEnding.creative_direction')}</span>
                      <span className="text-[#F6F6F6] font-mono">huanleya</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#8B8B8B]">{t('chapterEnding.cinematography')}</span>
                      <span className="text-[#F6F6F6] font-mono">Sony A7R V • Unsplash</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#8B8B8B]">{t('chapterEnding.interactive_engineering')}</span>
                      <span className="text-[#F6F6F6] font-mono">GSAP + Lenis + Motion</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#8B8B8B]">{t('chapterEnding.symphonic_ambience')}</span>
                      <span className="text-[#F6F6F6] font-mono">Web Audio Synthesizer</span>
                    </div>
                  </div>
                  <SplitText
                    type="lines"
                    text={t('chapterEnding.designed_in')}
                    className="text-[10px] text-[#8B8B8B] italic leading-relaxed text-center mt-2"
                  />
                </>
              )}

              <button
                onClick={() => {
                  haptics.lightTap();
                  setModalType(null);
                }}
                className="mt-2 w-full py-2.5 bg-[#050505] hover:bg-[#1D1D1D] text-xs font-mono text-[#8B8B8B] hover:text-[#F6F6F6] border border-[#1D1D1D] rounded transition-colors duration-300 cursor-pointer"
              >
                {t('chapterEnding.close_window')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
