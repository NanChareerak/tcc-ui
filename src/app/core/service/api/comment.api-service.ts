import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { mapHttpError } from '../../models/common-error';
import {
  CommentCreateApiResponse,
  CommentCreateRequest,
  CommentThreadApiResponse
} from '../../models/comment-model';

@Injectable({
  providedIn: 'root',
})
export class CommentApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly endpoint = '/api/comments';

  getThread(postId: number): Observable<CommentThreadApiResponse> {
    return this.http
      .get<CommentThreadApiResponse>(`${this.baseUrl}${this.endpoint}/posts/${postId}`)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error))));
  }

  create(request: CommentCreateRequest): Observable<CommentCreateApiResponse> {
    return this.http
      .post<CommentCreateApiResponse>(`${this.baseUrl}${this.endpoint}`, request)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error))));
  }
}