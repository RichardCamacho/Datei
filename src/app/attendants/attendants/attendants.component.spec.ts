import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantsComponent } from './attendants.component';

describe('AttendantsComponent', () => {
  let component: AttendantsComponent;
  let fixture: ComponentFixture<AttendantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
