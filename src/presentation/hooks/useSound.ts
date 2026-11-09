import { useCallback, useRef, useState } from 'react';

export type SoundName = 'move' | 'confirm' | 'back' | 'error' | 'scan' | 'boot' | 'toggle';

const SOUND_PRESETS: Record<
  SoundName,
  { frequency: number; duration: number; type: OscillatorType; endFrequency?: number; gain: number }
> = {
  move: { frequency: 520, duration: 0.045, type: 'square', gain: 0.025 },
  confirm: { frequency: 680, duration: 0.09, type: 'square', endFrequency: 980, gain: 0.03 },
  back: { frequency: 420, duration: 0.08, type: 'square', endFrequency: 260, gain: 0.025 },
  error: { frequency: 180, duration: 0.16, type: 'sawtooth', endFrequency: 120, gain: 0.03 },
  scan: { frequency: 300, duration: 0.18, type: 'triangle', endFrequency: 1200, gain: 0.025 },
  boot: { frequency: 220, duration: 0.5, type: 'triangle', endFrequency: 880, gain: 0.025 },
  toggle: { frequency: 880, duration: 0.06, type: 'square', endFrequency: 1180, gain: 0.02 },
};

export interface SoundState {
  enabled: boolean;
  play: (name: SoundName) => void;
  toggle: () => void;
}

export function useSound(): SoundState {
  const [enabled, setEnabled] = useState(true);
  const contextRef = useRef<AudioContext | null>(null);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled || typeof window === 'undefined' || !window.AudioContext) return;

      const preset = SOUND_PRESETS[name];

      try {
        const context = contextRef.current ?? new window.AudioContext();
        contextRef.current = context;

        if (context.state === 'suspended') void context.resume();

        const now = context.currentTime;
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = preset.type;
        oscillator.frequency.setValueAtTime(preset.frequency, now);
        if (preset.endFrequency) {
          oscillator.frequency.exponentialRampToValueAtTime(preset.endFrequency, now + preset.duration);
        }

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(preset.gain, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + preset.duration);

        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(now);
        oscillator.stop(now + preset.duration + 0.02);
      } catch {
        // Audio is a progressive enhancement; never block the UI because of it.
      }
    },
    [enabled],
  );

  const toggle = useCallback(() => {
    setEnabled((current) => !current);
  }, []);

  return { enabled, play, toggle };
}
