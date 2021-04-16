import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyIncomeComponent } from './monthly-income.component';

describe('MonthlyIncomeComponent', () => {
  let component: MonthlyIncomeComponent;
  let fixture: ComponentFixture<MonthlyIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
