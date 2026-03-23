import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { mapHttpError } from '../../models/common-error';
import {
  ExamQuestionListResponse,
  ExamResultResponse,
  ExamSubmitRequest
} from '../../models/exam-model';

@Injectable({
  providedIn: 'root',
})
export class ExamApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly endpoint = '/api/exams';

  getQuestions(): Observable<ExamQuestionListResponse> {
    return this.http
      .get<ExamQuestionListResponse>(`${this.baseUrl}${this.endpoint}/questions`)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error))));
  }

  submit(request: ExamSubmitRequest): Observable<ExamResultResponse> {
    return this.http
      .post<ExamResultResponse>(`${this.baseUrl}${this.endpoint}/submit`, request)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error))));
  }
}