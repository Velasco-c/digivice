import { useCallback, useEffect, useRef, useState } from 'react';
import type { DigimonSummary } from '@/core/domain/entities/digimon';
import { digimonUseCases } from '@/app/container';
import { APP_CONFIG } from '@/shared/constants/app';
import { errorMessage, isAbortError } from '@/shared/utils/format';

export interface DigimonCatalogState {
  items: DigimonSummary[];
  active: DigimonSummary | null;
  activeIndex: number;
  totalElements: number;
  hasNext: boolean;
  initialLoading: boolean;
  loadingMore: boolean;
  error: string | null;
  goTo: (index: number) => void;
  next: () => void;
  previous: () => void;
  loadMore: () => void;
  retry: () => void;
}

export function useDigimonCatalog(): DigimonCatalogState {
  const [items, setItems] = useState<DigimonSummary[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageRef = useRef(-1);
  const loadingRef = useRef(false);
  const hasNextRef = useRef(true);
  const activeControllerRef = useRef<AbortController | null>(null);

  const load = useCallback(async (page: number, append: boolean) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    activeControllerRef.current?.abort();
    const controller = new AbortController();
    activeControllerRef.current = controller;

    if (append) setLoadingMore(true);
    else setInitialLoading(true);

    try {
      const result = await digimonUseCases.getCatalogPage(
        { page, pageSize: APP_CONFIG.catalogPageSize },
        controller.signal,
      );

      if (controller.signal.aborted) return;

      pageRef.current = result.page;
      setTotalElements(result.totalElements);
      setHasNext(result.hasNext);
      hasNextRef.current = result.hasNext;

      setItems((previous) => {
        if (!append) return result.items;

        const seen = new Set(previous.map((digimon) => digimon.id));
        return [...previous, ...result.items.filter((digimon) => !seen.has(digimon.id))];
      });
      setError(null);
    } catch (caught) {
      if (isAbortError(caught) || controller.signal.aborted) return;

      setError(errorMessage(caught, 'No se pudo conectar con la Digi API.'));
      if (!append) setItems([]);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    void load(0, false);
  }, [load]);

  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasNextRef.current) return;
    void load(pageRef.current + 1, true);
  }, [load]);

  const retry = useCallback(() => {
    loadingRef.current = false;
    pageRef.current = -1;
    hasNextRef.current = true;
    setError(null);
    setHasNext(true);
    setItems([]);
    setActiveIndex(0);
    void load(0, false);
  }, [load]);

  const goTo = useCallback(
    (index: number) => {
      if (items.length === 0) {
        setActiveIndex(0);
        return;
      }

      setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
    },
    [items.length],
  );

  const next = useCallback(() => {
    setActiveIndex((current) => {
      if (items.length === 0) return 0;

      if (current < items.length - 1) return current + 1;

      if (hasNextRef.current) {
        void loadMore();
        return current;
      }

      return 0;
    });
  }, [items.length, loadMore]);

  const previous = useCallback(() => {
    setActiveIndex((current) => {
      if (items.length === 0) return 0;
      return current > 0 ? current - 1 : items.length - 1;
    });
  }, [items.length]);

  useEffect(() => {
    if (items.length > 0 && activeIndex > items.length - 1) {
      setActiveIndex(items.length - 1);
    }
  }, [items.length, activeIndex]);

  return {
    items,
    active: items[activeIndex] ?? null,
    activeIndex,
    totalElements,
    hasNext,
    initialLoading,
    loadingMore,
    error,
    goTo,
    next,
    previous,
    loadMore,
    retry,
  };
}
