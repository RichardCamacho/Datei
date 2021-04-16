import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAcademicExperienceComponent } from './no-academic-experience.component';

describe('NoAcademicExperienceComponent', () => {
  let component: NoAcademicExperienceComponent;
  let fixture: ComponentFixture<NoAcademicExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAcademicExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAcademicExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
