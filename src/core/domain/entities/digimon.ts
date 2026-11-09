/** Core domain model. It knows nothing about React or HTTP. */
export interface DigimonSummary {
  id: number;
  name: string;
  imageUrl: string;
}

export interface DigimonSkill {
  id: number;
  name: string;
  translation: string | null;
  description: string;
}

export interface DigimonEvolution {
  id: number;
  name: string;
  imageUrl: string;
  condition: string | null;
}

export interface DigimonDetail extends DigimonSummary {
  description: string;
  level: string;
  type: string;
  attribute: string;
  fields: string[];
  releaseDate: string | null;
  skills: DigimonSkill[];
  priorEvolutions: DigimonEvolution[];
  nextEvolutions: DigimonEvolution[];
}

export interface PageRequest {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}
