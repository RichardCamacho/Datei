import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOutcomesComponent } from './student-outcomes.component';

describe('StudentOutcomesComponent', () => {
  let component: StudentOutcomesComponent;
  let fixture: ComponentFixture<StudentOutcomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentOutcomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
