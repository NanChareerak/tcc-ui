import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { finalize } from 'rxjs';

import { ExamAppService } from '../../../core/service/app/exam.app-service';
import { ExamSubmitRequest } from '../../../core/models/exam-model';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzRadioModule
  ],
  templateUrl: './exam-form.html',
  styleUrl: './exam-form.scss'
})
export class ExamFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly message = inject(NzMessageService);
  protected readonly examAppService = inject(ExamAppService);

  readonly loading = signal(false);

  readonly form = this.fb.group({
    fullName: ['', [Validators.required, Validators.maxLength(255)]]
  });

  readonly answers = signal<Record<number, number>>({});

  get questions() {
    return this.examAppService.questions;
  }

  get result() {
    return this.examAppService.result;
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.loading.set(true);

    this.examAppService.getQuestions()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        error: () => this.message.error('โหลดข้อสอบไม่สำเร็จ')
      });
  }

  onSelectAnswer(questionId: number, answerNo: number): void {
    this.answers.update((current) => ({
      ...current,
      [questionId]: answerNo
    }));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const questions = this.questions();
    const answersMap = this.answers();

    const unanswered = questions.some((item) => !answersMap[item.id]);
    if (unanswered) {
      this.message.warning('กรุณาตอบคำถามให้ครบทุกข้อ');
      return;
    }

    const payload: ExamSubmitRequest = {
      fullName: this.form.controls.fullName.value ?? '',
      answers: questions.map((item) => ({
        questionId: item.id,
        selectedAnswerNo: answersMap[item.id]
      }))
    };

    this.loading.set(true);

    this.examAppService.submit(payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.message.error(response.message || 'ส่งคำตอบไม่สำเร็จ');
          }
        },
        error: () => this.message.error('เกิดข้อผิดพลาดจากระบบ')
      });
  }

  resetLocalForm(): void {
    this.form.reset({ fullName: '' });
    this.answers.set({});
  }
}