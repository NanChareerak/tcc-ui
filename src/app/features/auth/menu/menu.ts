import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MenuItem {
  code: string;
  title: string;
  route: string;
  description: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
  username = history.state?.username || 'xxx';

  menus: MenuItem[] = [
    {
      code: 'IT01',
      title: 'Person',
      route: '/app/it01-person',
      description: 'ข้อมูลบุคคล / Add / View'
    },
    {
      code: 'IT02',
      title: 'Auth',
      route: '/app/it02-auth',
      description: 'Login / Register / Welcome'
    },
    {
      code: 'IT03',
      title: 'Approval',
      route: '/app/it03-approval',
      description: 'อนุมัติ / ไม่อนุมัติ'
    },
    {
      code: 'IT04',
      title: 'Profile',
      route: '/app/it04-profile',
      description: 'Form Profile / Upload / Validate'
    },
    {
      code: 'IT05',
      title: 'Queue',
      route: '/app/it05-queue',
      description: 'ระบบคิว'
    },
    {
      code: 'IT06',
      title: 'Barcode',
      route: '/app/it06-barcode',
      description: 'สร้างและแสดง Barcode'
    },
    {
      code: 'IT07',
      title: 'QRCode',
      route: '/app/it07-qrcode',
      description: 'สร้างและแสดง QR Code'
    },
    {
      code: 'IT08',
      title: 'Quiz',
      route: '/app/it08-quiz',
      description: 'ข้อสอบ / ตัวเลือก'
    },
    {
      code: 'IT09',
      title: 'Comment',
      route: '/app/it09-comment',
      description: 'Comment / Feed'
    },
    {
      code: 'IT10',
      title: 'Dashboard',
      route: '/app/it10-dashboard',
      description: 'หน้าหลักสรุประบบ'
    }
  ];
}