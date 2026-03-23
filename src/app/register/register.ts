import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private router: Router) {}

  onRegister(): void {
    if (this.loading) {
      return;
    }

    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ครบ';
      this.successMessage = '';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน';
      this.successMessage = '';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // mock flow ชั่วคราว
    this.successMessage = 'สมัครสมาชิกสำเร็จ';
    this.loading = false;

    this.router.navigate(['/login']);
  }
}