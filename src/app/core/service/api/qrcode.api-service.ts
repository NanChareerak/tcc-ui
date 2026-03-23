import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiListResponse, ApiResponse } from '../../models/common-model';
import {
  QrcodeCreateRequest,
  QrcodeDeleteRequest,
  QrcodeGenerateResponse,
  QrcodeModel,
  QrcodeSearchRequest
} from '../../models/qrcode-model';

@Injectable({
  providedIn: 'root'
})
export class QrcodeApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/qrcodes';

  search(request: QrcodeSearchRequest): Observable<ApiListResponse<QrcodeModel>> {
    return this.http.post<ApiListResponse<QrcodeModel>>(`${this.baseUrl}/search`, request);
  }

  create(request: QrcodeCreateRequest): Observable<ApiResponse<QrcodeModel>> {
    return this.http.post<ApiResponse<QrcodeModel>>(`${this.baseUrl}`, request);
  }

  delete(request: QrcodeDeleteRequest): Observable<ApiResponse<boolean>> {
    return this.http.request<ApiResponse<boolean>>('delete', `${this.baseUrl}/${request.id}`);
  }

  generate(id: number): Observable<ApiResponse<QrcodeGenerateResponse>> {
    return this.http.get<ApiResponse<QrcodeGenerateResponse>>(`${this.baseUrl}/${id}/generate`);
  }

  generateByProductCode(productCode: string): Observable<ApiResponse<QrcodeGenerateResponse>> {
    return this.http.post<ApiResponse<QrcodeGenerateResponse>>(`${this.baseUrl}/generate`, {
      productCode
    });
  }
}