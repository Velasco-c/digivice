import { MatrixRain } from '@/presentation/components/background/MatrixRain';

export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <MatrixRain />
      <div className="ambient__grid" />
      <div className="ambient__orb ambient__orb--a" />
      <div className="ambient__orb ambient__orb--b" />
      <div className="ambient__orb ambient__orb--c" />
      <div className="ambient__beam" />
      <div className="ambient__noise" />
      <div className="ambient__vignette" />
    </div>
  );
}
