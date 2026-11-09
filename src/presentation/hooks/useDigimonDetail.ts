import { useCallback, useEffect, useState } from 'react';
import type { DigimonDetail, DigimonSummary } from '@/core/domain/entities/digimon';
import { digimonUseCases } from '@/app/container';
import { errorMessage, isAbortError } from '@/shared/utils/format';

export interface DigimonDetailState {
  subject: DigimonSummary | null;
  detail: DigimonDetail | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useDigimonDetail(subject: DigimonSummary | null): DigimonDetailState {
  const [detail, setDetail] = useState<DigimonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  const subjectId = subject?.id ?? null;

  useEffect(() => {
    if (subjectId === null) {
      setDetail(null);
      setLoading(false);
      setError(null);
      return;
    }

    let active = true;
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    digimonUseCases
      .getDetail(subjectId, controller.signal)
      .then((result) => {
        if (active) setDetail(result);
      })
      .catch((caught) => {
        if (!active || isAbortError(caught)) return;
        setError(errorMessage(caught, 'No se pudo escanear este Digimon.'));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [subjectId, retryToken]);

  const retry = useCallback(() => setRetryToken((token) => token + 1), []);

  return {
    subject,
    detail: detail && detail.id === subjectId ? detail : null,
    loading,
    error,
    retry,
  };
}
