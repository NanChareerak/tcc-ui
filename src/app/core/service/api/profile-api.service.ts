import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ApiListResponse,
  ApiResponse
} from '../../models/common-model';
import {
  CreateProfileRequest,
  DeleteProfileResponse,
  ProfileItem,
  ProfileSearchRequest,
  SaveProfileResponse,
  UpdateProfileRequest
} from '../../models/profile-model';
import { OccupationItem } from '../../models/occupation-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  private readonly http = inject(HttpClient);

  private readonly profileUrl = '/api/profiles';
  private readonly occupationUrl = '/api/occupations';

  create(
    payload: CreateProfileRequest
  ): Observable<ApiResponse<SaveProfileResponse>> {
    return this.http.post<ApiResponse<SaveProfileResponse>>(
      this.profileUrl,
      payload
    );
  }

  update(
    payload: UpdateProfileRequest
  ): Observable<ApiResponse<SaveProfileResponse>> {
    return this.http.put<ApiResponse<SaveProfileResponse>>(
      `${this.profileUrl}/${payload.id}`,
      payload
    );
  }

  getById(id: number): Observable<ApiResponse<ProfileItem>> {
    return this.http.get<ApiResponse<ProfileItem>>(
      `${this.profileUrl}/${id}`
    );
  }

  search(
    request: ProfileSearchRequest
  ): Observable<ApiListResponse<ProfileItem>> {
    let params = new HttpParams()
      .set('page', String(request.page))
      .set('pageSize', String(request.pageSize))
      .set('skip', String(request.skip))
      .set('take', String(request.take));

    if (request.keyword?.trim()) {
      params = params.set('keyword', request.keyword.trim());
    }

    return this.http.get<ApiListResponse<ProfileItem>>(this.profileUrl, {
      params
    });
  }

  delete(id: number): Observable<ApiResponse<DeleteProfileResponse>> {
    return this.http.delete<ApiResponse<DeleteProfileResponse>>(
      `${this.profileUrl}/${id}`
    );
  }

  getOccupations(): Observable<ApiListResponse<OccupationItem>> {
    return this.http.get<ApiListResponse<OccupationItem>>(this.occupationUrl);
  }
}