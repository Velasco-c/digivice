import { AnimatePresence, motion } from 'framer-motion';
import type { DigimonSummary } from '@/core/domain/entities/digimon';
import type { SearchStatus } from '@/presentation/hooks/useDigimonSearch';
import { SEARCH_SUGGESTIONS } from '@/shared/constants/app';
import { Icon } from '@/presentation/components/ui/Icon';
import { ScreenHints } from '@/presentation/components/ui/ScreenHints';
import { StatePanel } from '@/presentation/components/ui/StatePanel';
import { cn } from '@/shared/utils/cn';
import { padId } from '@/shared/utils/format';

interface SearchScreenProps {
  query: string;
  results: DigimonSummary[];
  status: SearchStatus;
  error: string | null;
  selectedIndex: number;
  onQueryChange: (value: string) => void;
  onSelectIndex: (index: number) => void;
  onSelect: (index: number) => void;
  onRetry: () => void;
  onClear: () => void;
  onBack: () => void;
}

const STATUS_LABEL: Record<SearchStatus, string> = {
  idle: 'READY',
  loading: 'SCANNING',
  success: 'MATCHES',
  empty: 'NO MATCHES',
  error: 'SIGNAL LOST',
};

export function SearchScreen({
  query,
  results,
  status,
  error,
  selectedIndex,
  onQueryChange,
  onSelectIndex,
  onSelect,
  onRetry,
  onClear,
  onBack,
}: SearchScreenProps) {
  return (
    <div className="search">
      <div className="search__topbar">
        <span className="search__mode">
          <i /> SEARCH MODE
        </span>
        <button type="button" className="screen-button screen-button--ghost" onClick={onBack}>
          <Icon name="arrow-left" size={12} />
          <span className="screen-button__key">B</span>
          CERRAR
        </button>
      </div>

      <div className={cn('search__field', status === 'loading' && 'is-scanning')}>
        <Icon name="search" size={15} className="search__icon" />
        <input
          autoFocus
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar por ID o nombre..."
          aria-label="Buscar Digimon por ID o nombre"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="none"
        />
        {query && (
          <button type="button" className="search__clear" onClick={onClear} aria-label="Limpiar búsqueda">
            <Icon name="close" size={12} />
          </button>
        )}
      </div>

      <div className="search__statusline">
        <span className={cn('search__status', `search__status--${status}`)}>
          <i />
          {STATUS_LABEL[status]}
        </span>
        <span className="search__count">
          {status === 'success' ? `${String(results.length).padStart(2, '0')} FOUND` : 'DIGI-API v1'}
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {status === 'loading' && (
          <motion.div
            className="search__scan"
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="search__scanline"
              animate={{ x: ['-40%', '340%'] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />
            <span className="search__scan-copy">QUERYING DIGITAL WORLD...</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            className="search__state"
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StatePanel
              variant="error"
              title="SIGNAL LOST"
              message={error ?? 'No se pudo completar la búsqueda.'}
              actionLabel="REINTENTAR"
              onAction={onRetry}
              compact
            />
          </motion.div>
        )}

        {(status === 'idle' || status === 'empty') && (
          <motion.div
            className="search__suggestions"
            key="suggestions"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="search__suggestions-title">
              {status === 'empty' ? 'NO DATA FOUND. PRUEBA CON:' : 'PRUEBA CON:'}
            </p>
            <div className="search__suggestions-list">
              {SEARCH_SUGGESTIONS.map((suggestion) => (
                <button
                  type="button"
                  className="suggestion"
                  key={suggestion}
                  onClick={() => onQueryChange(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <p className="search__tip">
              <Icon name="spark" size={12} /> Acepta ID numérico o fragmento de nombre.
            </p>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.ul
            className="search__list"
            key="results"
            role="listbox"
            aria-label="Resultados de búsqueda"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {results.map((result, index) => (
              <motion.li
                key={result.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.028, 0.2) }}
              >
                <button
                  type="button"
                  className={cn('search-result', index === selectedIndex && 'is-active')}
                  onMouseEnter={() => onSelectIndex(index)}
                  onFocus={() => onSelectIndex(index)}
                  onClick={() => onSelect(index)}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <span className="search-result__index">{padId(result.id)}</span>
                  <span className="search-result__thumb">
                    {result.imageUrl && <img src={result.imageUrl} alt="" loading="lazy" />}
                  </span>
                  <span className="search-result__name">{result.name}</span>
                  <Icon name="chevron-right" size={13} className="search-result__chevron" />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <ScreenHints
        items={[
          { keys: ['↑', '↓'], label: 'MOVER' },
          { keys: ['A'], label: 'ABRIR' },
          { keys: ['B'], label: 'VOLVER' },
        ]}
      />
    </div>
  );
}
