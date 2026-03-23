import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CreatePersonRequest,
  GetPersonListRequest,
  PersonModel,
  UpdatePersonRequest,
} from '../../models/person-model';
import {  ApiListResponse, ApiResponse, AppError } from '../../models/common-model';

@Injectable({
  providedIn: 'root',
})
export class PersonApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly controller = '/api/persons';

  getPersonList(request: GetPersonListRequest): Observable<ApiListResponse<PersonModel>> {
    return this.http
      .post<ApiListResponse<PersonModel>>(`${this.baseUrl}${this.controller}/list`, request)
      .pipe(catchError((error) => throwError(() => this.mapError(error))));
  }

  viewPerson(id: number): Observable<ApiResponse<PersonModel>> {
    return this.http
      .get<ApiResponse<PersonModel>>(`${this.baseUrl}${this.controller}/${id}`)
      .pipe(catchError((error) => throwError(() => this.mapError(error))));
  }

  createPerson(request: CreatePersonRequest): Observable<ApiResponse<PersonModel>> {
    return this.http
      .post<ApiResponse<PersonModel>>(`${this.baseUrl}${this.controller}/create`, request)
      .pipe(catchError((error) => throwError(() => this.mapError(error))));
  }

  updatePerson(request: UpdatePersonRequest): Observable<ApiResponse<PersonModel>> {
    return this.http
      .post<ApiResponse<PersonModel>>(`${this.baseUrl}${this.controller}/update`, request)
      .pipe(catchError((error) => throwError(() => this.mapError(error))));
  }

  private mapError(error: HttpErrorResponse): AppError {
    return {
      code: error.error?.code ?? 'UNKNOWN_ERROR',
      message: error.error?.message ?? 'เกิดข้อผิดพลาดที่ไม่คาดคิด',
      status: error.status,
      details: error.error,
    };
  }
}
