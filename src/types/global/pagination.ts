export interface PaginationData<T> {
  data: T;
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export type SearchParams = Record<string, string>;
