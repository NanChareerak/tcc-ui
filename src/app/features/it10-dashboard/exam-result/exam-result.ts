import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ExamAppService } from '../../../core/service/app/exam.app-service';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [CommonModule, NzButtonModule],
  templateUrl: './exam-result.html',
  styleUrl: './exam-result.scss'
})

export class ExamResultComponent {
  protected readonly examAppService = inject(ExamAppService);

  get result() {
    return this.examAppService.result;
  }

  retry(): void {
    this.examAppService.clearResult();
  }
}