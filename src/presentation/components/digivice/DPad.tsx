import type { Direction } from '@/presentation/hooks/useKeyboardControls';
import { Icon } from '@/presentation/components/ui/Icon';

interface DPadProps {
  onDirection: (direction: Direction) => void;
  onConfirm: () => void;
}

export function DPad({ onDirection, onConfirm }: DPadProps) {
  return (
    <div className="dpad" role="group" aria-label="Cruceta de dirección">
      <span className="dpad__cross" aria-hidden="true" />
      <button
        type="button"
        className="dpad__btn dpad__btn--up"
        onClick={() => onDirection('up')}
        aria-label="Arriba: escanear Digimon"
      >
        <Icon name="arrow-up" size={11} />
      </button>
      <button
        type="button"
        className="dpad__btn dpad__btn--left"
        onClick={() => onDirection('left')}
        aria-label="Izquierda: Digimon anterior"
      >
        <Icon name="arrow-left" size={11} />
      </button>
      <button
        type="button"
        className="dpad__btn dpad__btn--right"
        onClick={() => onDirection('right')}
        aria-label="Derecha: siguiente Digimon"
      >
        <Icon name="arrow-right" size={11} />
      </button>
      <button
        type="button"
        className="dpad__btn dpad__btn--down"
        onClick={() => onDirection('down')}
        aria-label="Abajo: abrir búsqueda"
      >
        <Icon name="arrow-down" size={11} />
      </button>
      <button
        type="button"
        className="dpad__center"
        onClick={onConfirm}
        aria-label="Centro: confirmar"
      >
        <span className="dpad__center-dot" />
      </button>
    </div>
  );
}
