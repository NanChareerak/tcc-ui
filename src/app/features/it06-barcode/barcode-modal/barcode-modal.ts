
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
  signal
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { finalize } from 'rxjs';

import {
  BarcodeCreateRequest,
  BarcodeModel,
  BarcodeUpdateRequest
} from '../../../core/models/barcode-model';
import { BarcodeAppService } from '../../../core/service/app/barcode.app-service';


@Component({
  selector: 'app-barcode-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzSwitchModule
  ],
  templateUrl: './barcode-modal.html',
  styleUrl: './barcode-modal.scss',
})
export class BarcodeModalComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private message = inject(NzMessageService);
  private barcodeAppService = inject(BarcodeAppService);

  @Input() visible = false;
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() item: BarcodeModel | null = null;

  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  saving = signal(false);

  form = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(100)]],
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.maxLength(500)]],
    imageUrl: ['', [Validators.maxLength(500)]],
    isActive: [true, [Validators.required]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.patchForm();
    }
  }

  patchForm(): void {
    if (this.mode === 'edit' && this.item) {
      this.form.patchValue({
        code: this.item.code,
        name: this.item.name,
        description: this.item.description ?? '',
        imageUrl: this.item.imageUrl ?? '',
        isActive: this.item.isActive
      });
      return;
    }

    this.form.reset({
      code: '',
      name: '',
      description: '',
      imageUrl: '',
      isActive: true
    });
  }

  handleCancel(): void {
    this.closed.emit();
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    if (this.mode === 'create') {
      const payload: BarcodeCreateRequest = {
        code: this.form.controls.code.value ?? '',
        name: this.form.controls.name.value ?? '',
        description: this.form.controls.description.value ?? '',
        imageUrl: this.form.controls.imageUrl.value ?? '',
        isActive: this.form.controls.isActive.value ?? true
      };

      this.barcodeAppService.create(payload)
        .pipe(finalize(() => this.saving.set(false)))
        .subscribe({
          next: (response) => {
            if (!response.success) {
              this.message.error(response.message || 'บันทึกข้อมูลไม่สำเร็จ');
              return;
            }

            this.message.success('บันทึกข้อมูลสำเร็จ');
            this.saved.emit();
          },
          error: () => this.message.error('เกิดข้อผิดพลาดจากระบบ')
        });

      return;
    }

    const payload: BarcodeUpdateRequest = {
      id: this.item?.id ?? 0,
      code: this.form.controls.code.value ?? '',
      name: this.form.controls.name.value ?? '',
      description: this.form.controls.description.value ?? '',
      imageUrl: this.form.controls.imageUrl.value ?? '',
      isActive: this.form.controls.isActive.value ?? true
    };

    this.barcodeAppService.update(payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.message.error(response.message || 'แก้ไขข้อมูลไม่สำเร็จ');
            return;
          }

          this.message.success('แก้ไขข้อมูลสำเร็จ');
          this.saved.emit();
        },
        error: () => this.message.error('เกิดข้อผิดพลาดจากระบบ')
      });
  }
}
