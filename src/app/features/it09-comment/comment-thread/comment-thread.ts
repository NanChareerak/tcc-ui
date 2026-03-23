
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

import { CommentAppService } from '../../../core/service/app/comment.app-service';
import { CommentInputComponent } from '../comment-input/comment-input';


@Component({
  selector: 'app-comment-thread',
  standalone: true,
  imports: [
    CommonModule,
    NzAvatarModule,
    CommentInputComponent
  ],
  templateUrl: './comment-thread.html',
  styleUrl: './comment-thread.scss',
})
export class CommentThreadComponent implements OnInit {
  private readonly message = inject(NzMessageService);
  protected readonly commentAppService = inject(CommentAppService);

  readonly loading = signal(false);
  readonly postId = 1;

  get post() {
    return this.commentAppService.post;
  }

  get comments() {
    return this.commentAppService.comments;
  }

  ngOnInit(): void {
    this.loadThread();
  }

  loadThread(): void {
    this.loading.set(true);

    this.commentAppService.getThread(this.postId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        error: () => this.message.error('โหลดข้อมูลไม่สำเร็จ')
      });
  }

  handleSubmitted(): void {
    // ไม่ต้อง reload ทั้งหน้า ถ้า backend ส่ง comment ตัวใหม่กลับมาแล้ว append ใน input component
  }
}
