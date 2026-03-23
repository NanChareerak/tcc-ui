import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiListResponse, ApiResponse } from '../../models/common-model';
import {
  BarcodeCreateRequest,
  BarcodeDeleteRequest,
  BarcodeModel,
  BarcodeSearchRequest,
  BarcodeUpdateRequest
} from '../../models/barcode-model';

@Injectable({
  providedIn: 'root'
})
export class BarcodeApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/barcodes';

  search(request: BarcodeSearchRequest): Observable<ApiListResponse<BarcodeModel>> {
    return this.http.post<ApiListResponse<BarcodeModel>>(`${this.baseUrl}/search`, request);
  }

  getById(id: number): Observable<ApiResponse<BarcodeModel>> {
    return this.http.get<ApiResponse<BarcodeModel>>(`${this.baseUrl}/${id}`);
  }

  create(request: BarcodeCreateRequest): Observable<ApiResponse<BarcodeModel>> {
    return this.http.post<ApiResponse<BarcodeModel>>(`${this.baseUrl}`, request);
  }

  update(request: BarcodeUpdateRequest): Observable<ApiResponse<BarcodeModel>> {
    return this.http.put<ApiResponse<BarcodeModel>>(`${this.baseUrl}/${request.id}`, request);
  }

  delete(request: BarcodeDeleteRequest): Observable<ApiResponse<boolean>> {
    return this.http.request<ApiResponse<boolean>>('delete', `${this.baseUrl}/${request.id}`);
  }
}