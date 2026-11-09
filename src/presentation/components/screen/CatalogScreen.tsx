import { motion, type PanInfo } from 'framer-motion';
import type { DigimonDetail, DigimonSummary } from '@/core/domain/entities/digimon';
import { DataChip } from '@/presentation/components/ui/DataChip';
import { Icon } from '@/presentation/components/ui/Icon';
import { ScreenHints } from '@/presentation/components/ui/ScreenHints';
import { StatePanel } from '@/presentation/components/ui/StatePanel';
import { formatNumber, padId } from '@/shared/utils/format';

interface CatalogScreenProps {
  active: DigimonSummary | null;
  previous: DigimonSummary | null;
  next: DigimonSummary | null;
  activeIndex: number;
  totalElements: number;
  detail: DigimonDetail | null;
  detailLoading: boolean;
  initialLoading: boolean;
  loadingMore: boolean;
  error: string | null;
  direction: 1 | -1;
  onNext: () => void;
  onPrevious: () => void;
  onOpen: () => void;
  onRetry: () => void;
}

function CatalogSkeleton() {
  return (
    <div className="catalog-skeleton" aria-label="Cargando catálogo">
      <div className="catalog-skeleton__top">
        <span className="skeleton-block skeleton-block--line" />
        <span className="skeleton-block skeleton-block--line skeleton-block--short" />
      </div>
      <div className="skeleton-block catalog-skeleton__image" />
      <span className="skeleton-block skeleton-block--title" />
      <div className="catalog-skeleton__chips">
        <span className="skeleton-block skeleton-block--chip" />
        <span className="skeleton-block skeleton-block--chip" />
        <span className="skeleton-block skeleton-block--chip" />
      </div>
      <p className="catalog-skeleton__caption">
        <Icon name="scan" size={13} /> SCANNING DIGITAL DATABASE...
      </p>
    </div>
  );
}

export function CatalogScreen({
  active,
  previous,
  next,
  activeIndex,
  totalElements,
  detail,
  detailLoading,
  initialLoading,
  loadingMore,
  error,
  direction,
  onNext,
  onPrevious,
  onOpen,
  onRetry,
}: CatalogScreenProps) {
  if (initialLoading && !active) return <CatalogSkeleton />;

  if (error && !active) {
    return (
      <StatePanel
        variant="error"
        title="SIGNAL LOST"
        message={error}
        actionLabel="REINTENTAR"
        onAction={onRetry}
        compact
      />
    );
  }

  if (!active) {
    return (
      <StatePanel
        variant="empty"
        title="NO DATA"
        message="La base de datos no devolvió ningún Digimon."
        actionLabel="RECARGAR"
        onAction={onRetry}
        compact
      />
    );
  }

  const matchedDetail = detail?.id === active.id ? detail : null;
  const chipsLoading = detailLoading && !matchedDetail;

  const progress = totalElements > 0 ? ((activeIndex + 1) / totalElements) * 100 : 0;

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -58 || info.velocity.x < -420) {
      onNext();
      return;
    }

    if (info.offset.x > 58 || info.velocity.x > 420) {
      onPrevious();
    }
  };

  return (
    <div className="catalog">
      {previous && (
        <button
          type="button"
          className="catalog__peek catalog__peek--prev"
          onClick={onPrevious}
          aria-label={`Digimon anterior: ${previous.name}`}
          tabIndex={-1}
        >
          {previous.imageUrl && <img src={previous.imageUrl} alt="" loading="lazy" />}
        </button>
      )}
      {next && (
        <button
          type="button"
          className="catalog__peek catalog__peek--next"
          onClick={onNext}
          aria-label={`Siguiente Digimon: ${next.name}`}
          tabIndex={-1}
        >
          {next.imageUrl && <img src={next.imageUrl} alt="" loading="lazy" />}
        </button>
      )}

      <motion.article
        key={active.id}
        className="digi-card"
        initial={{
          x: direction * 66,
          opacity: 0,
          scale: 0.95,
          filter: 'blur(6px)',
        }}
        animate={{ x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ type: 'spring', stiffness: 270, damping: 28 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.14}
        onDragEnd={handleDragEnd}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <div className="digi-card__top">
          <span className="digi-card__serial">
            <span className="digi-card__bracket">[</span>
            SUBJECT {padId(active.id)}
            <span className="digi-card__bracket">]</span>
          </span>
          <span className="digi-card__year">{matchedDetail?.releaseDate ?? '----'}</span>
        </div>

        <motion.button
          type="button"
          className="digi-card__frame"
          onClick={onOpen}
          whileTap={{ scale: 0.98 }}
          aria-label={`Abrir ficha de ${active.name}`}
        >
          <span className="digi-card__frame-glow" aria-hidden="true" />
          <span className="digi-card__corner digi-card__corner--tl" aria-hidden="true" />
          <span className="digi-card__corner digi-card__corner--tr" aria-hidden="true" />
          <span className="digi-card__corner digi-card__corner--bl" aria-hidden="true" />
          <span className="digi-card__corner digi-card__corner--br" aria-hidden="true" />
          {active.imageUrl ? (
            <motion.img
              src={active.imageUrl}
              alt={active.name}
              draggable={false}
              loading="eager"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ) : (
            <span className="digi-card__no-image">NO IMAGE</span>
          )}
          <span className="digi-card__scanbeam" aria-hidden="true" />
        </motion.button>

        <div className="digi-card__identity">
          <span className="digi-card__ticker" aria-hidden="true">
            <i /> DIGI-ENTITY DETECTED
          </span>
          <h2 className="digi-card__name" title={active.name}>
            {active.name}
          </h2>
        </div>

        <div className="digi-card__chips">
          <DataChip label="LV" value={matchedDetail?.level} loading={chipsLoading} tone="accent" />
          <DataChip label="TYPE" value={matchedDetail?.type} loading={chipsLoading} />
          <DataChip label="ATTR" value={matchedDetail?.attribute} loading={chipsLoading} tone="warn" />
        </div>

        <button type="button" className="screen-button screen-button--primary digi-card__cta" onClick={onOpen}>
          <Icon name="scan" size={13} />
          ESCANEAR FICHA
          <span className="screen-button__key">A</span>
        </button>
      </motion.article>

      <div className="catalog__meta">
        <span className="catalog__counter">
          {String(activeIndex + 1).padStart(3, '0')} / {formatNumber(totalElements || 0)}
        </span>
        <span className="catalog__rail" aria-hidden="true">
          <motion.span
            className="catalog__rail-fill"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </span>
        <span className={`catalog__more ${loadingMore ? 'is-visible' : ''}`}>
          {loadingMore ? 'LOADING...' : hasNextLabel(totalElements)}
        </span>
      </div>

      <ScreenHints
        items={[
          { keys: ['←', '→'], label: 'MOVER' },
          { keys: ['A'], label: 'ESCANEAR' },
          { keys: ['↓'], label: 'BUSCAR' },
        ]}
      />
    </div>
  );
}

function hasNextLabel(totalElements: number): string {
  return totalElements > 0 ? 'LIVE' : '---';
}
