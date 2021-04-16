import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesTypeComponent } from './references-type.component';

describe('ReferencesTypeComponent', () => {
  let component: ReferencesTypeComponent;
  let fixture: ComponentFixture<ReferencesTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
