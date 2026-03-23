import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';

import { ApprovalAppService } from '../../../core/service/app/approval.app-service';
import { ApprovalModel } from '../../../core/models/approval-model';
import { ApprovalActionModalComponent } from '../approval-action-modal/approval-action-modal';


@Component({
  selector: 'app-approval-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzTableModule,
    ApprovalActionModalComponent
  ],
  templateUrl: './approval-list.html',
  styleUrl: './approval-list.scss'
})
export class ApprovalListComponent implements OnInit {
  private readonly message = inject(NzMessageService);
  protected readonly approvalAppService = inject(ApprovalAppService);

  readonly loading = signal(false);

  readonly modalVisible = signal(false);
  readonly modalMode = signal<'approve' | 'reject'>('approve');

  readonly selectedIds = signal<number[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  get items() {
    return this.approvalAppService.items;
  }

  get total() {
    return this.approvalAppService.total;
  }

  get page() {
    return this.approvalAppService.page;
  }

  get pageSize() {
    return this.approvalAppService.pageSize;
  }

  loadData(page: number = this.page(), pageSize: number = this.pageSize()): void {
    this.loading.set(true);

    this.approvalAppService.search({
      page,
      pageSize
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        error: () => this.message.error('โหลดข้อมูลไม่สำเร็จ')
      });
  }

  isPending(item: ApprovalModel): boolean {
    return item.statusCode === 'PENDING' || item.statusName === 'รออนุมัติ';
  }

  isChecked(id: number): boolean {
    return this.selectedIds().includes(id);
  }

  onChecked(id: number, checked: boolean): void {
    if (checked) {
      this.selectedIds.update((ids) => [...ids, id]);
      return;
    }

    this.selectedIds.update((ids) => ids.filter((x) => x !== id));
  }

  onCheckAll(checked: boolean): void {
    if (!checked) {
      this.selectedIds.set([]);
      return;
    }

    const ids = this.items()
      .filter((item) => this.isPending(item))
      .map((item) => item.id);

    this.selectedIds.set(ids);
  }

  canApproveReject(): boolean {
    return this.selectedIds().length > 0;
  }

  openApproveModal(): void {
    if (!this.canApproveReject()) {
      this.message.warning('กรุณาเลือกรายการที่รออนุมัติ');
      return;
    }

    this.modalMode.set('approve');
    this.modalVisible.set(true);
  }

  openRejectModal(): void {
    if (!this.canApproveReject()) {
      this.message.warning('กรุณาเลือกรายการที่รออนุมัติ');
      return;
    }

    this.modalMode.set('reject');
    this.modalVisible.set(true);
  }

  closeModal(): void {
    this.modalVisible.set(false);
  }

  onSubmitAction(reason: string): void {
    if (!reason) {
      return;
    }

    const ids = this.selectedIds();

    this.loading.set(true);

    const request = {
      ids,
      reason
    };

    const action$ = this.modalMode() === 'approve'
      ? this.approvalAppService.approve(request)
      : this.approvalAppService.reject(request);

    action$
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.message.error(response.message || 'ทำรายการไม่สำเร็จ');
            return;
          }

          this.message.success(
            this.modalMode() === 'approve' ? 'อนุมัติสำเร็จ' : 'ไม่อนุมัติสำเร็จ'
          );

          this.modalVisible.set(false);
          this.selectedIds.set([]);
          this.loadData();
        },
        error: () => this.message.error('เกิดข้อผิดพลาดจากระบบ')
      });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    this.loadData(pageIndex, pageSize);
  }

  allPendingChecked(): boolean {
    const pendingIds = this.items()
      .filter((item) => this.isPending(item))
      .map((item) => item.id);

    return pendingIds.length > 0 && pendingIds.every((id) => this.selectedIds().includes(id));
  }
}