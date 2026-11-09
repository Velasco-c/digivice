import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlitchText } from '@/presentation/components/ui/GlitchText';
import { Icon } from '@/presentation/components/ui/Icon';

const STAGES = [
  'BOOTING DIGI-CORE',
  'LINKING DIGITAL WORLD',
  'SYNCING ENTITY DATABASE',
  'ALMOST READY',
];

interface BootScreenProps {
  onSkip: () => void;
}

export function BootScreen({ onSkip }: BootScreenProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStage((current) => Math.min(current + 1, STAGES.length - 1));
    }, 640);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="boot"
      onClick={onSkip}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onSkip();
      }}
      role="button"
      tabIndex={0}
      aria-label="Saltar secuencia de arranque"
    >
      <div className="boot__grid" aria-hidden="true" />
      <div className="boot__reticle" aria-hidden="true">
        <motion.span
          className="boot__reticle-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />
        <span className="boot__reticle-core">
          <Icon name="cpu" size={22} />
        </span>
      </div>

      <div className="boot__brand">
        <span className="boot__eyebrow">DIGITAL MONSTER SYSTEM</span>
        <GlitchText text="DIGIVICE" className="boot__logo" />
        <span className="boot__os">OS // v2.0</span>
      </div>

      <div className="boot__progress">
        <div className="boot__track">
          <motion.span
            className="boot__fill"
            initial={{ width: '3%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="boot__status">
          <span>{STAGES[stage]}</span>
          <span className="boot__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>

      <p className="boot__hint">PRESS ANY KEY / TAP TO SKIP</p>
    </div>
  );
}
