import {
  createGetCatalogPage,
} from '@/core/application/use-cases/getCatalogPage';
import { createGetDetail } from '@/core/application/use-cases/getDetail';
import { createSearchDigimons } from '@/core/application/use-cases/searchDigimons';
import type { DigimonUseCases } from '@/core/application/use-cases/DigimonUseCases';
import { DigimonApiRepository } from '@/infrastructure/api/DigimonApiRepository';
import { CachedDigimonRepository } from '@/infrastructure/repositories/CachedDigimonRepository';

/**
 * Composition root: the only place where concrete implementations are wired.
 * UI code receives the abstract use-case contract.
 */
const repository = new CachedDigimonRepository(new DigimonApiRepository());

export const digimonUseCases: DigimonUseCases = {
  getCatalogPage: createGetCatalogPage(repository),
  getDetail: createGetDetail(repository),
  searchDigimons: createSearchDigimons(repository),
};
