/** Raw Digi API response shapes. Kept isolated inside the infrastructure layer. */
export interface DigimonSummaryDto {
  id: number;
  name: string;
  image?: string;
  href?: string;
}

export interface CatalogPageDto {
  content: DigimonSummaryDto[];
  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
    previousPage?: string;
    nextPage?: string;
  };
}

interface NamedDto {
  id?: number;
  level?: string;
  type?: string;
  attribute?: string;
  field?: string;
}

interface DescriptionDto {
  origin: string;
  language: string;
  description: string;
}

interface SkillDto {
  id: number;
  skill: string;
  translation?: string;
  description?: string;
}

interface EvolutionDto {
  id: number;
  digimon: string;
  condition?: string;
  image?: string;
  url?: string;
}

export interface DigimonDetailDto {
  id: number;
  name: string;
  images?: Array<{ href?: string; transparent?: boolean }>;
  levels?: NamedDto[];
  types?: NamedDto[];
  attributes?: NamedDto[];
  fields?: NamedDto[];
  releaseDate?: string | null;
  descriptions?: DescriptionDto[];
  skills?: SkillDto[];
  priorEvolutions?: EvolutionDto[];
  nextEvolutions?: EvolutionDto[];
}
