import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitSeparationComponent } from './visit-separation.component';

describe('VisitSeparationComponent', () => {
  let component: VisitSeparationComponent;
  let fixture: ComponentFixture<VisitSeparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitSeparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitSeparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
