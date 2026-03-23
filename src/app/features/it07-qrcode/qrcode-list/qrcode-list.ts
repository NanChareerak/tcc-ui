// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-qrcode-list',
//   imports: [],
//   templateUrl: './qrcode-list.html',
//   styleUrl: './qrcode-list.scss',
// })
// export class QrcodeList {}

import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';

import { QrcodeAppService } from '../../../core/service/app/qrcode.app-service';
import { QrcodeModel } from '../../../core/models/qrcode-model';
import { QrcodeHomeComponent } from '../qrcode-home/qrcode-home';
import { QrcodeModalComponent } from '../qrcode-modal/qrcode-modal';

@Component({
  selector: 'app-qrcode-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzPopconfirmModule,
    NzSpaceModule,
    NzTableModule,
    QrcodeModalComponent,
  ],
  templateUrl: './qrcode-list.html',
  styleUrl: './qrcode-list.scss',
})
export class QrcodeListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private message = inject(NzMessageService);
  protected qrcodeAppService = inject(QrcodeAppService);

  loading = signal(false);
  modalVisible = signal(false);

  form = this.fb.group({
    productCode: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/,
        ),
      ],
    ],
  });

  ngOnInit(): void {
    this.loadData();
  }

  get items() {
    return this.qrcodeAppService.items;
  }

  get total() {
    return this.qrcodeAppService.total;
  }

  get page() {
    return this.qrcodeAppService.page;
  }

  get pageSize() {
    return this.qrcodeAppService.pageSize;
  }

  normalizeProductCode(value: string): string {
    const raw = (value || '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()
      .slice(0, 30);
    const chunks = raw.match(/.{1,5}/g) ?? [];
    return chunks.join('-');
  }

  onProductCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatted = this.normalizeProductCode(input.value);
    this.form.controls.productCode.setValue(formatted, { emitEvent: false });
  }

  loadData(page: number = this.page(), pageSize: number = this.pageSize()): void {
    this.loading.set(true);

    this.qrcodeAppService
      .search({
        page,
        pageSize,
        keyword: '',
        productCode: '',
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        error: () => this.message.error('โหลดข้อมูลไม่สำเร็จ'),
      });
  }

  onAdd(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.message.warning('กรุณากรอกรหัสสินค้าให้ถูกต้อง');
      return;
    }

    const productCode = this.form.controls.productCode.value ?? '';

    this.loading.set(true);
    this.qrcodeAppService
      .create({ productCode })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.message.error(response.message || 'เพิ่มข้อมูลไม่สำเร็จ');
            return;
          }

          this.message.success('เพิ่มข้อมูลสำเร็จ');
          this.form.reset({ productCode: '' });
          this.loadData(1, this.pageSize());
        },
        error: () => this.message.error('เกิดข้อผิดพลาดจากระบบ'),
      });
  }

  onView(item: QrcodeModel): void {
    this.loading.set(true);
    this.qrcodeAppService
      .generate(item.id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.message.error(response.message || 'ไม่สามารถแสดง QR Code ได้');
            return;
          }

          this.modalVisible.set(true);
        },
        error: () => this.message.error('เกิดข้อผิดพลาดจากระบบ'),
      });
  }

  onDelete(item: QrcodeModel): void {
    this.loading.set(true);

    this.qrcodeAppService
      .delete({ id: item.id })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.message.error(response.message || 'ลบข้อมูลไม่สำเร็จ');
            return;
          }

          this.message.success('ลบข้อมูลสำเร็จ');
          this.loadData();
        },
        error: () => this.message.error('เกิดข้อผิดพลาดจากระบบ'),
      });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    this.loadData(pageIndex, pageSize);
  }

  closeModal(): void {
    this.modalVisible.set(false);
    this.qrcodeAppService.clearSelectedQr();
  }
}
