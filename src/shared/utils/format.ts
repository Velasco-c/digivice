export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

export function errorMessage(error: unknown, fallback = 'SIGNAL LOST'): string {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export function padId(id: number): string {
  return String(id).padStart(3, '0');
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-CO').format(value);
}

export function formatClock(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}
