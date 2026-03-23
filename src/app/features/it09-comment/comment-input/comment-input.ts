import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

import { CommentAppService } from '../../../core/service/app/comment.app-service';
import { CommentCreateRequest } from '../../../core/models/comment-model';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzAvatarModule,
    NzInputModule
  ],
  templateUrl: './comment-input.html',
  styleUrl: './comment-input.scss',
})

export class CommentInputComponent {
  private readonly fb = inject(FormBuilder);
  private readonly message = inject(NzMessageService);
  private readonly commentAppService = inject(CommentAppService);

  @Input({ required: true }) postId!: number;
  @Input() authorName = 'Blend 285';
  @Output() submitted = new EventEmitter<void>();

  readonly saving = signal(false);

  readonly form = this.fb.group({
    message: ['', [Validators.required, Validators.maxLength(500)]]
  });

  get authorInitial(): string {
    return (this.authorName || 'B').trim().charAt(0).toUpperCase();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || event.shiftKey) {
      return;
    }

    event.preventDefault();
    this.submit();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: CommentCreateRequest = {
      postId: this.postId,
      authorName: this.authorName,
      message: (this.form.controls.message.value ?? '').trim()
    };

    if (!payload.message) {
      return;
    }

    this.saving.set(true);

    this.commentAppService.create(payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.message.error(response.message || 'เพิ่มความคิดเห็นไม่สำเร็จ');
            return;
          }

          this.commentAppService.appendComment(response.data);
          this.form.reset({ message: '' });
          this.submitted.emit();
        },
        error: () => this.message.error('เกิดข้อผิดพลาดจากระบบ')
      });
  }
}
