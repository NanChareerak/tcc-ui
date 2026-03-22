import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterAppService } from '../core/service/app/register.app-service';
import { RegisterRequest } from '../core/models/register-model';
import { AppError } from '../core/models/common-model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit, OnDestroy {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly registerAppService: RegisterAppService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRegister(): void {
    const request = this.buildRegisterRequest();

    if (!request) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.registerAppService
      .register(request)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.successMessage = 'สมัครสมาชิกสำเร็จ';

          this.router.navigate(['/login']);
        },
        error: (error: AppError) => {
          this.errorMessage = error.message;
        }
      });
  }

  private initializeForm(): void {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = false;
  }

  private buildRegisterRequest(): RegisterRequest | null {
    const username = this.username.trim();
    const password = this.password;
    const confirmPassword = this.confirmPassword;

    if (!username || !password || !confirmPassword) {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ครบ';
      return null;
    }

    if (password !== confirmPassword) {
      this.errorMessage = 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน';
      return null;
    }

    return {
      username,
      password
    };
  }
}