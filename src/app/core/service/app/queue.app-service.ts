import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

import { QueueApiService } from '../api/queue.api-service';
import {
  QueueCurrentModel,
  QueueNextModel,
  QueueTicketModel
} from '../../models/queue-model';

@Injectable({
  providedIn: 'root'
})

export class QueueAppService {
  private queueApiService = inject(QueueApiService);

  latestTicket = signal<QueueTicketModel | null>(null);
  currentQueue = signal<QueueCurrentModel | QueueNextModel | null>(null);

  issueQueue(prefix: string = 'A') {
    return this.queueApiService.issueQueue({ prefix }).pipe(
      tap((response) => {
        if (response.success) {
          this.latestTicket.set(response.data);
        }
      })
    );
  }

  getCurrentQueue() {
    return this.queueApiService.getCurrentQueue().pipe(
      tap((response) => {
        if (response.success) {
          this.currentQueue.set(response.data);
        }
      })
    );
  }

  nextQueue() {
    return this.queueApiService.nextQueue().pipe(
      tap((response) => {
        if (response.success) {
          this.currentQueue.set(response.data);
        }
      })
    );
  }

  resetQueue() {
    return this.queueApiService.resetQueue().pipe(
      tap((response) => {
        if (response.success) {
          this.currentQueue.set(response.data);
        }
      })
    );
  }

  clearState(): void {
    this.latestTicket.set(null);
    this.currentQueue.set(null);
  }
}