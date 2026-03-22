import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { RegisterApiService } from '../api/register.api-service';
import { RegisterRequest, RegisterResponse } from '../../models/register-model';

@Injectable({
  providedIn: 'root',
})

export class RegisterAppService {
  private readonly registerApiService = inject(RegisterApiService);

  register(request: RegisterRequest): Observable<RegisterResponse> {
    const payload: RegisterRequest = {
      username: request.username.trim(),
      password: request.password,
    };

    return this.registerApiService.register(payload);
  }
}
