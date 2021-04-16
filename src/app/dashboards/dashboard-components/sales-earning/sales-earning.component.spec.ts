import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesEarningComponent } from './sales-earning.component';

describe('SalesEarningComponent', () => {
  let component: SalesEarningComponent;
  let fixture: ComponentFixture<SalesEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
