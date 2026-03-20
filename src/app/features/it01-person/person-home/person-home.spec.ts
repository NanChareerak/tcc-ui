import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHome } from './person-home';

describe('PersonHome', () => {
  let component: PersonHome;
  let fixture: ComponentFixture<PersonHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonHome],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
