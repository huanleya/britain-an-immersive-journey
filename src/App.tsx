import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import Lenis from "lenis";
import gsap from "gsap";

import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { AudioAmbience } from "./components/AudioAmbience";
import { ThreeBackground } from "./components/ThreeBackground";
import { CustomCursor } from "./components/CustomCursor";
import { CinematicOverlay } from "./components/CinematicOverlay";
import { haptics } from "./utils/haptics";
import { Lightbox } from "./components/Lightbox";

// Import all chapter modules
import { ChapterHero } from "./components/ChapterHero";
import { ChapterAwakening } from "./components/ChapterAwakening";
import { ChapterVictorian } from "./components/ChapterVictorian";
import { ChapterIcons } from "./components/ChapterIcons";
import { ChapterCountryside } from "./components/ChapterCountryside";
import { ChapterScotland } from "./components/ChapterScotland";
import { ChapterNightfall } from "./components/ChapterNightfall";
import { ChapterEnding } from "./components/ChapterEnding";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; rect?: { left: number; top: number; width: number; height: number } } | null>(null);
  
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ src: string; alt: string; rect?: { left: number; top: number; width: number; height: number } }>;
      setLightboxImage(customEvent.detail);
    };
    window.addEventListener("open-lightbox", handleOpen);
    return () => window.removeEventListener("open-lightbox", handleOpen);
  }, []);

  useEffect(() => {
    const isLight = theme === "light";
    
    // Target custom property configurations for cinematic cross-fade interpolation
    const targets = isLight ? {
      "--bg-primary": "#faf9f6",
      "--bg-scotland": "#faf9f6",
      "--bg-nightfall": "#faf9f6",
      "--bg-secondary": "#f5f3ed",
      "--border-primary": "#e5e3db",
      "--text-primary": "#1a1917",
      "--text-secondary": "#6a6862",
      "--text-accent": "#a48245",
    } : {
      "--bg-primary": "#050505",
      "--bg-scotland": "#020202",
      "--bg-nightfall": "#030303",
      "--bg-secondary": "#111111",
      "--border-primary": "#1D1D1D",
      "--text-primary": "#F6F6F6",
      "--text-secondary": "#8B8B8B",
      "--text-accent": "#C9B07C",
    };

    // Smoothly transition variables over 1.2s to build a flawless cinematic cross-fade
    gsap.to(document.documentElement, {
      ...targets,
      duration: 1.2,
      ease: "power2.out",
      onStart: () => {
        if (isLight) {
          document.documentElement.classList.add("light-mode");
        }
      },
      onComplete: () => {
        if (!isLight) {
          document.documentElement.classList.remove("light-mode");
        }
      }
    });
  }, [theme]);

  // Track page scroll progress elegantly with passive listener and ResizeObserver
  useEffect(() => {
    if (loading) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max((window.scrollY / totalHeight) * 100, 0), 100);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [loading]);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-style organic smooth easing
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Setup reading pace (pause on scroll) detector
    let cleanupObserver: (() => void) | undefined;

    const timer = setTimeout(() => {
      const slowScrollObserver = new IntersectionObserver(
        (entries) => {
          const isIntersectingAny = entries.some((entry) => entry.isIntersecting);
          const anyLenis = lenis as any;
          if (anyLenis && anyLenis.options) {
            if (isIntersectingAny) {
              // Slow down scroll speed to 45% of normal for comfortable reading of the storytelling copy
              anyLenis.options.wheelMultiplier = 0.45;
              anyLenis.options.touchMultiplier = 0.65;
            } else {
              // Restore normal responsive scrolling speeds
              anyLenis.options.wheelMultiplier = 1.0;
              anyLenis.options.touchMultiplier = 1.5;
            }
          }
        },
        {
          root: null,
          rootMargin: "-25% 0px -25% 0px", // triggers when text is in the main reading viewport
          threshold: 0.05,
        }
      );

      const slowSections = document.querySelectorAll("[data-slow-scroll='true']");
      slowSections.forEach((el) => slowScrollObserver.observe(el));

      cleanupObserver = () => {
        slowScrollObserver.disconnect();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupObserver) {
        cleanupObserver();
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [loading]);

  // Set up high-performance IntersectionObserver to monitor active chapters as we scroll
  useEffect(() => {
    if (loading) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1.0],
    };

    const observerCallback = () => {
      const chapterIds = [
        "chapter-01",
        "chapter-02",
        "chapter-03",
        "chapter-04",
        "chapter-05",
        "chapter-06",
        "chapter-07",
        "chapter-ending",
      ];

      let bestId = "";
      let maxVisibleHeight = -1;

      chapterIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = Math.max(0, rect.top);
          const bottom = Math.min(window.innerHeight, rect.bottom);
          const visibleHeight = bottom - top;

          if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
            maxVisibleHeight = visibleHeight;
            bestId = id;
          }
        }
      });

      if (bestId) {
        let chapterIndex = 1;
        if (bestId === "chapter-01") chapterIndex = 1;
        else if (bestId === "chapter-02") chapterIndex = 2;
        else if (bestId === "chapter-03") chapterIndex = 3;
        else if (bestId === "chapter-04") chapterIndex = 4;
        else if (bestId === "chapter-05") chapterIndex = 5;
        else if (bestId === "chapter-06") chapterIndex = 6;
        else if (bestId === "chapter-07" || bestId === "chapter-ending") chapterIndex = 7;

        setCurrentChapter((prev) => {
          if (prev !== chapterIndex) {
            return chapterIndex;
          }
          return prev;
        });
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const chapterIds = [
      "chapter-01",
      "chapter-02",
      "chapter-03",
      "chapter-04",
      "chapter-05",
      "chapter-06",
      "chapter-07",
      "chapter-ending",
    ];

    chapterIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  // Subtle haptic response when active chapter changes via scrolling
  useEffect(() => {
    if (loading) return;
    // Don't trigger on initial load of the first chapter
    if (currentChapter > 1) {
      haptics.chapterTransition();
    }
  }, [currentChapter, loading]);

  // Scroll smoothly to chosen Chapter when navigation is triggered
  const handleChapterClick = (index: number) => {
    haptics.lightTap();
    const targetId = index === 1 ? "chapter-01" : `chapter-0${index}`;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetElement, { duration: 1.5 });
      } else {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Restart the documentary scroll from the very top
  const handleRestart = () => {
    haptics.immersionWave();
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleToggleAudio = () => {
    haptics.mediumClick();
    setAudioEnabled((prev) => !prev);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-[#F6F6F6] font-sans antialiased overflow-x-hidden selection:bg-[#C9B07C] selection:text-[#050505]">
      
      {/* Premium custom fluid cursor */}
      <CustomCursor />

      {/* Persistent fine film-grain and cinematic chapter transitions */}
      <CinematicOverlay currentChapter={currentChapter} />

      {/* Cinematic Web Audio procedural ambient sounds */}
      <AudioAmbience enabled={audioEnabled} />

      {/* Intro counter loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Thin, elegant horizontal scroll progress bar at the very top of the viewport */}
          <div
            id="scroll-progress-bar"
            className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9B07C]/45 via-[#C9B07C] to-[#E5D5B8] z-[999] origin-left transition-transform duration-100 ease-out shadow-[0_0_8px_rgba(201,176,124,0.6)]"
            style={{ transform: `scaleX(${scrollProgress / 100})` }}
          />

          {/* Transparent minimal Apple-style navigation header */}
          <Navbar
            currentChapter={currentChapter}
            totalChapters={7}
            onChapterClick={handleChapterClick}
            audioEnabled={audioEnabled}
            onToggleAudio={handleToggleAudio}
            theme={theme}
            onToggleTheme={() => {
              haptics.mediumClick();
              setTheme((prev) => (prev === "dark" ? "light" : "dark"));
            }}
          />

          {/* Core Interactive 3D Dust/Fog field running on WebGL */}
          <ThreeBackground />

          {/* Primary Storytelling Vertical Viewport Track */}
          <main className="relative z-10 w-full flex flex-col">
            <ChapterHero onExplore={() => handleChapterClick(2)} />
            <ChapterAwakening />
            <ChapterVictorian />
            <ChapterIcons />
            <ChapterCountryside />
            <ChapterScotland />
            <ChapterNightfall />
            <ChapterEnding onRestart={handleRestart} />
          </main>

          {/* Interactive Lightbox Overlay */}
          <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
        </>
      )}
    </div>
  );
}
