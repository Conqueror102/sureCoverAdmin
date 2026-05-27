type ApiResponse<T> = {
  data: T;
  status: number;
};

export async function apiClient<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  if (process.env.NEXT_PUBLIC_API_MOCKING !== "false") {
    return {
      data: { path, ok: true } as T,
      status: 200,
    };
  }

  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return {
    data: (await response.json()) as T,
    status: response.status,
  };
}
