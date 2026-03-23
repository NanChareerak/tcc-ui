import { ApiListResponse, ApiResponse, PaginationRequest } from './common-model';

export interface ApprovalModel {
  id: number;
  itemName: string;
  requestReason: string;
  statusCode: string;
  statusName: string;
  approvedReason?: string | null;
  rejectedReason?: string | null;
  actionBy?: string | null;
  actionDate?: string | null;
  createdBy?: string | null;
  createdDate?: string | null;
  updatedBy?: string | null;
  updatedDate?: string | null;
  isActive: boolean;
}

export interface ApprovalSearchRequest extends PaginationRequest {
  statusCode?: string;
  keyword?: string;
}

export interface ApproveApprovalRequest {
  ids: number[];
  reason: string;
}

export interface RejectApprovalRequest {
  ids: number[];
  reason: string;
}

export type ApprovalListResponse = ApiListResponse<ApprovalModel>;
export type ApprovalResponse = ApiResponse<ApprovalModel>;
export type ApprovalActionResponse = ApiResponse<number>;