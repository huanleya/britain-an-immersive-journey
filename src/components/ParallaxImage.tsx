import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Safety timeout of 1200ms to guarantee images load even if IntersectionObserver fails or gets stuck in iframe scroll bounds
    const safetyTimeout = setTimeout(() => {
      setIsInView(true);
    }, 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          clearTimeout(safetyTimeout);
          observer.disconnect();
        }
      },
      {
        rootMargin: "600px", // 600px on all sides (important for both vertical and horizontal viewports)
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(safetyTimeout);
      observer.disconnect();
    };
  }, []);

  // Handle cached images and fail-safe timeout once inside viewport
  useEffect(() => {
    if (!isInView) return;

    // 1. If image is already cached/completed by browser, mark loaded immediately
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
      return;
    }

    // 2. Fail-safe of 3.5 seconds to force fade-in even on very slow connections
    const failSafeTimeout = setTimeout(() => {
      setIsLoaded(true);
    }, 3500);

    return () => {
      clearTimeout(failSafeTimeout);
    };
  }, [isInView]);

  const handleOpenLightbox = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isLoaded || !isInView) return;
    const rect = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent("open-lightbox", {
        detail: { 
          src, 
          alt,
          rect: {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height
          }
        },
      })
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleOpenLightbox}
      className={`relative w-full h-full overflow-hidden select-none pointer-events-auto cursor-none bg-[#090909] active:scale-[0.98] transition-transform duration-300 ${className}`}
      data-cursor="zoom"
    >
      {/* Shimmer/Pulse Placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d] bg-[length:200%_100%] animate-pulse z-0" style={{ animationDuration: "2.5s" }} />
      )}

      {/* Outer scale / continuous organic breathing animator */}
      <motion.div
        className="w-full h-full origin-center"
        animate={{
          scale: isHovered ? 1.08 : [1.02, 1.05, 1.02],
        }}
        transition={{
          scale: isHovered 
            ? { duration: 0.8, ease: "easeOut" } 
            : { repeat: Infinity, duration: 12, ease: "easeInOut" }
        }}
      >
        {isInView && (
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)} // Force reveal on error so it doesn't stay black
            className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-[1200ms] ease-out ${
              isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-[1.03]"
            }`}
            referrerPolicy="no-referrer"
          />
        )}
      </motion.div>

      {/* Gentle overlay to enrich visual contrast slightly on hover */}
      <motion.div
        className="absolute inset-0 bg-white/[0.03] pointer-events-none z-10 opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      />
    </div>
  );
};
