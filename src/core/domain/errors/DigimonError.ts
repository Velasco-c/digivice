export class DigimonApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'DigimonApiError';
  }
}

export class DigimonNotFoundError extends DigimonApiError {
  constructor(readonly query: string) {
    super(`No data found for "${query}"`, 404);
    this.name = 'DigimonNotFoundError';
  }
}
