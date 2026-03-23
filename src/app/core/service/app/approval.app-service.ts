import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ApprovalApiService } from '../api/approval.api-service';
import {
  ApprovalModel,
  ApprovalSearchRequest,
  ApproveApprovalRequest,
  RejectApprovalRequest
} from '../../models/approval-model';

@Injectable({
  providedIn: 'root',
})
export class ApprovalAppService {
  private readonly approvalApiService = inject(ApprovalApiService);

  readonly items = signal<ApprovalModel[]>([]);
  readonly total = signal(0);
  readonly page = signal(1);
  readonly pageSize = signal(10);
  readonly totalPages = signal(0);

  search(request?: Partial<ApprovalSearchRequest>) {
    const page = request?.page ?? this.page();
    const pageSize = request?.pageSize ?? this.pageSize();

    const payload: ApprovalSearchRequest = {
      page,
      pageSize,
      skip: (page - 1) * pageSize,
      take: pageSize,
      keyword: request?.keyword ?? '',
      statusCode: request?.statusCode ?? ''
    };

    return this.approvalApiService.getList(payload).pipe(
      tap((response) => {
        this.items.set(response.datas ?? []);
        this.total.set(response.total ?? 0);
        this.page.set(response.page ?? page);
        this.pageSize.set(response.pageSize ?? pageSize);
        this.totalPages.set(response.totalPages ?? 0);
      })
    );
  }

  approve(request: ApproveApprovalRequest) {
    return this.approvalApiService.approve(request);
  }

  reject(request: RejectApprovalRequest) {
    return this.approvalApiService.reject(request);
  }
}