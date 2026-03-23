import { TestBed } from '@angular/core/testing';

import { ProfileApp } from './profile-app';

describe('ProfileApp', () => {
  let service: ProfileApp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileApp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
