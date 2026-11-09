import { cn } from '@/shared/utils/cn';

interface DataChipProps {
  label: string;
  value?: string | null;
  loading?: boolean;
  tone?: 'default' | 'accent' | 'warn';
  className?: string;
}

export function DataChip({ label, value, loading = false, tone = 'default', className }: DataChipProps) {
  return (
    <span className={cn('data-chip', `data-chip--${tone}`, className)}>
      <span className="data-chip__label">{label}</span>
      {loading ? (
        <span className="data-chip__skeleton" aria-label="Cargando dato" />
      ) : (
        <span className="data-chip__value">{value || '—'}</span>
      )}
    </span>
  );
}
