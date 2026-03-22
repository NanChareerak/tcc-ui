import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';
  loading = false;

  private readonly apiUrl = 'https://localhost:7015/api/users/login';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  onLogin(): void {
    const username = this.username.trim();
    const password = this.password.trim();

    if (!username || !password) {
      this.errorMessage = 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const payload = {
      username,
      password
    };

    this.http.post<any>(this.apiUrl, payload).subscribe({
      next: (res) => {
        const loggedInUsername = res?.username || username;

        this.router.navigate(['/welcome'], {
          state: { username: loggedInUsername }
        });
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
        } else {
          this.errorMessage = 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้';
        }

        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}