import { TestBed } from '@angular/core/testing';

import { OccupationApi } from './occupation-api';

describe('OccupationApi', () => {
  let service: OccupationApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupationApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
