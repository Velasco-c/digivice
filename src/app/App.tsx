import { MotionConfig } from 'framer-motion';
import { AmbientBackground } from '@/presentation/components/background/AmbientBackground';
import { GameBoyShell } from '@/presentation/components/digivice/GameBoyShell';
import { CommandPanel } from '@/presentation/components/layout/CommandPanel';
import { DeviceDock } from '@/presentation/components/layout/DeviceDock';
import { HeroPanel } from '@/presentation/components/layout/HeroPanel';
import { SiteFooter } from '@/presentation/components/layout/SiteFooter';
import { SiteHeader } from '@/presentation/components/layout/SiteHeader';
import { useDigivice } from '@/presentation/hooks/useDigivice';

export function App() {
  const digivice = useDigivice();
  const apiStatus =
    digivice.catalog.error && digivice.catalog.items.length === 0 ? 'offline' : 'online';

  return (
    <MotionConfig reducedMotion="user">
      <div className="app" id="top">
        <a className="skip-link" href="#device">
          Saltar al Digivice
        </a>

        <AmbientBackground />

        <SiteHeader
          apiStatus={apiStatus}
          soundEnabled={digivice.soundEnabled}
          onToggleSound={digivice.actions.toggleSound}
        />

        <main className="stage">
          <HeroPanel totalElements={digivice.catalog.totalElements} />

          <section className="device-column" id="device" aria-label="Digivice interactivo">
            <div className="device-column__aura" aria-hidden="true" />
            <GameBoyShell digivice={digivice} />
            <DeviceDock digivice={digivice} />
          </section>

          <CommandPanel
            soundEnabled={digivice.soundEnabled}
            crtEnabled={digivice.crtEnabled}
            onToggleSound={digivice.actions.toggleSound}
            onToggleCrt={digivice.actions.toggleCrt}
          />
        </main>

        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
