interface StartSelectProps {
  onStart: () => void;
  onSelect: () => void;
}

export function StartSelect({ onStart, onSelect }: StartSelectProps) {
  return (
    <div className="start-select" role="group" aria-label="Botones Start y Select">
      <div className="start-select__item">
        <button
          type="button"
          className="pill-button"
          onClick={onSelect}
          aria-label="Select: alternar efecto CRT"
        />
        <span className="start-select__label">SELECT</span>
      </div>
      <div className="start-select__item">
        <button
          type="button"
          className="pill-button"
          onClick={onStart}
          aria-label="Start: abrir búsqueda"
        />
        <span className="start-select__label">START</span>
      </div>
    </div>
  );
}
