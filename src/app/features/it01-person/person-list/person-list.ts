import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';


import { PersonModalComponent } from '../person-modal/person-modal';
import { CreatePersonRequest, PersonModel, UpdatePersonRequest } from '../../../core/models/person-model';
import { PersonAppService } from '../../../core/service/app/person.app-service';
import { AppError } from '../../../core/models/common-model';

type ModalMode = 'create' | 'view' | 'edit';

interface PersonListRequest {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
}

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzPaginationModule,
    PersonModalComponent
  ],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss'
})
export class PersonListComponent implements OnInit {
  persons: PersonModel[] = [];
  total = 0;
  totalPages = 0;
  loading = false;
  errorMessage = '';

  searchKeyword = '';

  request: PersonListRequest = {
    pageIndex: 1,
    pageSize: 10,
    keyword: ''
  };

  modalVisible = false;
  modalMode: ModalMode = 'create';
  modalData: PersonModel | null = null;

  constructor(
    private readonly personAppService: PersonAppService
  ) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.loading = true;
    this.errorMessage = '';

    this.personAppService
      .getPersonList({
        pageIndex: this.request.pageIndex,
        pageSize: this.request.pageSize,
        keyword: this.request.keyword
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.persons = response.datas;
          this.total = response.total;
          this.totalPages = response.totalPages;
        },
        error: (error: AppError) => {
          this.errorMessage = error.message;
          this.persons = [];
          this.total = 0;
          this.totalPages = 0;
        }
      });
  }

  onSearchKeywordChange(): void {
    this.request.keyword = this.searchKeyword.trim();
  }

  onSearch(): void {
    this.request.pageIndex = 1;
    this.request.keyword = this.searchKeyword.trim();
    this.loadPersons();
  }

  onRefresh(): void {
    this.searchKeyword = '';
    this.request = {
      pageIndex: 1,
      pageSize: 10,
      keyword: ''
    };
    this.loadPersons();
  }

  onPageIndexChange(pageIndex: number): void {
    this.request.pageIndex = pageIndex;
    this.loadPersons();
  }

  onPageSizeChange(pageSize: number): void {
    this.request.pageSize = pageSize;
    this.request.pageIndex = 1;
    this.loadPersons();
  }

  onAdd(): void {
    this.modalMode = 'create';
    this.modalData = null;
    this.modalVisible = true;
  }

  onView(item: PersonModel): void {
    this.modalMode = 'view';
    this.personAppService.viewPerson(item.id).subscribe({
      next: (person) => {
        this.modalData = person;
        this.modalVisible = true;
      },
      error: (error: AppError) => {
        this.errorMessage = error.message;
      }
    });
  }

  onSave(payload: CreatePersonRequest | UpdatePersonRequest): void {
    if (this.modalMode === 'create') {
      this.personAppService.createPerson(payload as CreatePersonRequest).subscribe({
        next: () => {
          this.modalVisible = false;
          this.loadPersons();
        },
        error: (error: AppError) => {
          this.errorMessage = error.message;
        }
      });

      return;
    }

    if (this.modalMode === 'edit') {
      this.personAppService.updatePerson(payload as UpdatePersonRequest).subscribe({
        next: () => {
          this.modalVisible = false;
          this.loadPersons();
        },
        error: (error: AppError) => {
          this.errorMessage = error.message;
        }
      });
    }
  }

  getDisplayId(index: number): number {
    return (this.request.pageIndex - 1) * this.request.pageSize + index + 1;
  }

  getFullName(item: PersonModel): string {
    return item.fullName || `${item.firstName} ${item.lastName}`;
  }
}