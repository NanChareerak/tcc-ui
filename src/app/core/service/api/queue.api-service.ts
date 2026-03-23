import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../models/common-model';
import {
  QueueCurrentModel,
  QueueIssueRequest,
  QueueNextModel,
  QueueResetModel,
  QueueTicketModel
} from '../../models/queue-model';

@Injectable({
  providedIn: 'root'
})
export class QueueApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/queues';

  issueQueue(request: QueueIssueRequest): Observable<ApiResponse<QueueTicketModel>> {
    return this.http.post<ApiResponse<QueueTicketModel>>(`${this.baseUrl}/issue`, request);
  }

  getCurrentQueue(): Observable<ApiResponse<QueueCurrentModel>> {
    return this.http.get<ApiResponse<QueueCurrentModel>>(`${this.baseUrl}/current`);
  }

  nextQueue(): Observable<ApiResponse<QueueNextModel>> {
    return this.http.post<ApiResponse<QueueNextModel>>(`${this.baseUrl}/next`, {});
  }

  resetQueue(): Observable<ApiResponse<QueueResetModel>> {
    return this.http.post<ApiResponse<QueueResetModel>>(`${this.baseUrl}/reset`, {});
  }
}