import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = '01010101ABCDEF<>/\\|[]{}#*+=:;';

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];
    let animationFrame = 0;
    let lastTime = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * (height / fontSize));
    };

    const draw = (time: number) => {
      animationFrame = window.requestAnimationFrame(draw);

      if (time - lastTime < 58) return;
      lastTime = time;

      context.fillStyle = 'rgba(4, 10, 5, 0.18)';
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let index = 0; index < columns; index += 1) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = index * fontSize;
        const y = drops[index] * fontSize;

        context.fillStyle =
          Math.random() > 0.94 ? 'rgba(198, 255, 74, 0.42)' : 'rgba(89, 246, 208, 0.16)';
        context.fillText(glyph, x, y);

        if (y > height && Math.random() > 0.975) drops[index] = 0;
        drops[index] += 0.72;
      }
    };

    resize();
    window.addEventListener('resize', resize);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
