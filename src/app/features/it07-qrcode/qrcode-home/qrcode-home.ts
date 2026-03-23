
import { Component } from '@angular/core';
import { QrcodeListComponent } from '../qrcode-list/qrcode-list';


@Component({
  selector: 'app-qrcode-home',
  standalone: true,
  imports: [ QrcodeListComponent],
  templateUrl: './qrcode-home.html',
  styleUrl: './qrcode-home.scss',
})
export class QrcodeHomeComponent {}
