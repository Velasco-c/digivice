import { useEffect, useRef } from 'react';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface KeyboardHandlers {
  onNext: () => void;
  onPrevious: () => void;
  onConfirm: () => void;
  onBack: () => void;
  onOpenSearch: () => void;
  onOpenDetail: () => void;
  onDirection: (direction: Direction) => void;
  onToggleSound: () => void;
  onToggleCrt: () => void;
  /** Return true when the key was consumed (used to skip the boot screen). */
  onAnyKey?: () => boolean;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT' ||
    target.isContentEditable
  );
}

export function useKeyboardControls(handlers: KeyboardHandlers): void {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const current = handlersRef.current;

      if (current.onAnyKey?.()) {
        event.preventDefault();
        return;
      }

      const inEditable = isEditableTarget(event.target);

      if (inEditable) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            current.onDirection('down');
            return;
          case 'ArrowUp':
            event.preventDefault();
            current.onDirection('up');
            return;
          case 'Enter':
            event.preventDefault();
            current.onConfirm();
            return;
          case 'Escape':
            event.preventDefault();
            current.onBack();
            return;
          default:
            return;
        }
      }

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          current.onNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          current.onPrevious();
          break;
        case 'ArrowUp':
          event.preventDefault();
          current.onOpenDetail();
          break;
        case 'ArrowDown':
          event.preventDefault();
          current.onOpenSearch();
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          current.onConfirm();
          break;
        case 'Escape':
        case 'Backspace':
          event.preventDefault();
          current.onBack();
          break;
        case 's':
        case 'S':
          event.preventDefault();
          current.onToggleSound();
          break;
        case 'm':
        case 'M':
          event.preventDefault();
          current.onToggleCrt();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
