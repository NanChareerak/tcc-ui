import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { mapHttpError } from '../../models/common-error';
import {
  QuizCreateRequest,
  QuizDeleteResponse,
  QuizListResponse,
  QuizResponse
} from '../../models/quiz-model';

@Injectable({
  providedIn: 'root',
})

export class QuizApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly endpoint = '/api/quizzes';

  getAll(): Observable<QuizListResponse> {
    return this.http
      .get<QuizListResponse>(`${this.baseUrl}${this.endpoint}`)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error))));
  }

  create(request: QuizCreateRequest): Observable<QuizResponse> {
    return this.http
      .post<QuizResponse>(`${this.baseUrl}${this.endpoint}`, request)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error))));
  }

  delete(id: number): Observable<QuizDeleteResponse> {
    return this.http
      .delete<QuizDeleteResponse>(`${this.baseUrl}${this.endpoint}/${id}`)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error))));
  }
}