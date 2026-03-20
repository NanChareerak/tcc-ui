import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  constructor(private router: Router) {}

  onLogin(): void {
    const mockUser = this.username?.trim() || 'xxx';

    this.router.navigate(['/welcome'], {
      state: { username: mockUser }
    });
  }
}