import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

import { CommentApiService } from '../api/comment.api-service';
import {
  CommentCreateRequest,
  CommentItemModel,
  CommentPostModel
} from '../../models/comment-model';

@Injectable({
  providedIn: 'root',
})
export class CommentAppService {
  private readonly commentApiService = inject(CommentApiService);

  readonly post = signal<CommentPostModel | null>(null);
  readonly comments = signal<CommentItemModel[]>([]);

  getThread(postId: number) {
    return this.commentApiService.getThread(postId).pipe(
      tap((response) => {
        this.post.set(response.data.post);
        this.comments.set(response.data.comments ?? []);
      })
    );
  }

  create(request: CommentCreateRequest) {
    return this.commentApiService.create(request);
  }

  appendComment(comment: CommentItemModel): void {
    this.comments.update((items) => [...items, comment]);
  }
}