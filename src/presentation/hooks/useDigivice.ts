import { useCallback, useEffect, useState } from 'react';
import type { DigimonSummary } from '@/core/domain/entities/digimon';
import { APP_CONFIG } from '@/shared/constants/app';
import { useClock } from '@/presentation/hooks/useClock';
import { useDigimonCatalog, type DigimonCatalogState } from '@/presentation/hooks/useDigimonCatalog';
import { useDigimonDetail, type DigimonDetailState } from '@/presentation/hooks/useDigimonDetail';
import { useDigimonSearch, type DigimonSearchState } from '@/presentation/hooks/useDigimonSearch';
import {
  useKeyboardControls,
  type Direction,
} from '@/presentation/hooks/useKeyboardControls';
import { useSound } from '@/presentation/hooks/useSound';

export type ScreenMode = 'boot' | 'catalog' | 'search' | 'detail';
export type DetailOrigin = 'catalog' | 'search';

export interface DigiviceActions {
  finishBoot: () => void;
  next: () => void;
  previous: () => void;
  confirm: () => void;
  back: () => void;
  openSearch: () => void;
  openDetail: () => void;
  openDigimon: (summary: DigimonSummary) => void;
  scanEvolution: (summary: DigimonSummary) => void;
  selectSearchResult: (index?: number) => void;
  onDirection: (direction: Direction) => void;
  toggleSound: () => void;
  toggleCrt: () => void;
}

export interface DigiviceController {
  mode: ScreenMode;
  direction: 1 | -1;
  crtEnabled: boolean;
  soundEnabled: boolean;
  clock: Date;
  catalog: DigimonCatalogState;
  search: DigimonSearchState;
  detail: DigimonDetailState;
  detailOrigin: DetailOrigin;
  actions: DigiviceActions;
}

