import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectInformationListComponent } from './subject-information-list.component';

describe('SubjectInformationListComponent', () => {
  let component: SubjectInformationListComponent;
  let fixture: ComponentFixture<SubjectInformationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectInformationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
