import { env } from "../config/env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<TBody> {
  method: HttpMethod;
  body?: TBody;
}

export async function http<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody>
): Promise<TResponse> {
  const res = await fetch(`${env.API_BASE_URL}${path}`, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.error ?? "Unexpected error");
  }

  return res.json();
}
