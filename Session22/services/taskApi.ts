const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE ?? "http://10.0.2.2:8080/api/v1";

export type ApiPriority = "HIGH" | "MEDIUM" | "LOW";
export type ApiStatus = "PENDING" | "COMPLETED";
export type ApiTask = {
  id: number;
  name: string;
  priority: ApiPriority;
  status: ApiStatus;
  description?: string;
};
export type ApiTaskDTO = {
  name: string;
  priority: ApiPriority;
  description?: string;
};

async function request(input: RequestInfo | URL, init?: RequestInit) {
  const res = await fetch(input, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

const normalizeId = (id: string | number) => Number(id);

export const taskApi = {
  all: async (): Promise<ApiTask[]> => request(`${API_BASE}/tasks`),
  one: async (id: string | number): Promise<ApiTask> =>
    request(`${API_BASE}/tasks/${normalizeId(id)}`),
  create: async (dto: ApiTaskDTO): Promise<ApiTask> =>
    request(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    }),
  update: async (id: string | number, dto: ApiTaskDTO): Promise<ApiTask> =>
    request(`${API_BASE}/tasks/${normalizeId(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    }),
  patchStatus: async (
    id: string | number,
    status: ApiStatus
  ): Promise<ApiTask> =>
    request(`${API_BASE}/tasks/${normalizeId(id)}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }),
  remove: async (id: string | number): Promise<void> => {
    await request(`${API_BASE}/tasks/${normalizeId(id)}`, { method: "DELETE" });
  },
};
