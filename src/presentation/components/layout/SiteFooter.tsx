import { Icon } from '@/presentation/components/ui/Icon';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        © 2026 DIGIVICE OS · Diseñado y desarrollado por <strong>Carlos Elias Tzoy Velasco</strong>
      </p>
      <div className="site-footer__links">
        <a href="https://digi-api.com/" target="_blank" rel="noreferrer">
          DIGI-API <Icon name="external" size={11} />
        </a>
        <a
          href="https://github.com/Velasco-c/Taller-2_JavaScript"
          target="_blank"
          rel="noreferrer"
        >
          GITHUB <Icon name="external" size={11} />
        </a>
        <span>REACT · TYPESCRIPT · VITE</span>
      </div>
    </footer>
  );
}
