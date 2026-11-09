import type {
  DigimonSummary,
  PageRequest,
  PaginatedResult,
} from '@/core/domain/entities/digimon';
import type { DigimonRepository } from '@/core/domain/repositories/DigimonRepository';

export function createGetCatalogPage(repository: DigimonRepository) {
  return (
    request: PageRequest,
    signal?: AbortSignal,
  ): Promise<PaginatedResult<DigimonSummary>> => repository.getCatalogPage(request, signal);
}
