import type { DigimonSummary } from '@/core/domain/entities/digimon';
import { DigimonNotFoundError } from '@/core/domain/errors/DigimonError';
import type { DigimonRepository } from '@/core/domain/repositories/DigimonRepository';

const SEARCH_RESULT_LIMIT = 12;

/**
 * A search can be an exact numeric id or a name fragment.
 * This decision lives in the application layer, not in the UI.
 */
export function createSearchDigimons(repository: DigimonRepository) {
  return async (rawQuery: string, signal?: AbortSignal): Promise<DigimonSummary[]> => {
    const query = rawQuery.trim();

    if (!query) return [];

    if (/^\d+$/.test(query)) {
      try {
        const detail = await repository.getByIdOrName(Number(query), signal);
        return [{ id: detail.id, name: detail.name, imageUrl: detail.imageUrl }];
      } catch (error) {
        if (error instanceof DigimonNotFoundError) return [];
        throw error;
      }
    }

    return repository.searchByName(query, SEARCH_RESULT_LIMIT, signal);
  };
}
