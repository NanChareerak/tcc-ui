
import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

import { QueueAppService } from '../../../core/service/app/queue.app-service';

@Component({
  selector: 'app-queue-ticket',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule, DatePipe],
  templateUrl: './queue-ticket.html',
  styleUrl: './queue-ticket.scss',
})
export class QueueTicketComponent {
  private router = inject(Router);
  private queueAppService = inject(QueueAppService);

  latestTicket = this.queueAppService.latestTicket;

  queueNo = computed(() => this.latestTicket()?.queueNo ?? '--');
  issuedAt = computed(() => this.latestTicket()?.issuedAt ?? null);

  goHome(): void {
    this.router.navigate(['/it05-queue']);
  }

  goCurrent(): void {
    this.router.navigate(['/it05-queue/current']);
  }
}