export function useDigivice(): DigiviceController {
  const [mode, setMode] = useState<ScreenMode>('boot');
  const [direction, setDirection] = useState<1 | -1>(1);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [detailSubject, setDetailSubject] = useState<DigimonSummary | null>(null);
  const [detailOrigin, setDetailOrigin] = useState<DetailOrigin>('catalog');

  const catalog = useDigimonCatalog();
  const search = useDigimonSearch();
  const sound = useSound();
  const clock = useClock();

  const detailSubjectForQuery = mode === 'detail' ? detailSubject : catalog.active;
  const detail = useDigimonDetail(detailSubjectForQuery);

  const finishBoot = useCallback(() => {
    setMode((current) => (current === 'boot' ? 'catalog' : current));
  }, []);

  useEffect(() => {
    if (mode !== 'boot') return;

    const timer = window.setTimeout(() => {
      setMode((current) => (current === 'boot' ? 'catalog' : current));
    }, APP_CONFIG.bootDurationMs);

    return () => window.clearTimeout(timer);
  }, [mode]);

  useEffect(() => {
    if (mode !== 'catalog' && mode !== 'detail') return;
    if (catalog.activeIndex >= catalog.items.length - 3 && catalog.hasNext) {
      catalog.loadMore();
    }
  }, [
    mode,
    catalog.activeIndex,
    catalog.items.length,
    catalog.hasNext,
    catalog.loadMore,
  ]);

  const openDigimon = useCallback(
    (summary: DigimonSummary) => {
      setDetailSubject(summary);
      setDetailOrigin(mode === 'search' ? 'search' : 'catalog');
      setMode('detail');
      sound.play('scan');
    },
    [mode, sound],
  );

  const scanEvolution = useCallback(
    (summary: DigimonSummary) => {
      setDetailSubject(summary);
      setMode('detail');
      sound.play('scan');
    },
    [sound],
  );

  const toggleCrt = useCallback(() => {
    setCrtEnabled((current) => !current);
    sound.play('toggle');
  }, [sound]);

  const next = useCallback(() => {
    if (mode === 'boot') {
      finishBoot();
      return;
    }

    if (mode === 'search') {
      search.moveSelection(1);
      sound.play('move');
      return;
    }

    if (mode === 'catalog') {
      setDirection(1);
      catalog.next();
      sound.play('move');
      return;
    }

    sound.play('move');
  }, [mode, finishBoot, search, sound, catalog]);

  const previous = useCallback(() => {
    if (mode === 'boot') {
      finishBoot();
      return;
    }

    if (mode === 'search') {
      search.moveSelection(-1);
      sound.play('move');
      return;
    }

    if (mode === 'catalog') {
      setDirection(-1);
      catalog.previous();
      sound.play('move');
      return;
    }

    if (mode === 'detail') {
      setMode(detailOrigin === 'search' ? 'search' : 'catalog');
      sound.play('back');
    }
  }, [mode, finishBoot, search, sound, catalog, detailOrigin]);

  const confirm = useCallback(() => {
    if (mode === 'boot') {
      finishBoot();
      sound.play('confirm');
      return;
    }

    if (mode === 'search') {
      if (search.selected) {
        openDigimon(search.selected);
      } else {
        sound.play('error');
      }
      return;
    }

    if (mode === 'detail') {
      sound.play('scan');
      return;
    }

    if (catalog.active) {
      setDirection(1);
      openDigimon(catalog.active);
      return;
    }

    sound.play('error');
  }, [mode, finishBoot, sound, search, openDigimon, catalog.active]);

  const back = useCallback(() => {
    if (mode === 'boot') {
      finishBoot();
      return;
    }

    if (mode === 'search') {
      setMode('catalog');
      sound.play('back');
      return;
    }

    if (mode === 'detail') {
      setMode(detailOrigin === 'search' ? 'search' : 'catalog');
      sound.play('back');
      return;
    }

    sound.play('back');
  }, [mode, finishBoot, sound, detailOrigin]);

  const openSearch = useCallback(() => {
    if (mode === 'boot') {
      finishBoot();
      return;
    }

    setMode('search');
    sound.play('confirm');
  }, [mode, finishBoot, sound]);

  const openDetail = useCallback(() => {
    if (mode === 'boot') {
      finishBoot();
      return;
    }

    if (mode === 'search') {
      if (search.selected) openDigimon(search.selected);
      else sound.play('error');
      return;
    }

    if (mode === 'detail') {
      sound.play('scan');
      return;
    }

    if (catalog.active) openDigimon(catalog.active);
  }, [mode, finishBoot, search, openDigimon, sound, catalog.active]);

  const onDirection = useCallback(
    (dir: Direction) => {
      if (mode === 'boot') {
        finishBoot();
        return;
      }

      if (dir === 'left') {
        previous();
        return;
      }

      if (dir === 'right') {
        next();
        return;
      }

      if (mode === 'search') {
        search.moveSelection(dir === 'up' ? -1 : 1);
        sound.play('move');
        return;
      }

      if (dir === 'up') {
        openDetail();
        return;
      }

      openSearch();
    },
    [mode, finishBoot, previous, next, search, sound, openDetail, openSearch],
  );

  const selectSearchResult = useCallback(
    (index?: number) => {
      const result = typeof index === 'number' ? search.results[index] : search.selected;
      if (result) openDigimon(result);
      else sound.play('error');
    },
    [search.results, search.selected, openDigimon, sound],
  );

  const toggleSound = useCallback(() => {
    sound.play('toggle');
    sound.toggle();
  }, [sound]);

  useKeyboardControls({
    onNext: next,
    onPrevious: previous,
    onConfirm: confirm,
    onBack: back,
    onOpenSearch: openSearch,
    onOpenDetail: openDetail,
    onDirection,
    onToggleSound: toggleSound,
    onToggleCrt: toggleCrt,
    onAnyKey: () => {
      if (mode !== 'boot') return false;
      finishBoot();
      return true;
    },
  });

  return {
    mode,
    direction,
    crtEnabled,
    soundEnabled: sound.enabled,
    clock,
    catalog,
    search,
    detail,
    detailOrigin,
    actions: {
      finishBoot,
      next,
      previous,
      confirm,
      back,
      openSearch,
      openDetail,
      openDigimon,
      scanEvolution,
      selectSearchResult,
      onDirection,
      toggleSound,
      toggleCrt,
    },
  };
}
