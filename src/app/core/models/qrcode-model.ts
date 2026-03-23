import { ApiListResponse, ApiResponse, PaginationRequest } from './common-model';

export interface QrcodeModel {
  id: number;
  productCode: string;
  qrCodeImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface QrcodeSearchRequest extends PaginationRequest {
  productCode?: string;
}

export interface QrcodeCreateRequest {
  productCode: string;
}

export interface QrcodeDeleteRequest {
  id: number;
}

export interface QrcodeGenerateResponse {
  productCode: string;
  qrCodeValue: string;
  qrCodeImageUrl?: string;
  qrCodeBase64?: string;
}

export type QrcodeListResponse = ApiListResponse<QrcodeModel>;
export type QrcodeResponse = ApiResponse<QrcodeModel>;
export type QrcodeGenerateApiResponse = ApiResponse<QrcodeGenerateResponse>;
export type QrcodeDeleteResponse = ApiResponse<boolean>;