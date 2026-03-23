import { PaginationRequest } from './common-model';

export interface BarcodeModel {
  id: number;
  code: string;
  name: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BarcodeSearchRequest extends PaginationRequest {
  code?: string;
  name?: string;
  isActive?: boolean | null;
}

export interface BarcodeCreateRequest {
  code: string;
  name: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface BarcodeUpdateRequest {
  id: number;
  code: string;
  name: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface BarcodeDeleteRequest {
  id: number;
}