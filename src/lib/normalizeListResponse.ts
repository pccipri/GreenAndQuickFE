export interface PaginatedPayload<T> {
  items?: T[];
  results?: T[];
  data?: T[] | { items?: T[]; results?: T[]; page?: number; limit?: number; total?: number; pages?: number };
  page?: number;
  limit?: number;
  total?: number;
  pages?: number;
}

export interface NormalizedListResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const normalizeItems = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (value && typeof value === 'object') {
    const candidate = value as Record<string, unknown>;
    if (Array.isArray(candidate.items)) {
      return candidate.items as T[];
    }
    if (Array.isArray(candidate.results)) {
      return candidate.results as T[];
    }
  }

  return [];
};

export const normalizeListResponse = <T>(responseData: unknown): NormalizedListResponse<T> => {
  if (Array.isArray(responseData)) {
    return {
      items: responseData as T[],
      page: 1,
      limit: responseData.length,
      total: responseData.length,
      pages: 1,
    };
  }

  if (responseData && typeof responseData === 'object') {
    const candidate = responseData as PaginatedPayload<T>;
    const payload = candidate.data && typeof candidate.data === 'object' && !Array.isArray(candidate.data)
      ? candidate.data
      : candidate;

    const items = normalizeItems<T>(payload?.items ?? payload?.results ?? candidate.items ?? candidate.results);
    const page = payload?.page ?? candidate.page ?? 1;
    const limit = payload?.limit ?? candidate.limit ?? (items.length > 0 ? items.length : 10);
    const total = payload?.total ?? candidate.total ?? items.length;
    const pages = payload?.pages ?? candidate.pages ?? (total > 0 && limit > 0 ? Math.ceil(total / limit) : 1);

    return {
      items,
      page,
      limit,
      total,
      pages,
    };
  }

  return {
    items: [],
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  };
};
