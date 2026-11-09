import type {
  DigimonDetail,
  DigimonSummary,
  PageRequest,
  PaginatedResult,
} from '@/core/domain/entities/digimon';
import { DigimonApiError, DigimonNotFoundError } from '@/core/domain/errors/DigimonError';
import type { DigimonRepository } from '@/core/domain/repositories/DigimonRepository';
import { mapCatalogPage, mapDetail, mapSummary } from '@/infrastructure/api/mappers';
import { getJson, HttpError } from '@/infrastructure/api/httpClient';
import type { CatalogPageDto, DigimonDetailDto } from '@/infrastructure/api/dto';
import { API_BASE_URL } from '@/infrastructure/config/apiConfig';

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

function normalizeError(error: unknown): never {
  if (isAbortError(error)) throw error;
  if (error instanceof HttpError) throw new DigimonApiError(error.message, error.status);
  if (error instanceof Error) throw new DigimonApiError(error.message);
  throw new DigimonApiError('Error inesperado al consultar la Digi API.');
}

export class DigimonApiRepository implements DigimonRepository {
  constructor(private readonly baseUrl: string = API_BASE_URL) {}

  async getCatalogPage(
    request: PageRequest,
    signal?: AbortSignal,
  ): Promise<PaginatedResult<DigimonSummary>> {
    const params = new URLSearchParams({
      page: String(request.page),
      pageSize: String(request.pageSize),
    });

    try {
      const dto = await getJson<CatalogPageDto>(`${this.baseUrl}/digimon?${params}`, signal);
      return mapCatalogPage(dto);
    } catch (error) {
      return normalizeError(error);
    }
  }

  async searchByName(
    name: string,
    pageSize = 12,
    signal?: AbortSignal,
  ): Promise<DigimonSummary[]> {
    const params = new URLSearchParams({
      name,
      page: '0',
      pageSize: String(pageSize),
    });

    try {
      const dto = await getJson<CatalogPageDto>(`${this.baseUrl}/digimon?${params}`, signal);
      return dto.content.map(mapSummary);
    } catch (error) {
      return normalizeError(error);
    }
  }

  async getByIdOrName(idOrName: string | number, signal?: AbortSignal): Promise<DigimonDetail> {
    const query = String(idOrName).trim();

    if (!query) throw new DigimonNotFoundError(query);

    try {
      const dto = await getJson<DigimonDetailDto>(
        `${this.baseUrl}/digimon/${encodeURIComponent(query)}`,
        signal,
      );
      return mapDetail(dto);
    } catch (error) {
      // The Digi API answers with 400 when the Digimon does not exist.
      if (error instanceof HttpError && error.status === 400) {
        throw new DigimonNotFoundError(query);
      }
      return normalizeError(error);
    }
  }
}
