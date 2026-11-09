import { motion } from 'framer-motion';
import type { DigimonDetail, DigimonSummary } from '@/core/domain/entities/digimon';
import { APP_CONFIG } from '@/shared/constants/app';
import { DataChip } from '@/presentation/components/ui/DataChip';
import { Icon } from '@/presentation/components/ui/Icon';
import { ScreenHints } from '@/presentation/components/ui/ScreenHints';
import { StatePanel } from '@/presentation/components/ui/StatePanel';
import { padId } from '@/shared/utils/format';

interface DetailScreenProps {
  subject: DigimonSummary | null;
  detail: DigimonDetail | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onBack: () => void;
  onScanEvolution: (summary: DigimonSummary) => void;
}

function DetailSkeleton({ subject }: { subject: DigimonSummary | null }) {
  return (
    <div className="detail-skeleton" aria-label="Escaneando Digimon">
      <div className="detail-skeleton__top">
        <span className="skeleton-block skeleton-block--line skeleton-block--short" />
        <span className="skeleton-block skeleton-block--line" />
      </div>
      <div className="detail-skeleton__hero">
        <span className="skeleton-block detail-skeleton__image" />
        <div className="detail-skeleton__meta">
          <span className="skeleton-block skeleton-block--title" />
          <span className="skeleton-block skeleton-block--chip" />
          <span className="skeleton-block skeleton-block--chip" />
          <span className="skeleton-block skeleton-block--line" />
        </div>
      </div>
      <p className="detail-skeleton__caption">
        <Icon name="scan" size={13} /> DECODING {subject ? subject.name.toUpperCase() : 'ENTITY'}...
      </p>
    </div>
  );
}

export function DetailScreen({
  subject,
  detail,
  loading,
  error,
  onRetry,
  onBack,
  onScanEvolution,
}: DetailScreenProps) {
  if (!subject) {
    return (
      <StatePanel
        variant="locked"
        title="NO TARGET"
        message="Selecciona un Digimon en el catálogo para iniciar el escaneo."
        compact
      />
    );
  }

  if (error && !detail) {
    return (
      <StatePanel
        variant="error"
        title="SCAN FAILED"
        message={error}
        actionLabel="REINTENTAR"
        onAction={onRetry}
        compact
      />
    );
  }

  if (!detail) return <DetailSkeleton subject={subject} />;

  const skills = detail.skills.slice(0, APP_CONFIG.maxSkills);
  const fields = detail.fields.slice(0, APP_CONFIG.maxFields);
  const evolutions = detail.nextEvolutions.slice(0, APP_CONFIG.maxEvolutions);

  return (
    <div className="detail">
      <div className="detail__scroll">
        <div className="detail__topbar">
          <button type="button" className="screen-button screen-button--ghost" onClick={onBack}>
            <Icon name="arrow-left" size={13} />
            <span className="screen-button__key">B</span>
            VOLVER
          </button>
          <span className="detail__status">
            <i /> SCAN COMPLETE
          </span>
          <span className="detail__id">#{padId(detail.id)}</span>
        </div>

        <div className="detail__hero">
          <div className="detail__portrait">
            <span className="detail__portrait-grid" aria-hidden="true" />
            <span className="detail__portrait-ring" aria-hidden="true" />
            {detail.imageUrl ? (
              <motion.img
                src={detail.imageUrl}
                alt={detail.name}
                loading="eager"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            ) : (
              <span className="digi-card__no-image">NO IMAGE</span>
            )}
            {loading && <span className="detail__loading-badge">SYNC</span>}
          </div>

          <div className="detail__identity">
            <p className="detail__eyebrow">DIGIMON DATA FILE</p>
            <h2 className="detail__name" title={detail.name}>
              {detail.name}
            </h2>
            <p className="detail__release">
              FIRST RECORD <strong>{detail.releaseDate ?? 'UNKNOWN'}</strong>
            </p>

            <div className="detail__chips">
              <DataChip label="LEVEL" value={detail.level} tone="accent" />
              <DataChip label="TYPE" value={detail.type} />
              <DataChip label="ATTR" value={detail.attribute} tone="warn" />
            </div>
          </div>
        </div>

        <section className="detail__section">
          <h3 className="detail__section-title">
            <span>01</span> DATA LOG
          </h3>
          <p className="detail__description">{detail.description}</p>
        </section>

        {fields.length > 0 && (
          <section className="detail__section">
            <h3 className="detail__section-title">
              <span>02</span> FIELDS
            </h3>
            <div className="detail__tags">
              {fields.map((field) => (
                <span className="detail__tag" key={field}>
                  {field}
                </span>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="detail__section">
            <h3 className="detail__section-title">
              <span>03</span> SKILLS
            </h3>
            <ol className="skill-list">
              {skills.map((skill, index) => (
                <li className="skill" key={skill.id}>
                  <span className="skill__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="skill__body">
                    <span className="skill__name">
                      {skill.name}
                      {skill.translation && <em> / {skill.translation}</em>}
                    </span>
                    {skill.description && <span className="skill__description">{skill.description}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {evolutions.length > 0 && (
          <section className="detail__section">
            <h3 className="detail__section-title">
              <span>04</span> EVOLUTION PATH
            </h3>
            <div className="evolution-strip">
              {evolutions.map((evolution) => (
                <button
                  type="button"
                  className="evolution-chip"
                  key={evolution.id}
                  onClick={() =>
                    onScanEvolution({
                      id: evolution.id,
                      name: evolution.name,
                      imageUrl: evolution.imageUrl,
                    })
                  }
                  title={evolution.condition ?? evolution.name}
                >
                  <span className="evolution-chip__thumb">
                    {evolution.imageUrl && <img src={evolution.imageUrl} alt="" loading="lazy" />}
                  </span>
                  <span className="evolution-chip__name">{evolution.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <p className="detail__terminator" aria-hidden="true">
          // END OF FILE · DIGI-API v1
        </p>
      </div>

      <ScreenHints
        items={[
          { keys: ['B'], label: 'VOLVER' },
          { keys: ['↑', '↓'], label: 'SCROLL' },
        ]}
      />
    </div>
  );
}
