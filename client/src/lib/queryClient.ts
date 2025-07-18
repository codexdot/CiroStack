import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  url: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<any> {
  const { method = "GET", body, headers: customHeaders = {} } = options;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  // Add auth token if available
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    // Clear invalid tokens
    if (res.status === 401 && token) {
      localStorage.removeItem("auth_token");
    }
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }

  return res.json();
}

const defaultQueryFn: QueryFunction = async ({ queryKey, meta }) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add auth token if available and required
  const token = localStorage.getItem("auth_token");
  if (token && (meta?.requiresAuth || queryKey[0].includes('/auth/'))) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(queryKey.join("/") as string, {
    credentials: "include",
    headers,
  });

  if (!res.ok) {
    // Clear invalid tokens
    if (res.status === 401 && token) {
      localStorage.removeItem("auth_token");
    }
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }

  return res.json();
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
