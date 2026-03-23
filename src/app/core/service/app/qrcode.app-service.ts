import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

import { QrcodeApiService } from '../api/qrcode.api-service';
import {
  QrcodeCreateRequest,
  QrcodeGenerateResponse,
  QrcodeModel,
  QrcodeSearchRequest ,
  QrcodeDeleteRequest
} from '../../models/qrcode-model';

@Injectable({
  providedIn: 'root',
})
export class QrcodeAppService {
  private readonly qrcodeApiService = inject(QrcodeApiService);

  readonly items = signal<QrcodeModel[]>([]);
  readonly total = signal(0);
  readonly page = signal(1);
  readonly pageSize = signal(10);
  readonly totalPages = signal(0);
  readonly selectedQr = signal<QrcodeGenerateResponse | null>(null);

  search(request: Partial<QrcodeSearchRequest> = {}) {
    const page = request.page ?? this.page();
    const pageSize = request.pageSize ?? this.pageSize();

    const payload: QrcodeSearchRequest = {
      page,
      pageSize,
      skip: (page - 1) * pageSize,
      take: pageSize,
      keyword: request.keyword ?? '',
      productCode: request.productCode ?? '',
    };

    return this.qrcodeApiService.search(payload).pipe(
      tap((response) => {
        this.items.set(response.datas ?? []);
        this.total.set(response.total ?? 0);
        this.page.set(response.page ?? page);
        this.pageSize.set(response.pageSize ?? pageSize);
        this.totalPages.set(response.totalPages ?? 0);
      })
    );
  }

  create(request: QrcodeCreateRequest) {
    return this.qrcodeApiService.create(request);
  }

  delete(request: QrcodeDeleteRequest) {
    return this.qrcodeApiService.delete(request);
  }

  generate(id: number) {
    return this.qrcodeApiService.generate(id).pipe(
      tap((response) => {
        this.selectedQr.set(response.data);
      })
    );
  }

  generateByProductCode(productCode: string) {
    return this.qrcodeApiService.generateByProductCode(productCode).pipe(
      tap((response) => {
        this.selectedQr.set(response.data);
      })
    );
  }

  clearSelectedQr(): void {
    this.selectedQr.set(null);
  }
}