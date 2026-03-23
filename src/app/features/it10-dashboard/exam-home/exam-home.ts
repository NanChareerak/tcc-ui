import { Component } from '@angular/core';
import { ExamFormComponent } from '../exam-form/exam-form';
import { ExamResultComponent } from '../exam-result/exam-result';


@Component({
  selector: 'app-exam-home',
  standalone: true,
  imports: [
    ExamFormComponent, 
    ExamResultComponent],
  templateUrl: './exam-home.html',
  styleUrl: './exam-home.scss'
})
export class ExamHomeComponent {}