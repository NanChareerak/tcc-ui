import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
  inject,
  signal
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-approval-action-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzModalModule
  ],
  templateUrl: './approval-action-modal.html',
  styleUrl: './approval-action-modal.scss'
})
export class ApprovalActionModalComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() visible = false;
  @Input() mode: 'approve' | 'reject' = 'approve';

  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<string>();

  readonly saving = signal(false);

  readonly form = this.fb.group({
    reason: ['', [Validators.required, Validators.maxLength(500)]]
  });

  get title(): string {
    return this.mode === 'approve' ? 'ยืนยันการอนุมัติ' : 'ยืนยันการไม่อนุมัติ';
  }

  get submitText(): string {
    return this.mode === 'approve' ? 'อนุมัติ' : 'ไม่อนุมัติ';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']?.currentValue) {
      this.form.reset({ reason: '' });
      this.saving.set(false);
    }
  }

  onCancel(): void {
    this.closed.emit();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit((this.form.controls.reason.value ?? '').trim());
  }
}