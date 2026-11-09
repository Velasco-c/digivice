import { motion } from 'framer-motion';
import type { DigiviceController } from '@/presentation/hooks/useDigivice';
import { ABButtons } from '@/presentation/components/digivice/ABButtons';
import { DPad } from '@/presentation/components/digivice/DPad';
import { Speaker } from '@/presentation/components/digivice/Speaker';
import { StartSelect } from '@/presentation/components/digivice/StartSelect';
import { DigiviceScreen } from '@/presentation/components/screen/DigiviceScreen';

export function GameBoyShell({ digivice }: { digivice: DigiviceController }) {
  return (
    <div className="gameboy-float">
      <motion.div
        className="gameboy"
        initial={{ opacity: 0, y: 46, scale: 0.95, rotateX: 9 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.12 }}
      >
        <div className="gameboy__triggers">
          <button
            type="button"
            className="trigger trigger--l"
            onClick={digivice.actions.previous}
            aria-label="Gatillo L: Digimon anterior"
          >
            <span>L</span>
          </button>
          <button
            type="button"
            className="trigger trigger--r"
            onClick={digivice.actions.next}
            aria-label="Gatillo R: siguiente Digimon"
          >
            <span>R</span>
          </button>
        </div>

        <div className="gameboy__body">
          <span className="screw screw--tl" aria-hidden="true" />
          <span className="screw screw--tr" aria-hidden="true" />
          <span className="screw screw--bl" aria-hidden="true" />
          <span className="screw screw--br" aria-hidden="true" />

          <div className="gameboy__brandrow">
            <span className="gameboy__brand">
              DIGITAL <strong>MONSTER</strong>
            </span>
            <span className="gameboy__model">DM-20</span>
          </div>

          <div className="gameboy__bezel">
            <div className="gameboy__bezel-caption">
              <span>DOT MATRIX WITH STEREO SOUND</span>
              <span className="gameboy__bezel-tag">v2.0</span>
            </div>

            <div className="gameboy__screen">
              <DigiviceScreen digivice={digivice} />
            </div>

            <div className="gameboy__bezel-footer">
              <span className="power-led">
                <i /> POWER
              </span>
              <span className="gameboy__bezel-name">DIGIVICE OS</span>
              <span className="gameboy__bezel-tech">LIQUID CRYSTAL</span>
            </div>
          </div>

          <div className="gameboy__controls">
            <div className="gameboy__controls-side">
              <DPad onDirection={digivice.actions.onDirection} onConfirm={digivice.actions.confirm} />
            </div>
            <ABButtons onA={digivice.actions.confirm} onB={digivice.actions.back} />
          </div>

          <div className="gameboy__bottom">
            <StartSelect onStart={digivice.actions.openSearch} onSelect={digivice.actions.toggleCrt} />
            <Speaker />
          </div>

          <span className="gameboy__footer-line" aria-hidden="true">
            DIGI-LAB SYSTEMS · 4× AA · 20H PLAY
          </span>
        </div>
      </motion.div>
    </div>
  );
}
