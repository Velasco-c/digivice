import type {
  DigimonDetail,
  DigimonSummary,
  PageRequest,
  PaginatedResult,
} from '@/core/domain/entities/digimon';
import type { DigimonRepository } from '@/core/domain/repositories/DigimonRepository';

/**
 * Decorator that adds an in-memory cache to any DigimonRepository.
 * This keeps the presentation layer fast without leaking cache concerns
 * into the API repository.
 */
export class CachedDigimonRepository implements DigimonRepository {
  private readonly catalogPages = new Map<string, PaginatedResult<DigimonSummary>>();
  private readonly details = new Map<string, DigimonDetail>();
  private readonly searches = new Map<string, DigimonSummary[]>();

  constructor(private readonly inner: DigimonRepository) {}

  async getCatalogPage(
    request: PageRequest,
    signal?: AbortSignal,
  ): Promise<PaginatedResult<DigimonSummary>> {
    const key = `${request.page}:${request.pageSize}`;
    const cached = this.catalogPages.get(key);
    if (cached) return cached;

    const result = await this.inner.getCatalogPage(request, signal);
    this.catalogPages.set(key, result);
    return result;
  }

  async getByIdOrName(idOrName: string | number, signal?: AbortSignal): Promise<DigimonDetail> {
    const key = String(idOrName).trim().toLowerCase();
    const cached = this.details.get(key);
    if (cached) return cached;

    const detail = await this.inner.getByIdOrName(idOrName, signal);
    this.details.set(key, detail);
    return detail;
  }

  async searchByName(
    name: string,
    pageSize = 12,
    signal?: AbortSignal,
  ): Promise<DigimonSummary[]> {
    const key = `${name.trim().toLowerCase()}:${pageSize}`;
    const cached = this.searches.get(key);
    if (cached) return cached;

    const results = await this.inner.searchByName(name, pageSize, signal);
    this.searches.set(key, results);
    return results;
  }
}
