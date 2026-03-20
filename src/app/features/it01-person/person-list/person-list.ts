import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';

import { PaginationRequest } from '../../../core/models/common-model';
import { PersonItem } from '../../../core/models/person-model';
import { PersonService } from '../../../core/service/api/api/person.service';
import { PersonModalComponent, PersonFormModel } from '../person-modal/person-modal';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzPaginationModule,
    PersonModalComponent
  ],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss',
})
export class PersonList implements OnInit {
  searchKeyword = '';

  request: PaginationRequest = {
    page: 1,
    pageSize: 10,
    skip: 0,
    take: 10,
    keyword: '',
  };

  persons: PersonItem[] = [];
  total = 0;
  totalPages = 0;

  modalVisible = false;
  modalMode: 'create' | 'view' = 'create';

  modalData: PersonFormModel = {
    firstName: '',
    lastName: '',
    birthDate: '',
    age: 0,
    address: '',
  };

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.request.skip = (this.request.page - 1) * this.request.pageSize;
    this.request.take = this.request.pageSize;
    this.request.keyword = this.searchKeyword.trim();

    const response = this.personService.getPersons(this.request);

    this.persons = response.datas;
    this.total = response.total;
    this.totalPages = response.totalPages;
  }

  onSearch(): void {
    this.request.page = 1;
    this.loadData();
  }

  onRefresh(): void {
    this.searchKeyword = '';
    this.request.page = 1;
    this.request.pageSize = 10;
    this.loadData();
  }

  onSearchKeywordChange(): void {
    if (!this.searchKeyword.trim()) {
      this.request.page = 1;
      this.loadData();
    }
  }

  onPageIndexChange(page: number): void {
    this.request.page = page;
    this.loadData();
  }

  onPageSizeChange(pageSize: number): void {
    this.request.pageSize = pageSize;
    this.request.page = 1;
    this.loadData();
  }

  getDisplayId(index: number): number {
    return (this.request.page - 1) * this.request.pageSize + index + 1;
  }

  getFullName(item: PersonItem): string {
    return `${item.firstName} ${item.lastName}`;
  }

  onAdd() {
    debugger
    this.modalMode = 'create';
    this.modalData = {
      firstName: '',
      lastName: '',
      birthDate: '',
      age: 0,
      address: '',
    };
    this.modalVisible = true;
  }

  onView(item: any) {
    this.modalMode = 'view';
    this.modalData = { ...item };
    this.modalVisible = true;
  }

  onSave(data: PersonFormModel) {
    console.log('SAVE', data);

    this.persons.push({
      id: this.persons.length + 1,
      ...data,
    });

    // this.loadData();
  }
}
