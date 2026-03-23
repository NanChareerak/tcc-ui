import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ProfileApiService } from '../api/profile-api.service';
import {
  CreateProfileRequest,
  DeleteProfileResponse,
  ProfileItem,
  ProfileSearchRequest,
  SaveProfileResponse,
  UpdateProfileRequest
} from '../../models/profile-model';
import { OccupationItem } from '../../models/occupation-model';
import { ApiListResponse } from '../../models/common-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileAppService {
  private readonly profileApi = inject(ProfileApiService);

  create(payload: CreateProfileRequest): Observable<SaveProfileResponse> {
    return this.profileApi.create(payload).pipe(
      map((response) => response.data)
    );
  }

  update(payload: UpdateProfileRequest): Observable<SaveProfileResponse> {
    return this.profileApi.update(payload).pipe(
      map((response) => response.data)
    );
  }

  getById(id: number): Observable<ProfileItem> {
    return this.profileApi.getById(id).pipe(
      map((response) => response.data)
    );
  }

  search(request: ProfileSearchRequest): Observable<ApiListResponse<ProfileItem>> {
    return this.profileApi.search(request);
  }

  delete(id: number): Observable<DeleteProfileResponse> {
    return this.profileApi.delete(id).pipe(
      map((response) => response.data)
    );
  }

  getOccupations(): Observable<OccupationItem[]> {
    return this.profileApi.getOccupations().pipe(
      map((response) => response.datas)
    );
  }
}