import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

export type PersonModalMode = 'create' | 'view';

export interface PersonFormModel {
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-person-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NzModalModule, NzButtonModule],
  templateUrl: './person-modal.html',
  styleUrl: './person-modal.scss',
})
export class PersonModalComponent {
  @Input() visible = false;
  @Input() mode: PersonModalMode = 'create';
  @Input() data: PersonFormModel = this.createEmpty();

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<PersonFormModel>();

  createEmpty(): PersonFormModel {
    return {
      firstName: '',
      lastName: '',
      birthDate: '',
      age: 0,
      address: '',
    };
  }

  get isViewMode(): boolean {
    return this.mode === 'view';
  }

  onBirthDateChange(): void {
    this.data.age = this.calculateAge(this.data.birthDate);
  }

  calculateAge(date: string): number {
    if (!date) return 0;

    const today = new Date();
    const birth = new Date(date);

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age < 0 ? 0 : age;
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onSave(): void {
    this.save.emit(this.data);
    this.close();
  }
}
