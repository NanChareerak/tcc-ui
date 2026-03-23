export type ApprovalStatusCode = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ApprovalModel {
  id: number;
  itemName: string;
  requestReason?: string;
  statusCode: ApprovalStatusCode;
  statusName: string;
  approvedReason?: string;
  rejectedReason?: string;
  actionBy?: string;
  actionDate?: string;
  createdBy: string;
  createdDate: string;
  updatedBy?: string;
  updatedDate?: string;
  isActive: boolean;

  checked?: boolean;
}

export interface GetApprovalListRequest {
  pageIndex: number;
  pageSize: number;
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