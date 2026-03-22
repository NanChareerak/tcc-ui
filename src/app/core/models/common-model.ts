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

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiListResponse<T> {
  datas: T[];
  message?: string;
  success: boolean;
}

export enum AppErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface AppError {
  code: AppErrorCode;
  message: string;
  status?: number;
  details?: unknown;
}