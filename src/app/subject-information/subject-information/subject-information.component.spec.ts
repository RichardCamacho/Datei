import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectInformationComponent } from './subject-information.component';

describe('SubjectInformationComponent', () => {
  let component: SubjectInformationComponent;
  let fixture: ComponentFixture<SubjectInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
