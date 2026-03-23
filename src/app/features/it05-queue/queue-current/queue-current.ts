
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';

import { QueueAppService } from '../../../core/service/app/queue.app-service';

@Component({
  selector: 'app-queue-current',
  standalone: true,
  imports: [NzCardModule, NzButtonModule],
  templateUrl: './queue-current.html',
  styleUrl: './queue-current.scss',
})
export class QueueCurrentComponent implements OnInit {
  private router = inject(Router);
  private message = inject(NzMessageService);
  private queueAppService = inject(QueueAppService);

  loading = signal(false);
  currentQueue = this.queueAppService.currentQueue;

  ngOnInit(): void {
    this.loadCurrentQueue();
  }

  loadCurrentQueue(): void {
    this.queueAppService.getCurrentQueue().subscribe({
      next: (response) => {
        if (!response.success) {
          this.message.error(response.message || 'โหลดคิวปัจจุบันไม่สำเร็จ');
        }
      },
      error: () => {
        this.message.error('เกิดข้อผิดพลาดจากระบบ');
      }
    });
  }

  onNextQueue(): void {
    this.loading.set(true);

    this.queueAppService.nextQueue().subscribe({
      next: (response) => {
        this.loading.set(false);

        if (!response.success) {
          this.message.error(response.message || 'ไม่สามารถเรียกคิวถัดไปได้');
          return;
        }

        this.message.success(`คิวปัจจุบัน ${response.data.currentQueueNo}`);
      },
      error: () => {
        this.loading.set(false);
        this.message.error('เกิดข้อผิดพลาดจากระบบ');
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/it05-queue']);
  }
}
