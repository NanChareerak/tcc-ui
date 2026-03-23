
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';

import { QueueAppService } from '../../../core/service/app/queue.app-service';

@Component({
  selector: 'app-queue-home',
  standalone: true,
  imports: [NzCardModule, NzButtonModule],
  templateUrl: './queue-home.html',
  styleUrl: './queue-home.scss',
})

export class QueueHomeComponent {
  private router = inject(Router);
  private message = inject(NzMessageService);
  private queueAppService = inject(QueueAppService);

  loading = signal(false);

  onIssueQueue(): void {
    this.loading.set(true);

    this.queueAppService.issueQueue('A').subscribe({
      next: (response) => {
        this.loading.set(false);

        if (!response.success) {
          this.message.error(response.message || 'ไม่สามารถรับบัตรคิวได้');
          return;
        }

        this.message.success(`รับบัตรคิวสำเร็จ ${response.data.queueNo}`);
        this.router.navigate(['/it05-queue/ticket']);
      },
      error: () => {
        this.loading.set(false);
        this.message.error('เกิดข้อผิดพลาดจากระบบ');
      }
    });
  }
}