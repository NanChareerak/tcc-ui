import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

interface AppMenuItem {
  code: string;
  title: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    NzDropDownModule
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  username = history.state?.username || 'xxx';
  isSidebarCollapsed = false;

  menus: AppMenuItem[] = [
    { code: 'IT01', title: 'Person', route: '/app/it01-person', icon: '👤' },
    { code: 'IT02', title: 'Auth', route: '/app/it02-auth', icon: '🔐' },
    { code: 'IT03', title: 'Approval', route: '/app/it03-approval', icon: '✅' },
    { code: 'IT04', title: 'Profile', route: '/app/it04-profile', icon: '📄' },
    { code: 'IT05', title: 'Queue', route: '/app/it05-queue', icon: '⏳' },
    { code: 'IT06', title: 'Barcode', route: '/app/it06-barcode', icon: '🏷️' },
    { code: 'IT07', title: 'QRCode', route: '/app/it07-qrcode', icon: '🔳' },
    { code: 'IT08', title: 'Quiz', route: '/app/it08-quiz', icon: '❓' },
    { code: 'IT09', title: 'Comment', route: '/app/it09-comment', icon: '💬' },
    { code: 'IT10', title: 'Dashboard', route: '/app/dashboard', icon: '📊' },
  ];

  constructor(private router: Router) {}

    toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
