import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ApprovalApiService } from '../api/approval.api-service';
import {
  ApprovalModel,
  ApproveApprovalRequest,
  GetApprovalListRequest,
  RejectApprovalRequest
} from '../../models/approval-model';
import {  ApiListResponse, ApiResponse, AppError } from '../../models/common-model';

@Injectable({
  providedIn: 'root'
})
export class ApprovalAppService {
  private readonly approvalApiService = inject(ApprovalApiService);

  getList(request: GetApprovalListRequest): Observable<ApiListResponse<ApprovalModel>> {
    return this.approvalApiService.getList(request);
  }

  approve(request: ApproveApprovalRequest): Observable<number> {
    return this.approvalApiService.approve(request).pipe(
      map((response) => response.data)
    );
  }

  reject(request: RejectApprovalRequest): Observable<number> {
    return this.approvalApiService.reject(request).pipe(
      map((response) => response.data)
    );
  }
}