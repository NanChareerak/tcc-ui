import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

import {
  CreatePersonRequest,
  PersonModel,
  UpdatePersonRequest
} from '../../../core/models/person-model';

type ModalMode = 'create' | 'view' | 'edit';

interface PersonFormData {
  id?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-person-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzModalModule,
    NzButtonModule
  ],
  templateUrl: './person-modal.html',
  styleUrl: './person-modal.scss'
})
export class PersonModalComponent implements OnChanges {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() mode: ModalMode = 'create';
  @Input() data: PersonModel | null = null;

  @Output() save = new EventEmitter<CreatePersonRequest | UpdatePersonRequest>();

  formData: PersonFormData = this.createEmptyForm();

  get isViewMode(): boolean {
    return this.mode === 'view';
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['mode'] || changes['visible']) {
      this.bindFormData();
    }
  }

  onBirthDateChange(): void {
    this.formData.age = this.calculateAge(this.formData.dateOfBirth);
  }

  onSave(): void {
    const firstName = this.formData.firstName.trim();
    const lastName = this.formData.lastName.trim();
    const address = this.formData.address.trim();
    const dateOfBirth = this.formData.dateOfBirth;

    if (!firstName || !lastName || !dateOfBirth) {
      return;
    }

    if (this.mode === 'edit' && this.formData.id) {
      const payload: UpdatePersonRequest = {
        id: this.formData.id,
        firstName,
        lastName,
        dateOfBirth,
        address
      };

      this.save.emit(payload);
      return;
    }

    const payload: CreatePersonRequest = {
      firstName,
      lastName,
      dateOfBirth,
      address
    };

    this.save.emit(payload);
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  private bindFormData(): void {
    if (!this.visible) {
      return;
    }

    if (!this.data || this.mode === 'create') {
      this.formData = this.createEmptyForm();
      return;
    }

    this.formData = {
      id: this.data.id,
      firstName: this.data.firstName ?? '',
      lastName: this.data.lastName ?? '',
      dateOfBirth: this.data.dateOfBirth ?? '',
      age: this.data.age ?? 0,
      address: this.data.address ?? ''
    };
  }

  private createEmptyForm(): PersonFormData {
    return {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      age: 0,
      address: ''
    };
  }

  private calculateAge(dateOfBirth: string): number {
    if (!dateOfBirth) {
      return 0;
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 0 ? age : 0;
  }
}