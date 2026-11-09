interface ABButtonsProps {
  onA: () => void;
  onB: () => void;
}

export function ABButtons({ onA, onB }: ABButtonsProps) {
  return (
    <div className="ab-buttons" role="group" aria-label="Botones de acción">
      <div className="ab-buttons__item">
        <button
          type="button"
          className="round-button round-button--b"
          onClick={onB}
          aria-label="Botón B: volver"
        >
          B
        </button>
        <span className="ab-buttons__label">BACK</span>
      </div>
      <div className="ab-buttons__item">
        <button
          type="button"
          className="round-button round-button--a"
          onClick={onA}
          aria-label="Botón A: confirmar"
        >
          A
        </button>
        <span className="ab-buttons__label">OK</span>
      </div>
    </div>
  );
}
