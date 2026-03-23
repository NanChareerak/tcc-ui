
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

import { QuizAppService } from '../../../core/service/app/quiz.app-service';
import { QuizCreateRequest } from '../../../core/models/quiz-model';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule
  ],
  templateUrl: './quiz-form.html',
  styleUrl: './quiz-form.scss',
})
export class QuizFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly message = inject(NzMessageService);
  private readonly quizAppService = inject(QuizAppService);

  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  readonly saving = signal(false);

  readonly form = this.fb.group({
    question: ['', [Validators.required, Validators.maxLength(500)]],
    answer1: ['', [Validators.required, Validators.maxLength(255)]],
    answer2: ['', [Validators.required, Validators.maxLength(255)]],
    answer3: ['', [Validators.required, Validators.maxLength(255)]],
    answer4: ['', [Validators.required, Validators.maxLength(255)]]
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: QuizCreateRequest = {
      question: this.form.controls.question.value ?? '',
      answer1: this.form.controls.answer1.value ?? '',
      answer2: this.form.controls.answer2.value ?? '',
      answer3: this.form.controls.answer3.value ?? '',
      answer4: this.form.controls.answer4.value ?? ''
    };

    this.saving.set(true);

    this.quizAppService.create(payload)
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
  }

  onCancel(): void {
    this.closed.emit();
  }
}
