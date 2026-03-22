import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { LoginRequest, LoginResponse } from '../../models/login-model';
import { environment } from '../../../../environments/environment';
import { AppError } from '../../models/common-model';
import { mapHttpError } from '../../models/common-error';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly endpoint = '/api/users/login';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}${this.endpoint}`, request)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => mapHttpError(error))));
  }
}
