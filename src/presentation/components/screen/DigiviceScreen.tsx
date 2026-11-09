import { AnimatePresence, motion } from 'framer-motion';
import type { DigiviceController } from '@/presentation/hooks/useDigivice';
import { BootScreen } from '@/presentation/components/screen/BootScreen';
import { CatalogScreen } from '@/presentation/components/screen/CatalogScreen';
import { DetailScreen } from '@/presentation/components/screen/DetailScreen';
import { ScreenHud } from '@/presentation/components/screen/ScreenHud';
import { SearchScreen } from '@/presentation/components/screen/SearchScreen';
import { cn } from '@/shared/utils/cn';

export function DigiviceScreen({ digivice }: { digivice: DigiviceController }) {
  const { mode, direction, crtEnabled, clock, catalog, search, detail, actions } = digivice;

  const previous = catalog.items[catalog.activeIndex - 1] ?? null;
  const next = catalog.items[catalog.activeIndex + 1] ?? null;

  const hudId =
    mode === 'detail'
      ? (detail.subject?.id ?? null)
      : mode === 'search'
        ? (search.selected?.id ?? null)
        : (catalog.active?.id ?? null);

  return (
    <div className={cn('lcd', crtEnabled && 'lcd--crt')} data-mode={mode}>
      <div className="lcd__ambient" aria-hidden="true" />
      <div className="lcd__grid" aria-hidden="true" />
      <div className="lcd__noise" aria-hidden="true" />
      <div className="lcd__scanlines" aria-hidden="true" />
      <div className="lcd__glare" aria-hidden="true" />
      <div className="lcd__vignette" aria-hidden="true" />

      <div className="lcd__content">
        {mode !== 'boot' && <ScreenHud mode={mode} activeId={hudId} clock={clock} />}

        <div className="screen-view">
          <AnimatePresence initial={false}>
            <motion.div
              key={mode}
              className={`screen-page screen-page--${mode}`}
              initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(5px)' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {mode === 'boot' && <BootScreen onSkip={actions.finishBoot} />}

              {mode === 'catalog' && (
                <CatalogScreen
                  active={catalog.active}
                  previous={previous}
                  next={next}
                  activeIndex={catalog.activeIndex}
                  totalElements={catalog.totalElements}
                  detail={detail.detail}
                  detailLoading={detail.loading}
                  initialLoading={catalog.initialLoading}
                  loadingMore={catalog.loadingMore}
                  error={catalog.error}
                  direction={direction}
                  onNext={actions.next}
                  onPrevious={actions.previous}
                  onOpen={actions.openDetail}
                  onRetry={catalog.retry}
                />
              )}

              {mode === 'search' && (
                <SearchScreen
                  query={search.query}
                  results={search.results}
                  status={search.status}
                  error={search.error}
                  selectedIndex={search.selectedIndex}
                  onQueryChange={search.setQuery}
                  onSelectIndex={search.setSelectedIndex}
                  onSelect={actions.selectSearchResult}
                  onRetry={search.retry}
                  onClear={search.clear}
                  onBack={actions.back}
                />
              )}

              {mode === 'detail' && (
                <DetailScreen
                  subject={detail.subject}
                  detail={detail.detail}
                  loading={detail.loading}
                  error={detail.error}
                  onRetry={detail.retry}
                  onBack={actions.back}
                  onScanEvolution={actions.scanEvolution}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
