import { Icon } from '@/presentation/components/ui/Icon';
import { cn } from '@/shared/utils/cn';

const KEYMAP = [
  { keys: ['←', '→'], label: 'Navegar catálogo' },
  { keys: ['↑'], label: 'Escanear ficha' },
  { keys: ['↓'], label: 'Abrir buscador' },
  { keys: ['A', 'Enter'], label: 'Confirmar' },
  { keys: ['B', 'Esc'], label: 'Volver' },
  { keys: ['S'], label: 'Sonido on/off' },
  { keys: ['M'], label: 'Efecto CRT' },
];

interface CommandPanelProps {
  soundEnabled: boolean;
  crtEnabled: boolean;
  onToggleSound: () => void;
  onToggleCrt: () => void;
}

export function CommandPanel({
  soundEnabled,
  crtEnabled,
  onToggleSound,
  onToggleCrt,
}: CommandPanelProps) {
  return (
    <aside className="command-panel">
      <section className="panel-card" id="commands">
        <h2 className="panel-card__title">
          <Icon name="grid" size={14} />
          CONTROLS
        </h2>
        <ul className="keymap">
          {KEYMAP.map((item) => (
            <li className="keymap__row" key={item.label}>
              <span className="keymap__keys">
                {item.keys.map((key) => (
                  <kbd className="keycap" key={key}>
                    {key}
                  </kbd>
                ))}
              </span>
              <span className="keymap__label">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel-card panel-card--system" id="system">
        <h2 className="panel-card__title">
          <Icon name="cpu" size={14} />
          SYSTEM
        </h2>

        <div className="system-row">
          <span>SONIDO</span>
          <button
            type="button"
            className={cn('toggle', soundEnabled && 'is-on')}
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
          >
            <i />
            {soundEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="system-row">
          <span>CRT FX</span>
          <button
            type="button"
            className={cn('toggle', crtEnabled && 'is-on')}
            onClick={onToggleCrt}
            aria-pressed={crtEnabled}
          >
            <i />
            {crtEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="system-row">
          <span>API</span>
          <span className="system-value">
            <i className="system-value__dot" />
            DIGI-API v1
          </span>
        </div>
      </section>

      <section className="panel-card panel-card--layers">
        <h2 className="panel-card__title">
          <Icon name="scan" size={14} />
          CLEAN ARCHITECTURE
        </h2>
        <ul className="layer-list">
          <li>
            <span>01</span> DOMAIN
          </li>
          <li>
            <span>02</span> APPLICATION
          </li>
          <li>
            <span>03</span> INFRASTRUCTURE
          </li>
          <li>
            <span>04</span> PRESENTATION
          </li>
        </ul>
      </section>

      <a
        className="panel-link"
        href="https://digi-api.com/api/v1/digimon"
        target="_blank"
        rel="noreferrer"
      >
        DIGI-API DOCS
        <Icon name="external" size={13} />
      </a>
    </aside>
  );
}
