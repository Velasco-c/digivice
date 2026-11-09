import { cn } from '@/shared/utils/cn';

export interface ScreenHint {
  keys: string[];
  label: string;
}

export function ScreenHints({ items, className }: { items: ScreenHint[]; className?: string }) {
  return (
    <div className={cn('screen-hints', className)} aria-hidden="true">
      {items.map((item) => (
        <span className="screen-hints__item" key={`${item.keys.join('-')}-${item.label}`}>
          {item.keys.map((key) => (
            <kbd className="screen-hints__key" key={key}>
              {key}
            </kbd>
          ))}
          <span>{item.label}</span>
        </span>
      ))}
    </div>
  );
}
