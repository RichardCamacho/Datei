import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesTypeDetailComponent } from './references-type-detail.component';

describe('ReferencesTypeDetailComponent', () => {
  let component: ReferencesTypeDetailComponent;
  let fixture: ComponentFixture<ReferencesTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesTypeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
