import { motion } from 'framer-motion';
import { Icon, type IconName } from '@/presentation/components/ui/Icon';
import { cn } from '@/shared/utils/cn';

interface StatePanelProps {
  variant: 'error' | 'empty' | 'locked';
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: IconName;
  compact?: boolean;
}

export function StatePanel({
  variant,
  title,
  message,
  actionLabel,
  onAction,
  icon,
  compact = false,
}: StatePanelProps) {
  const fallbackIcon: IconName = variant === 'error' ? 'power' : 'scan';

  return (
    <motion.div
      className={cn('state-panel', `state-panel--${variant}`, compact && 'state-panel--compact')}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
    >
      <span className="state-panel__icon">
        <Icon name={icon ?? fallbackIcon} size={compact ? 22 : 30} />
      </span>
      <p className="state-panel__title">{title}</p>
      {message && <p className="state-panel__message">{message}</p>}
      {actionLabel && onAction && (
        <button type="button" className="screen-button screen-button--primary" onClick={onAction}>
          <Icon name="refresh" size={13} />
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
