import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import gsap from "gsap";

interface LightboxImage {
  src: string;
  alt: string;
  rect?: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

interface LightboxProps {
  image: LightboxImage | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ image, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Unified handleClose function with manual FLIP exit transition
  const handleClose = () => {
    if (!overlayRef.current) {
      onClose();
      return;
    }

    // Reset zoom and pan instantly before transition begins
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });

    const timeline = gsap.timeline({
      onComplete: () => {
        onClose();
      }
    });

    // Fade controls out quickly
    timeline.to([headerRef.current, footerRef.current], {
      opacity: 0,
      y: -15,
      duration: 0.25,
      ease: "power2.in"
    }, 0);

    // Fade backdrop out
    timeline.to(overlayRef.current, {
      opacity: 0,
      backgroundColor: "rgba(0, 0, 0, 0)",
      duration: 0.5,
      ease: "power3.inOut"
    }, 0);

    // FLIP back to the original thumbnail rect if available
    if (wrapperRef.current && image?.rect) {
      const lastRect = wrapperRef.current.getBoundingClientRect();

      const startX = image.rect.left + image.rect.width / 2;
      const startY = image.rect.top + image.rect.height / 2;
      const endX = lastRect.left + lastRect.width / 2;
      const endY = lastRect.top + lastRect.height / 2;

      const scaleX = image.rect.width / lastRect.width;
      const scaleY = image.rect.height / lastRect.height;
      const translateX = startX - endX;
      const translateY = startY - endY;

      timeline.to(wrapperRef.current, {
        x: translateX,
        y: translateY,
        scaleX: scaleX,
        scaleY: scaleY,
        borderRadius: "12px",
        duration: 0.55,
        ease: "power4.inOut"
      }, 0);
    } else if (wrapperRef.current) {
      timeline.to(wrapperRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, 0);
    }
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (image) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [image, onClose]);

  // Reset zoom and pan on image change
  useEffect(() => {
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
  }, [image]);

  // Trigger high-fidelity manual opening FLIP animation once elements are rendered
  useEffect(() => {
    if (!image || !wrapperRef.current) return;

    // Animate controls in
    gsap.fromTo(
      [headerRef.current, footerRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.15, ease: "power3.out" }
    );

    if (!image.rect) {
      // Fallback transition if thumbnail bounds are missing
      gsap.fromTo(
        wrapperRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      return;
    }

    // Capture the target final position (Last state)
    const lastRect = wrapperRef.current.getBoundingClientRect();

    // Calculate transformations to match original position (Invert state)
    const startX = image.rect.left + image.rect.width / 2;
    const startY = image.rect.top + image.rect.height / 2;
    const endX = lastRect.left + lastRect.width / 2;
    const endY = lastRect.top + lastRect.height / 2;

    const scaleX = image.rect.width / lastRect.width;
    const scaleY = image.rect.height / lastRect.height;
    const translateX = startX - endX;
    const translateY = startY - endY;

    // Position the wrapper exactly at the thumbnail bounds instantly
    gsap.set(wrapperRef.current, {
      x: translateX,
      y: translateY,
      scaleX: scaleX,
      scaleY: scaleY,
      transformOrigin: "center center",
      borderRadius: "12px",
    });

    // Animate fluidly back to its natural layout values (Play)
    gsap.to(wrapperRef.current, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      borderRadius: "8px",
      duration: 0.65,
      ease: "power4.out",
      clearProps: "transform,scaleX,scaleY", // Clear inline rules to avoid blocking manual zoom/drag
    });
  }, [image]);

  const handleDoubleTap = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setPan({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <AnimatePresence>
      {image && (
        <div
          ref={overlayRef}
          key="lightbox-overlay"
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 md:p-8 bg-black/90 backdrop-blur-xl select-none"
          onClick={handleClose}
        >
          {/* Header Controls */}
          <div 
            ref={headerRef}
            className="w-full flex items-center justify-between z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Back/Close Badge */}
            <button
              onClick={handleClose}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-[#F6F6F6] text-xs font-mono tracking-widest transition-all duration-300"
              style={{ cursor: "pointer" }}
            >
              <X size={14} />
              <span>CLOSE (ESC)</span>
            </button>

            {/* Interactive Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isZoomed) {
                    setIsZoomed(false);
                    setPan({ x: 0, y: 0 });
                  } else {
                    setIsZoomed(true);
                  }
                }}
                className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-[#F6F6F6] transition-all duration-300"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
                style={{ cursor: "pointer" }}
              >
                {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
              </button>
            </div>
          </div>

          {/* Main Image Stage */}
          <div
            className="flex-1 w-full flex items-center justify-center overflow-hidden relative cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            <div
              ref={wrapperRef}
              className="relative max-w-full max-h-[75vh] md:max-h-[80vh] rounded-lg overflow-hidden shadow-2xl border border-white/5 bg-[#090909]"
              onClick={(e) => e.stopPropagation()}
              style={{
                x: isZoomed ? pan.x : 0,
                y: isZoomed ? pan.y : 0,
                scale: isZoomed ? 1.6 : 1,
                transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              <img
                ref={imageRef}
                src={image.src}
                alt={image.alt}
                onDoubleClick={handleDoubleTap}
                className={`max-w-full max-h-[75vh] md:max-h-[80vh] object-contain select-none pointer-events-none`}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Footer Caption */}
          <div
            ref={footerRef}
            className="w-full max-w-2xl text-center z-10 px-4 mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-serif italic text-lg md:text-xl text-white tracking-wide leading-relaxed">
              {image.alt}
            </p>
            <span className="inline-block mt-3 px-3 py-1 text-[9px] font-mono tracking-widest text-[#C9B07C]/80 border border-[#C9B07C]/20 bg-[#C9B07C]/5 rounded-full uppercase">
              {isZoomed ? "Drag to Pan / Double-click to Reset" : "Double-click to Inspect Details"}
            </span>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
