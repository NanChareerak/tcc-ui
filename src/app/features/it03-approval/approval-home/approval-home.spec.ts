import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalHome } from './approval-home';

describe('ApprovalHome', () => {
  let component: ApprovalHome;
  let fixture: ComponentFixture<ApprovalHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalHome],
    }).compileComponents();

    fixture = TestBed.createComponent(ApprovalHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
