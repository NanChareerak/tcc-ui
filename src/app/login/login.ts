import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

import { LoginAppService } from '../core/service/app/login.app-service';
import { LoginRequest } from '../core/models/login-model';
import { AppError } from '../core/models/common-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit, OnDestroy, OnChanges {
  @Input() returnUrl = '/welcome';

  username = '';
  password = '';
  errorMessage = '';
  loading = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly loginAppService: LoginAppService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['returnUrl']) {
      const currentValue = changes['returnUrl'].currentValue;
      const previousValue = changes['returnUrl'].previousValue;

      if (currentValue !== previousValue) {
        console.log('returnUrl changed:', currentValue);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLogin(): void {
    const request = this.buildLoginRequest();

    if (!request) {
      this.errorMessage = 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.loginAppService
      .login(request)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.router.navigate([this.returnUrl], {
            state: { username: response.username }
          });
        },
        error: (error: AppError) => {
          this.errorMessage = error.message;
        }
      });
  }

  private initializeForm(): void {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
    this.loading = false;
  }

  private buildLoginRequest(): LoginRequest | null {
    const username = this.username.trim();
    const password = this.password;

    if (!username || !password) {
      return null;
    }

    return {
      username,
      password
    };
  }
}