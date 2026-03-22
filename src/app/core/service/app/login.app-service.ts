import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginApiService } from '../api/login.api-service';
import { LoginRequest, LoginResponse } from '../../models/login-model';

@Injectable({
  providedIn: 'root'
})

export class LoginAppService {
  private readonly loginApiService = inject(LoginApiService);

  login(request: LoginRequest): Observable<LoginResponse> {
    const payload: LoginRequest = {
      username: request.username.trim(),
      password: request.password
    };

    return this.loginApiService.login(payload);
  }
}