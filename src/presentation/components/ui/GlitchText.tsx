import { cn } from '@/shared/utils/cn';

export function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn('glitch-text', className)} data-text={text}>
      {text}
    </span>
  );
}
