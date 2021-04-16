import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousImprovementComponent } from './continuous-improvement.component';

describe('ContinuousImprovementComponent', () => {
  let component: ContinuousImprovementComponent;
  let fixture: ComponentFixture<ContinuousImprovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuousImprovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuousImprovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
