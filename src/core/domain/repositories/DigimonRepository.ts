import type {
  DigimonDetail,
  DigimonSummary,
  PageRequest,
  PaginatedResult,
} from '@/core/domain/entities/digimon';

/**
 * Port implemented by the infrastructure layer. The presentation layer only
 * depends on this interface, never on `fetch` or the Digi API response shape.
 */
export interface DigimonRepository {
  getCatalogPage(
    request: PageRequest,
    signal?: AbortSignal,
  ): Promise<PaginatedResult<DigimonSummary>>;

  getByIdOrName(idOrName: string | number, signal?: AbortSignal): Promise<DigimonDetail>;

  searchByName(name: string, pageSize?: number, signal?: AbortSignal): Promise<DigimonSummary[]>;
}
