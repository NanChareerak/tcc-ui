

import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';

import { BarcodeAppService } from '../../../core/service/app/barcode.app-service';
import { BarcodeModel } from '../../../core/models/barcode-model';
import { BarcodeModalComponent } from '../barcode-modal/barcode-modal';


@Component({
  selector: 'app-barcode-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzPopconfirmModule,
    NzSpaceModule,
    NzTableModule,
    BarcodeModalComponent
  ],
  templateUrl: './barcode-list.html',
  styleUrl: './barcode-list.scss',
})
export class BarcodeListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);
  protected barcodeAppService = inject(BarcodeAppService);

  @ViewChild('barcodeModalFooter', { static: true })
  barcodeModalFooter!: TemplateRef<void>;

  loading = signal(false);
  modalVisible = signal(false);
  modalMode = signal<'create' | 'edit'>('create');
  editingItem = signal<BarcodeModel | null>(null);

  searchForm = this.fb.group({
    keyword: ['']
  });

  ngOnInit(): void {
    this.loadData();
  }

  get items() {
    return this.barcodeAppService.items;
  }

  get total() {
    return this.barcodeAppService.total;
  }

  get page() {
    return this.barcodeAppService.page;
  }

  get pageSize() {
    return this.barcodeAppService.pageSize;
  }

  loadData(page: number = this.page(), pageSize: number = this.pageSize()): void {
    this.loading.set(true);

    this.barcodeAppService.search({
      page,
      pageSize,
      keyword: this.searchForm.controls.keyword.value ?? ''
    })
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      error: () => this.message.error('โหลดข้อมูลไม่สำเร็จ')
    });
  }

  onSearch(): void {
    this.loadData(1, this.pageSize());
  }

  onRefresh(): void {
    this.searchForm.reset({
      keyword: ''
    });
    this.loadData(1, this.pageSize());
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.loadData(pageIndex, pageSize);
  }

  openCreateModal(): void {
    this.modalMode.set('create');
    this.editingItem.set(null);
    this.modalVisible.set(true);
  }

  openEditModal(item: BarcodeModel): void {
    this.modalMode.set('edit');
    this.editingItem.set(item);
    this.modalVisible.set(true);
  }

  closeModal(): void {
    this.modalVisible.set(false);
  }

  handleSaved(): void {
    this.modalVisible.set(false);
    this.loadData();
  }

  deleteItem(item: BarcodeModel): void {
    this.loading.set(true);

    this.barcodeAppService.delete(item.id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.message.error(response.message || 'ลบข้อมูลไม่สำเร็จ');
            return;
          }

          this.message.success('ลบข้อมูลสำเร็จ');
          this.loadData();
        },
        error: () => this.message.error('เกิดข้อผิดพลาดจากระบบ')
      });
  }
}
