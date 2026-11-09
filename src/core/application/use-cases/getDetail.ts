import type { DigimonDetail } from '@/core/domain/entities/digimon';
import type { DigimonRepository } from '@/core/domain/repositories/DigimonRepository';

export function createGetDetail(repository: DigimonRepository) {
  return (idOrName: string | number, signal?: AbortSignal): Promise<DigimonDetail> =>
    repository.getByIdOrName(idOrName, signal);
}
