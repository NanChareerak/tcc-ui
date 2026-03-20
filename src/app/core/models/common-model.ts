
export interface PaginationRequest {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
  keyword?: string;
}

export interface PageResponse<T> {
  datas: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
