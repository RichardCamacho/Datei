import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesTypeListComponent } from './references-type-list.component';

describe('ReferencesTypeListComponent', () => {
  let component: ReferencesTypeListComponent;
  let fixture: ComponentFixture<ReferencesTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
