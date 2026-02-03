import { env } from "../config/env";
import { HttpError } from "./http-errors";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<TBody> {
  method: HttpMethod;
  body?: TBody;
}

export async function http<TResponse, TBody = unknown>(
  path: string,
  options?: RequestOptions<TBody>
): Promise<TResponse> {
  const res = await fetch(`${env.API_BASE_URL}${path}`, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new HttpError(res.status, payload?.error ?? res.statusText, payload);
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return undefined as unknown as TResponse;
  }

  // If response has content, parse JSON
  const text = await res.text();
  return text ? JSON.parse(text) : (undefined as unknown as TResponse);
}
