export const API_BASE_URL =
  (import.meta.env.VITE_DIGI_API_URL as string | undefined)?.replace(/\/$/, '') ??
  'https://digi-api.com/api/v1';
