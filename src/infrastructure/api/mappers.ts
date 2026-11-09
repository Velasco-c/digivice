import type {
  DigimonDetail,
  DigimonSummary,
  PaginatedResult,
} from '@/core/domain/entities/digimon';
import type {
  CatalogPageDto,
  DigimonDetailDto,
  DigimonSummaryDto,
} from '@/infrastructure/api/dto';

const PREFERRED_LANGUAGES = ['en_us', 'en', 'es_es', 'es', 'jap'];

export function mapSummary(dto: DigimonSummaryDto): DigimonSummary {
  return {
    id: dto.id,
    name: dto.name,
    imageUrl: dto.image ?? '',
  };
}

export function mapCatalogPage(dto: CatalogPageDto): PaginatedResult<DigimonSummary> {
  return {
    items: dto.content.map(mapSummary),
    page: dto.pageable.currentPage,
    pageSize: dto.pageable.elementsOnPage,
    totalElements: dto.pageable.totalElements,
    totalPages: dto.pageable.totalPages,
    hasNext: Boolean(dto.pageable.nextPage),
  };
}

function pickDescription(dto: DigimonDetailDto): string {
  const descriptions = dto.descriptions ?? [];

  for (const language of PREFERRED_LANGUAGES) {
    const match = descriptions.find((entry) => entry.language === language);
    if (match?.description) return match.description;
  }

  return descriptions[0]?.description ?? 'No hay descripción disponible en la base de datos.';
}

export function mapDetail(dto: DigimonDetailDto): DigimonDetail {
  return {
    id: dto.id,
    name: dto.name,
    imageUrl: dto.images?.find((image) => image.href)?.href ?? '',
    description: pickDescription(dto),
    level: dto.levels?.[0]?.level ?? 'Unknown',
    type: dto.types?.[0]?.type ?? 'Unknown',
    attribute: dto.attributes?.[0]?.attribute ?? 'Unknown',
    fields: (dto.fields ?? []).map((field) => field.field).filter(Boolean) as string[],
    releaseDate: dto.releaseDate ?? null,
    skills: (dto.skills ?? []).map((skill) => ({
      id: skill.id,
      name: skill.skill,
      translation: skill.translation || null,
      description: skill.description ?? '',
    })),
    priorEvolutions: (dto.priorEvolutions ?? []).map((evolution) => ({
      id: evolution.id,
      name: evolution.digimon,
      imageUrl: evolution.image ?? '',
      condition: evolution.condition || null,
    })),
    nextEvolutions: (dto.nextEvolutions ?? []).map((evolution) => ({
      id: evolution.id,
      name: evolution.digimon,
      imageUrl: evolution.image ?? '',
      condition: evolution.condition || null,
    })),
  };
}
