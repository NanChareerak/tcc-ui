import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ProfileItem } from '../../../core/models/profile-model';
import { ProfileList } from '../profile-list/profile-list';
import { ProfileModal } from '../profile-modal/profile-modal';

@Component({
  selector: 'app-profile-home',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    ProfileList
  ],
  templateUrl: './profile-home.html',
  styleUrl: './profile-home.scss'
})
export class ProfileHome {
  private readonly modal = inject(NzModalService);
  private readonly message = inject(NzMessageService);

  @ViewChild(ProfileList) profileListComponent?: ProfileList;

  openCreateModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'เพิ่มข้อมูลโปรไฟล์',
      nzContent: ProfileModal,
      nzFooter: null,
      nzWidth: 900,
      nzCentered: true
    });

    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.message.success('บันทึกข้อมูลสำเร็จ');
        this.profileListComponent?.ngOnInit();
      }
    });
  }

  openEditModal(item: ProfileItem): void {
    const modalRef = this.modal.create({
      nzTitle: 'แก้ไขข้อมูลโปรไฟล์',
      nzContent: ProfileModal,
      nzFooter: null,
      nzWidth: 900,
      nzCentered: true
    });

    const componentInstance = modalRef.getContentComponent();
    componentInstance?.initEditData(item);

    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.message.success('อัปเดตข้อมูลสำเร็จ');
        this.profileListComponent?.ngOnInit();
      }
    });
  }
}