import type { SVGProps } from 'react';

export type IconName =
  | 'search'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'close'
  | 'volume'
  | 'volume-off'
  | 'github'
  | 'refresh'
  | 'scan'
  | 'power'
  | 'chevron-right'
  | 'external'
  | 'play'
  | 'cpu'
  | 'spark'
  | 'grid';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 18, ...rest }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
    ...rest,
  };

  switch (name) {
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M16.5 16.5 21 21" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg {...common}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...common}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );
    case 'arrow-up':
      return (
        <svg {...common}>
          <path d="m6 15 6-6 6 6" />
        </svg>
      );
    case 'arrow-down':
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case 'volume':
      return (
        <svg {...common}>
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          <path d="M17 8.5a5 5 0 0 1 0 7" />
          <path d="M19.5 6a8.5 8.5 0 0 1 0 12" />
        </svg>
      );
    case 'volume-off':
      return (
        <svg {...common}>
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          <path d="m17 9 4 6M21 9l-4 6" />
        </svg>
      );
    case 'github':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
        </svg>
      );
    case 'refresh':
      return (
        <svg {...common}>
          <path d="M21 12a9 9 0 1 1-2.64-6.36" />
          <path d="M21 3v6h-6" />
        </svg>
      );
    case 'scan':
      return (
        <svg {...common}>
          <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
          <path d="M8 12h8" />
        </svg>
      );
    case 'power':
      return (
        <svg {...common}>
          <path d="M12 3v9" />
          <path d="M6.6 6.6a7.5 7.5 0 1 0 10.8 0" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg {...common}>
          <path d="m9 5 7 7-7 7" />
        </svg>
      );
    case 'external':
      return (
        <svg {...common}>
          <path d="M14 3h7v7M21 3l-9 9" />
          <path d="M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
        </svg>
      );
    case 'play':
      return (
        <svg {...common}>
          <path d="m8 5 11 7-11 7V5Z" />
        </svg>
      );
    case 'cpu':
      return (
        <svg {...common}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...common}>
          <path d="m12 2 1.9 5.7L20 9.5l-5.4 2.2L12 18l-2.6-6.3L4 9.5l6.1-1.8L12 2Z" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    default:
      return null;
  }
}
