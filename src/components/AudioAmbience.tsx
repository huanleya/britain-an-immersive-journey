import React, { useEffect, useRef } from "react";
// We import the audio file so Vite can process it. 
// If the user replaces it with their own, they should name it bg_music.mp3
import bgMusicUrl from "../assets/audio/bg_music.mp3";

export const bgAudio = new Audio(bgMusicUrl);
bgAudio.loop = true;
bgAudio.volume = 0;

interface AudioAmbienceProps {
  enabled: boolean;
}

export const AudioAmbience: React.FC<AudioAmbienceProps> = ({ enabled }) => {
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (fadeInterval.current) {
      clearInterval(fadeInterval.current);
    }

    if (enabled) {
      // Fade in
      let vol = bgAudio.volume;
      fadeInterval.current = setInterval(() => {
        if (vol < 1.0) {
          vol += 0.05;
          bgAudio.volume = Math.min(vol, 1.0);
        } else {
          if (fadeInterval.current) clearInterval(fadeInterval.current);
        }
      }, 100);
    } else {
      // Fade out
      let vol = bgAudio.volume;
      fadeInterval.current = setInterval(() => {
        if (vol > 0) {
          vol -= 0.05;
          bgAudio.volume = Math.max(vol, 0);
        } else {
          if (fadeInterval.current) clearInterval(fadeInterval.current);
          bgAudio.pause();
        }
      }, 100);
    }

    return () => {
      if (fadeInterval.current) clearInterval(fadeInterval.current);
    };
  }, [enabled]);

  return null;
};
