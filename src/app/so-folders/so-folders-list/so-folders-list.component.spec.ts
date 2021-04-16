import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoFoldersListComponent } from './so-folders-list.component';

describe('SoFoldersListComponent', () => {
  let component: SoFoldersListComponent;
  let fixture: ComponentFixture<SoFoldersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoFoldersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoFoldersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
