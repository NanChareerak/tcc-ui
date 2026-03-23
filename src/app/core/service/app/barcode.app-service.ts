import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

import { BarcodeApiService } from '../api/barcode.api-service';
import {
  BarcodeCreateRequest,
  BarcodeModel,
  BarcodeSearchRequest,
  BarcodeUpdateRequest
} from '../../models/barcode-model';

@Injectable({
  providedIn: 'root'
})
export class BarcodeAppService {
  private barcodeApiService = inject(BarcodeApiService);

  items = signal<BarcodeModel[]>([]);
  total = signal(0);
  page = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  selectedItem = signal<BarcodeModel | null>(null);

  search(request?: Partial<BarcodeSearchRequest>) {
    const payload: BarcodeSearchRequest = {
      page: request?.page ?? this.page(),
      pageSize: request?.pageSize ?? this.pageSize(),
      skip: ((request?.page ?? this.page()) - 1) * (request?.pageSize ?? this.pageSize()),
      take: request?.pageSize ?? this.pageSize(),
      keyword: request?.keyword ?? '',
      code: request?.code ?? '',
      name: request?.name ?? '',
      isActive: request?.isActive ?? null
    };

    return this.barcodeApiService.search(payload).pipe(
      tap((response) => {
        if (response.success) {
          this.items.set(response.datas ?? []);
          this.total.set(response.total ?? 0);
          this.page.set(response.page ?? payload.page);
          this.pageSize.set(response.pageSize ?? payload.pageSize);
          this.totalPages.set(response.totalPages ?? 0);
        }
      })
    );
  }

  getById(id: number) {
    return this.barcodeApiService.getById(id).pipe(
      tap((response) => {
        if (response.success) {
          this.selectedItem.set(response.data);
        }
      })
    );
  }

  create(request: BarcodeCreateRequest) {
    return this.barcodeApiService.create(request);
  }

  update(request: BarcodeUpdateRequest) {
    return this.barcodeApiService.update(request);
  }

  delete(id: number) {
    return this.barcodeApiService.delete({ id });
  }

  setSelectedItem(item: BarcodeModel | null): void {
    this.selectedItem.set(item);
  }

  clearSelectedItem(): void {
    this.selectedItem.set(null);
  }
}