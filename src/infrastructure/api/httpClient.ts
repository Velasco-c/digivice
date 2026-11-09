export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

interface ApiErrorBody {
  message?: string;
  error?: number;
}

export async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const body = (await response.json()) as ApiErrorBody;
      if (body.message) message = body.message;
    } catch {
      // The response body is not JSON; keep the generic message.
    }

    throw new HttpError(message, response.status);
  }

  return (await response.json()) as T;
}
