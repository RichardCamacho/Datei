import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificObjectivesComponent } from './specific-objectives.component';

describe('SpecificObjectivesComponent', () => {
  let component: SpecificObjectivesComponent;
  let fixture: ComponentFixture<SpecificObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificObjectivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
