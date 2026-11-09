import type { DigiviceController } from '@/presentation/hooks/useDigivice';
import { Icon } from '@/presentation/components/ui/Icon';

export function DeviceDock({ digivice }: { digivice: DigiviceController }) {
  return (
    <div className="device-dock" aria-label="Acciones rápidas del Digivice">
      <button type="button" className="dock-button" onClick={digivice.actions.openSearch}>
        <Icon name="search" size={15} />
        <span>BUSCAR</span>
        <kbd>START</kbd>
      </button>
      <button type="button" className="dock-button" onClick={digivice.actions.openDetail}>
        <Icon name="scan" size={15} />
        <span>FICHA</span>
        <kbd>A</kbd>
      </button>
      <button type="button" className="dock-button" onClick={digivice.actions.toggleSound}>
        <Icon name={digivice.soundEnabled ? 'volume' : 'volume-off'} size={15} />
        <span>SONIDO</span>
        <kbd>{digivice.soundEnabled ? 'ON' : 'OFF'}</kbd>
      </button>
      <button type="button" className="dock-button" onClick={digivice.actions.toggleCrt}>
        <Icon name="grid" size={15} />
        <span>CRT</span>
        <kbd>{digivice.crtEnabled ? 'ON' : 'OFF'}</kbd>
      </button>
    </div>
  );
}
