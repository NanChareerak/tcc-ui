import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';

import { ProfileAppService } from '../../../core/service/app/profile-app.service';
import { ProfileItem, ProfileSearchRequest } from '../../../core/models/profile-model';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzPopconfirmModule,
    NzEmptyModule,
    NzPaginationModule
  ],
  templateUrl: './profile-list.html',
  styleUrl: './profile-list.scss'
})
export class ProfileList implements OnInit {
  private readonly profileAppService = inject(ProfileAppService);
  private readonly message = inject(NzMessageService);

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<ProfileItem>();

  keyword = '';
  loading = false;
  items: ProfileItem[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;

  get totalPages(): number {
    return this.total === 0 ? 1 : Math.ceil(this.total / this.pageSize);
  }

  ngOnInit(): void {
    this.loadProfiles();
  }

  onSearch(): void {
    this.pageIndex = 1;
    this.loadProfiles();
  }

  onRefresh(): void {
    this.keyword = '';
    this.pageIndex = 1;
    this.loadProfiles();
  }

  onPageIndexChange(page: number): void {
    this.pageIndex = page;
    this.loadProfiles();
  }

  onAdd(): void {
    this.add.emit();
  }

  onEdit(item: ProfileItem): void {
    this.edit.emit(item);
  }

  onDelete(item: ProfileItem): void {
    this.profileAppService.delete(item.id).subscribe({
      next: () => {
        this.message.success('ลบข้อมูลสำเร็จ');
        this.loadProfiles();
      },
      error: () => {
        this.message.error('ไม่สามารถลบข้อมูลได้');
      }
    });
  }

  private loadProfiles(): void {
    const request: ProfileSearchRequest = {
      page: this.pageIndex,
      pageSize: this.pageSize,
      skip: (this.pageIndex - 1) * this.pageSize,
      take: this.pageSize,
      keyword: this.keyword
    };

    this.loading = true;

    this.profileAppService.search(request).subscribe({
      next: (response) => {
        this.items = response.datas;
        this.total = response.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.message.error('ไม่สามารถโหลดข้อมูลได้');
      }
    });
  }
}