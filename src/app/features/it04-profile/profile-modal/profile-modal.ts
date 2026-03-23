import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { ProfileAppService } from '../../../core/service/app/profile-app.service';
import { OccupationItem } from '../../../core/models/occupation-model';
import {
  CreateProfileRequest,
  ProfileItem,
  UpdateProfileRequest
} from '../../../core/models/profile-model';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    NzRadioModule
  ],
  templateUrl: './profile-modal.html',
  styleUrl: './profile-modal.scss'
})
export class ProfileModal implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly profileAppService = inject(ProfileAppService);
  private readonly message = inject(NzMessageService);
  private readonly modalRef = inject(NzModalRef);

  profileId?: number;
  mode: 'create' | 'edit' = 'create';

  occupations: OccupationItem[] = [];
  saving = false;
  selectedFileName = '';

  readonly form = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(150)]],
    lastName: ['', [Validators.required, Validators.maxLength(150)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9\-+]{9,15}$/)]],
    birthDate: ['', [Validators.required]],
    profileBase64: ['', [Validators.required]],
    occupationId: [null as number | null, [Validators.required]],
    sex: ['M' as 'M' | 'F', [Validators.required]],
    address: ['']
  });

  ngOnInit(): void {
    this.loadOccupations();
  }

  initEditData(data: ProfileItem): void {
    this.mode = 'edit';
    this.profileId = data.id;
    this.selectedFileName = 'selected profile';

    this.form.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      birthDate: data.birthDate,
      profileBase64: data.profileBase64,
      occupationId: data.occupationId,
      sex: data.sex,
      address: data.address ?? ''
    });
  }

  loadOccupations(): void {
    this.profileAppService.getOccupations().subscribe({
      next: (items) => {
        this.occupations = items;
      },
      error: () => {
        this.message.error('ไม่สามารถโหลดข้อมูล Occupation ได้');
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.form.patchValue({
        profileBase64: String(reader.result)
      });
      this.form.get('profileBase64')?.markAsTouched();
      this.form.get('profileBase64')?.updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  }

  save(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.saving = true;

    if (this.mode === 'edit' && this.profileId) {
      const payload: UpdateProfileRequest = {
        id: this.profileId,
        firstName: this.form.controls.firstName.value ?? '',
        lastName: this.form.controls.lastName.value ?? '',
        email: this.form.controls.email.value ?? '',
        phone: this.form.controls.phone.value ?? '',
        birthDate: this.normalizeDate(this.form.controls.birthDate.value),
        profileBase64: this.form.controls.profileBase64.value ?? '',
        occupationId: this.form.controls.occupationId.value ?? 0,
        sex: (this.form.controls.sex.value ?? 'M') as 'M' | 'F',
        address: this.form.controls.address.value ?? ''
      };

      this.profileAppService.update(payload).subscribe({
        next: (response) => {
          this.saving = false;
          this.message.success(`save data success id : ${response.id}`);
          this.modalRef.close(true);
        },
        error: () => {
          this.saving = false;
          this.message.error('ไม่สามารถบันทึกข้อมูลได้');
        }
      });

      return;
    }

    const payload: CreateProfileRequest = {
      firstName: this.form.controls.firstName.value ?? '',
      lastName: this.form.controls.lastName.value ?? '',
      email: this.form.controls.email.value ?? '',
      phone: this.form.controls.phone.value ?? '',
      birthDate: this.normalizeDate(this.form.controls.birthDate.value),
      profileBase64: this.form.controls.profileBase64.value ?? '',
      occupationId: this.form.controls.occupationId.value ?? 0,
      sex: (this.form.controls.sex.value ?? 'M') as 'M' | 'F',
      address: this.form.controls.address.value ?? ''
    };

    this.profileAppService.create(payload).subscribe({
      next: (response) => {
        this.saving = false;
        this.message.success(`save data success id : ${response.id}`);
        this.clear();
        this.modalRef.close(true);
      },
      error: () => {
        this.saving = false;
        this.message.error('ไม่สามารถบันทึกข้อมูลได้');
      }
    });
  }

  clear(): void {
    this.form.reset({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      profileBase64: '',
      occupationId: null,
      sex: 'M',
      address: ''
    });

    this.selectedFileName = '';
  }

  cancel(): void {
    this.modalRef.close(false);
  }

  private normalizeDate(value: unknown): string {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    if (value instanceof Date) {
      return value.toISOString().slice(0, 10);
    }

    const unknownValue = value as {
      format?: (format: string) => string;
      toDate?: () => Date;
    };

    if (typeof unknownValue.format === 'function') {
      return unknownValue.format('YYYY-MM-DD');
    }

    if (typeof unknownValue.toDate === 'function') {
      return unknownValue.toDate().toISOString().slice(0, 10);
    }

    return String(value);
  }
}