import React, { useEffect, useRef } from "react";

interface AudioAmbienceProps {
  enabled: boolean;
}

export const AudioAmbience: React.FC<AudioAmbienceProps> = ({ enabled }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const noiseGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!enabled) {
      // Fade out and suspend
      if (audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainNodesRef.current.forEach((g) => {
          g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
          g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
        });
        if (noiseGainRef.current) {
          const ng = noiseGainRef.current;
          ng.gain.setValueAtTime(ng.gain.value, ctx.currentTime);
          ng.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        }
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state === "running") {
            audioCtxRef.current.suspend();
          }
        }, 1600);
      }
      return;
    }

    // Initialize Web Audio
    if (!audioCtxRef.current) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // 1. Synth a deep ambient warm drone (low roots: C2 @ 65.41Hz, G2 @ 98.00Hz, C3 @ 130.81Hz)
        const rootFrequencies = [65.41, 98.00, 130.81];
        
        rootFrequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.value = freq;

          // Subtle detune for rich choral texture
          osc.detune.value = (idx - 1) * 8;

          gain.gain.value = 0; // start silent

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          oscillatorsRef.current.push(osc);
          gainNodesRef.current.push(gain);
        });

        // 2. Synthesize a procedural soft wind breeze using white noise bandpass filtering
        const bufferSize = ctx.sampleRate * 2; // 2 seconds of buffer
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Bandpass filter to make it sound like wind whispering through the countryside
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 250; // low frequency wind rumble
        filter.Q.value = 1.2;

        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0;

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        whiteNoise.start();
        noiseGainRef.current = noiseGain;

        // LFO (Low Frequency Oscillator) to modulate the wind frequency and volume over time (for organic breathing wind)
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.08; // extremely slow cycle (12 seconds)
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 80; // swing wind filter center by 80Hz

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

      } catch (err) {
        console.warn("Web Audio API not supported", err);
      }
    }

    // Trigger fade-in
    const ctx = audioCtxRef.current;
    if (ctx) {
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Elegant, staggered long fades for premium transition feel
      const now = ctx.currentTime;
      gainNodesRef.current.forEach((gain, idx) => {
        gain.gain.setValueAtTime(0, now);
        // Stagger volume based on pitch (lower sounds are louder)
        const targetVol = idx === 0 ? 0.06 : idx === 1 ? 0.04 : 0.02;
        gain.gain.linearRampToValueAtTime(targetVol, now + 3 + idx * 1.5);
      });

      if (noiseGainRef.current) {
        noiseGainRef.current.gain.setValueAtTime(0, now);
        noiseGainRef.current.gain.linearRampToValueAtTime(0.015, now + 5); // very soft rustle
      }
    }
  }, [enabled]);

  // Clean up nodes on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((o) => {
        try { o.stop(); } catch(e) {}
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return null; // purely visual-free audio component
};
