import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { finalize } from 'rxjs';

import { QuizAppService } from '../../../core/service/app/quiz.app-service';
import { QuizModel } from '../../../core/models/quiz-model';
import { QuizFormComponent } from '../quiz-form/quiz-form';


@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzPopconfirmModule,
    QuizFormComponent
  ],
  templateUrl: './quiz-list.html',
  styleUrl: './quiz-list.scss'
})
export class QuizListComponent implements OnInit {
  private readonly message = inject(NzMessageService);
  protected readonly quizAppService = inject(QuizAppService);

  readonly loading = signal(false);
  readonly formVisible = signal(false);

  ngOnInit(): void {
    this.loadData();
  }

  get items() {
    return this.quizAppService.items;
  }

  loadData(): void {
    this.loading.set(true);

    this.quizAppService.getAll()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        error: () => this.message.error('โหลดข้อมูลไม่สำเร็จ')
      });
  }

  openForm(): void {
    this.formVisible.set(true);
  }

  closeForm(): void {
    this.formVisible.set(false);
  }

  handleSaved(): void {
    this.formVisible.set(false);
    this.loadData();
  }

  onDelete(item: QuizModel): void {
    this.loading.set(true);

    this.quizAppService.delete(item.id)
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
        error: () => this.message.error('เกิดข้อผิดพลาดจากระบบ')
      });
  }
}