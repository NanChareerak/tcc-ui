import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

import { QuizApiService } from '../api/quiz.api-service';
import { QuizCreateRequest, QuizModel } from '../../models/quiz-model';

@Injectable({
  providedIn: 'root',
})
export class QuizAppService {
  private readonly quizApiService = inject(QuizApiService);

  readonly items = signal<QuizModel[]>([]);

  getAll() {
    return this.quizApiService.getAll().pipe(
      tap((response) => {
        this.items.set(response.datas ?? []);
      })
    );
  }

  create(request: QuizCreateRequest) {
    return this.quizApiService.create(request);
  }

  delete(id: number) {
    return this.quizApiService.delete(id);
  }
}