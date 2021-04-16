import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceActivitiesComponent } from './service-activities.component';

describe('ServiceActivitiesComponent', () => {
  let component: ServiceActivitiesComponent;
  let fixture: ComponentFixture<ServiceActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
