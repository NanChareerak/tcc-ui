import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ExamApiService } from '../api/exam.api-service';
import {
  ExamQuestionModel,
  ExamResultModel,
  ExamSubmitRequest
} from '../../models/exam-model';

@Injectable({
  providedIn: 'root',
})
export class ExamAppService {
  private readonly examApiService = inject(ExamApiService);

  readonly questions = signal<ExamQuestionModel[]>([]);
  readonly result = signal<ExamResultModel | null>(null);

  getQuestions() {
    return this.examApiService.getQuestions().pipe(
      tap((response) => {
        this.questions.set(response.datas ?? []);
      })
    );
  }

  submit(request: ExamSubmitRequest) {
    return this.examApiService.submit(request).pipe(
      tap((response) => {
        this.result.set(response.data);
      })
    );
  }

  clearResult(): void {
    this.result.set(null);
  }
}