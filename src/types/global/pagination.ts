export interface PaginationData<T> {
  data: T;
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    page: number;
    total_pages: number;
  };
}

export type SearchParams = Record<string, string>;
