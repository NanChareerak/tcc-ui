import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { mapHttpError } from '../../models/common-error';
import {
  ApprovalActionResponse,
  ApprovalListResponse,
  ApprovalSearchRequest,
  ApproveApprovalRequest,
  RejectApprovalRequest
} from '../../models/approval-model';

@Injectable({
  providedIn: 'root',
})
export class ApprovalApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly endpoint = '/api/approvals';

  getList(request: ApprovalSearchRequest): Observable<ApprovalListResponse> {
    return this.http
      .post<ApprovalListResponse>(`${this.baseUrl}${this.endpoint}/list`, request)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error))));
  }

  approve(request: ApproveApprovalRequest): Observable<ApprovalActionResponse> {
    return this.http
      .post<ApprovalActionResponse>(`${this.baseUrl}${this.endpoint}/approve`, request)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error))));
  }

  reject(request: RejectApprovalRequest): Observable<ApprovalActionResponse> {
    return this.http
      .post<ApprovalActionResponse>(`${this.baseUrl}${this.endpoint}/reject`, request)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error))));
  }
}