import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalActivitiesComponent } from './professional-activities.component';

describe('ProfessionalActivitiesComponent', () => {
  let component: ProfessionalActivitiesComponent;
  let fixture: ComponentFixture<ProfessionalActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
