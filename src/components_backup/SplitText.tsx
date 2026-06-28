import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Ensure GSAP plugins are registered safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  text: string;
  type?: "words" | "chars" | "lines";
  delayOffset?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  type = "words",
  delayOffset = 0,
  duration = 0.95,
  stagger = 0.04,
  className,
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;

    // Create a new SplitType instance targeting words/chars/lines
    const split = new SplitType(element, {
      types: type === "chars" ? "words,chars" : type === "lines" ? "lines" : "words",
      tagName: "span",
    });

    // Elegant animations depending on type
    if (type === "chars" && split.chars) {
      // Setup initial visual states to prevent flash of unstyled content
      split.chars.forEach((char) => {
        char.style.display = "inline-block";
        char.style.transformOrigin = "bottom left";
        char.style.willChange = "transform, opacity";
      });

      // Wrap words to act as overflow hidden masks
      if (split.words) {
        split.words.forEach((word) => {
          word.style.display = "inline-block";
          word.style.overflow = "hidden";
          word.style.verticalAlign = "bottom";
        });
      }

      gsap.fromTo(
        split.chars,
        {
          yPercent: 110,
          rotate: 3,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: duration,
          delay: delayOffset,
          ease: "power4.out", // High-end responsive easing curve
          stagger: stagger,
          scrollTrigger: {
            trigger: element,
            start: "top 92%", // Trigger when element is almost in viewport
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    } else if (type === "words" && split.words) {
      // Stagger reveal whole words
      split.words.forEach((word) => {
        word.style.display = "inline-block";
        word.style.overflow = "hidden";
        word.style.verticalAlign = "bottom";
        word.style.willChange = "transform, opacity";
      });

      gsap.fromTo(
        split.words,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: duration,
          delay: delayOffset,
          ease: "power4.out",
          stagger: stagger,
          scrollTrigger: {
            trigger: element,
            start: "top 92%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    } else if (type === "lines" && split.lines) {
      // Premium smooth line-by-line reveal
      split.lines.forEach((line) => {
        line.style.display = "block";
        line.style.willChange = "transform, opacity, filter";
      });

      gsap.fromTo(
        split.lines,
        {
          y: 12,
          opacity: 0,
          filter: "blur(4px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: duration * 1.2,
          delay: delayOffset,
          ease: "power2.out",
          stagger: stagger * 1.8,
          scrollTrigger: {
            trigger: element,
            start: "top 92%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }

    // Clean up completely on unmount to prevent React DOM mismatch
    return () => {
      split.revert();
    };
  }, [text, type, delayOffset, duration, stagger]);

  return (
    <span ref={textRef} className={`inline-block select-none ${className || ""}`}>
      {text}
    </span>
  );
};
