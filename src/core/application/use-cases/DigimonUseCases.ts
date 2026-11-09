import type {
  DigimonDetail,
  DigimonSummary,
  PageRequest,
  PaginatedResult,
} from '@/core/domain/entities/digimon';

/** Application contract consumed by React hooks. */
export interface DigimonUseCases {
  getCatalogPage(
    request: PageRequest,
    signal?: AbortSignal,
  ): Promise<PaginatedResult<DigimonSummary>>;
  getDetail(idOrName: string | number, signal?: AbortSignal): Promise<DigimonDetail>;
  searchDigimons(query: string, signal?: AbortSignal): Promise<DigimonSummary[]>;
}
