import { Icon } from '@/presentation/components/ui/Icon';
import { cn } from '@/shared/utils/cn';

interface SiteHeaderProps {
  apiStatus: 'online' | 'offline';
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function SiteHeader({ apiStatus, soundEnabled, onToggleSound }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="DIGIVICE OS, volver arriba">
        <span className="brand__mark">
          <Icon name="cpu" size={20} />
        </span>
        <span className="brand__text">
          <strong>DIGIVICE</strong>
          <span>OS // DIGITAL MONSTER SYSTEM</span>
        </span>
      </a>

      <nav className="site-nav" aria-label="Secciones">
        <a href="#device">DISPOSITIVO</a>
        <a href="#commands">COMANDOS</a>
        <a href="#system">SISTEMA</a>
      </nav>

      <div className="site-header__actions">
        <span className={cn('status-pill', `status-pill--${apiStatus}`)}>
          <i />
          {apiStatus === 'online' ? 'LINK ACTIVE' : 'SIGNAL LOST'}
        </span>

        <button
          type="button"
          className="icon-button"
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}
          aria-pressed={soundEnabled}
        >
          <Icon name={soundEnabled ? 'volume' : 'volume-off'} size={17} />
        </button>

        <a
          className="icon-button"
          href="https://github.com/Velasco-c/Taller-2_JavaScript"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir repositorio en GitHub"
        >
          <Icon name="github" size={17} />
        </a>
      </div>
    </header>
  );
}
