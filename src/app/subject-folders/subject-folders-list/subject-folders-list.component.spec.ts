import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFoldersListComponent } from './subject-folders-list.component';

describe('SubjectFoldersListComponent', () => {
  let component: SubjectFoldersListComponent;
  let fixture: ComponentFixture<SubjectFoldersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectFoldersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectFoldersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
