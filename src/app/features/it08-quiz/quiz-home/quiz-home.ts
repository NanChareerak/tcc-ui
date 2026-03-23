import { Component } from '@angular/core';
import { QuizListComponent } from '../quiz-list/quiz-list';


@Component({
  selector: 'app-quiz-home',
  standalone: true,
  imports: [
    QuizListComponent
  ],
  templateUrl: './quiz-home.html',
  styleUrl: './quiz-home.scss'
})
export class QuizHomeComponent {}