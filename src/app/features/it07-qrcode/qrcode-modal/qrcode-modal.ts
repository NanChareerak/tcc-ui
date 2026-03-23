
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { QrcodeAppService } from '../../../core/service/app/qrcode.app-service';

@Component({
  selector: 'app-qrcode-modal',
  standalone: true,
  imports: [CommonModule, NzModalModule, NzButtonModule],
  templateUrl: './qrcode-modal.html',
  styleUrl: './qrcode-modal.scss',
})
export class QrcodeModalComponent {
  private qrcodeAppService = inject(QrcodeAppService);

  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();

  selectedQr = this.qrcodeAppService.selectedQr;

  get qrImageSrc(): string {
    const qr = this.selectedQr();

    if (!qr) {
      return '';
    }

    if (qr.qrCodeBase64) {
      return `data:image/png;base64,${qr.qrCodeBase64}`;
    }

    return qr.qrCodeImageUrl ?? '';
  }

  handleClose(): void {
    this.closed.emit();
  }
}