import { useCallback, useEffect, useState } from 'react';
import type { DigimonSummary } from '@/core/domain/entities/digimon';
import { digimonUseCases } from '@/app/container';
import { APP_CONFIG } from '@/shared/constants/app';
import { errorMessage, isAbortError } from '@/shared/utils/format';

export type SearchStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export interface DigimonSearchState {
  query: string;
  results: DigimonSummary[];
  status: SearchStatus;
  error: string | null;
  selectedIndex: number;
  selected: DigimonSummary | null;
  setQuery: (value: string) => void;
  setSelectedIndex: (index: number) => void;
  moveSelection: (delta: number) => void;
  retry: () => void;
  clear: () => void;
}

export function useDigimonSearch(): DigimonSearchState {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DigimonSummary[]>([]);
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    const term = query.trim();

    if (!term) {
      setResults([]);
      setStatus('idle');
      setError(null);
      setSelectedIndex(0);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setStatus('loading');
      setError(null);

      try {
        const found = await digimonUseCases.searchDigimons(term, controller.signal);
        if (controller.signal.aborted) return;

        setResults(found);
        setSelectedIndex(0);
        setStatus(found.length > 0 ? 'success' : 'empty');
      } catch (caught) {
        if (isAbortError(caught) || controller.signal.aborted) return;

        setResults([]);
        setStatus('error');
        setError(errorMessage(caught, 'No se pudo completar la búsqueda.'));
      }
    }, APP_CONFIG.searchDebounceMs);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, retryToken]);

  const moveSelection = useCallback(
    (delta: number) => {
      setSelectedIndex((current) => {
        if (results.length === 0) return 0;
        return (current + delta + results.length) % results.length;
      });
    },
    [results.length],
  );

  const retry = useCallback(() => setRetryToken((token) => token + 1), []);
  const clear = useCallback(() => setQuery(''), []);

  return {
    query,
    results,
    status,
    error,
    selectedIndex,
    selected: results[selectedIndex] ?? null,
    setQuery,
    setSelectedIndex,
    moveSelection,
    retry,
    clear,
  };
}
