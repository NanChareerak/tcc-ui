import { ApiResponse } from './common-model';

export interface ExamQuestionModel {
  id: number;
  questionNo: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

export interface ExamQuestionListResponse {
  datas: ExamQuestionModel[];
  success: boolean;
  message?: string;
}

export interface ExamSubmitAnswerRequest {
  questionId: number;
  selectedAnswerNo: number;
}

export interface ExamSubmitRequest {
  fullName: string;
  answers: ExamSubmitAnswerRequest[];
}

export interface ExamResultModel {
  examId: number;
  fullName: string;
  score: number;
  total: number;
}

export type ExamResultResponse = ApiResponse<ExamResultModel>;