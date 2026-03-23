import { ApiListResponse, ApiResponse } from './common-model';

export interface QuizModel {
  id: number;
  questionNo: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswerNo?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface QuizCreateRequest {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswerNo?: number;
}

export interface QuizDeleteRequest {
  id: number;
}

export type QuizListResponse = ApiListResponse<QuizModel>;
export type QuizResponse = ApiResponse<QuizModel>;
export type QuizDeleteResponse = ApiResponse<boolean>;