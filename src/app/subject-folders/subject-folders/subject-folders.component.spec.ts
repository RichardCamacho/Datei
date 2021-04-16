import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFoldersComponent } from './subject-folders.component';

describe('SubjectFoldersComponent', () => {
  let component: SubjectFoldersComponent;
  let fixture: ComponentFixture<SubjectFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectFoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
