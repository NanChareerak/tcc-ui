import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PersonApiService } from '../api/person.api-service';
import { ApiListResponse } from '../../models/common-model';
import { CreatePersonRequest, GetPersonListRequest, PersonModel, UpdatePersonRequest } from '../../models/person-model';


@Injectable({
  providedIn: 'root',
})
export class PersonAppService {
  private readonly personApiService = inject(PersonApiService);

  getPersonList(request: GetPersonListRequest): Observable<ApiListResponse<PersonModel>> {
    return this.personApiService.getPersonList(request);
  }

  viewPerson(id: number): Observable<PersonModel> {
    return this.personApiService.viewPerson(id).pipe(map((response) => response.data));
  }

  createPerson(request: CreatePersonRequest): Observable<PersonModel> {
    return this.personApiService.createPerson(request).pipe(map((response) => response.data));
  }

  updatePerson(request: UpdatePersonRequest): Observable<PersonModel> {
    return this.personApiService.updatePerson(request).pipe(map((response) => response.data));
  }
}
