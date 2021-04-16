import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoFoldersComponent } from './so-folders.component';

describe('SoFoldersComponent', () => {
  let component: SoFoldersComponent;
  let fixture: ComponentFixture<SoFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoFoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
