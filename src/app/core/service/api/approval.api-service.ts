import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
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
export class ApprovalApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly controller = '/api/approvals';

  getList(request: GetApprovalListRequest): Observable<ApiListResponse<ApprovalModel>> {
    return this.http
      .post<ApiListResponse<ApprovalModel>>(`${this.baseUrl}${this.controller}/list`, request)
      .pipe(catchError((error) => throwError(() => this.mapError(error))));
  }

  approve(request: ApproveApprovalRequest): Observable<ApiResponse<number>> {
    return this.http
      .post<ApiResponse<number>>(`${this.baseUrl}${this.controller}/approve`, request)
      .pipe(catchError((error) => throwError(() => this.mapError(error))));
  }

  reject(request: RejectApprovalRequest): Observable<ApiResponse<number>> {
    return this.http
      .post<ApiResponse<number>>(`${this.baseUrl}${this.controller}/reject`, request)
      .pipe(catchError((error) => throwError(() => this.mapError(error))));
  }

  private mapError(error: HttpErrorResponse): AppError {
    return {
      code: error.error?.code ?? 'UNKNOWN_ERROR',
      message: error.error?.message ?? 'เกิดข้อผิดพลาดที่ไม่คาดคิด',
      status: error.status,
      details: error.error
    };
  }
}