import { ApiListResponse, ApiResponse } from './common-model';

export interface CommentPostModel {
  id: number;
  authorName: string;
  authorInitial: string;
  postedAt: string;
  imageUrl: string;
  caption?: string;
}

export interface CommentItemModel {
  id: number;
  postId: number;
  authorName: string;
  authorInitial: string;
  message: string;
  createdAt: string;
}

export interface CommentThreadResponse {
  post: CommentPostModel;
  comments: CommentItemModel[];
}

export interface CommentCreateRequest {
  postId: number;
  authorName: string;
  message: string;
}

export type CommentThreadApiResponse = ApiResponse<CommentThreadResponse>;
export type CommentCreateApiResponse = ApiResponse<CommentItemModel>;
export type CommentListResponse = ApiListResponse<CommentItemModel>;