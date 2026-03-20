import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePlaceholder } from './module-placeholder';

describe('ModulePlaceholder', () => {
  let component: ModulePlaceholder;
  let fixture: ComponentFixture<ModulePlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulePlaceholder],
    }).compileComponents();

    fixture = TestBed.createComponent(ModulePlaceholder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
