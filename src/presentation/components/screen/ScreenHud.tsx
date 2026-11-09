import type { ScreenMode } from '@/presentation/hooks/useDigivice';
import { formatClock, padId } from '@/shared/utils/format';

interface ScreenHudProps {
  mode: ScreenMode;
  activeId: number | null;
  clock: Date;
}

const MODE_LABELS: Record<Exclude<ScreenMode, 'boot'>, string> = {
  catalog: 'LINK',
  search: 'SEARCH',
  detail: 'SCAN',
};

export function ScreenHud({ mode, activeId, clock }: ScreenHudProps) {
  if (mode === 'boot') return null;

  return (
    <div className="screen-hud">
      <div className="screen-hud__group">
        <span className="screen-hud__pulse" />
        <span className="screen-hud__label">{MODE_LABELS[mode]}</span>
      </div>

      <span className="screen-hud__clock">{formatClock(clock)}</span>

      <div className="screen-hud__group screen-hud__group--right">
        <span className="screen-hud__id">
          {activeId ? `ID:${padId(activeId)}` : 'ID:---'}
        </span>
        <span className="signal-bars" aria-label="Señal alta">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="battery" aria-label="Batería cargada">
          <span className="battery__body">
            <span className="battery__fill" />
          </span>
          <span className="battery__tip" />
        </span>
      </div>
    </div>
  );
}
