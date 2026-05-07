export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

interface FetchOptions extends RequestInit {
  data?: any;
}

export async function fetchApi(url: string, options: FetchOptions = {}) {
  const { data, headers, ...restOptions } = options;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("gymlog_token") : null;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const mergedHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  const config: RequestInit = {
    ...restOptions,
    headers: mergedHeaders,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${url}`, config);

  if (!response.ok) {
    let errorMsg = "Ocorreu um erro na requisição.";
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorData.error || errorMsg;
    } catch (e) {
      // Ignore
    }
    throw new Error(errorMsg);
  }

  if (response.status === 204) {
    return null;
  }

  try {
    return await response.json();
  } catch (e) {
    return null;
  }
}
