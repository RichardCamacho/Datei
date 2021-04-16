import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLookupComponent } from './dialog-lookup.component';

describe('DialogLookupComponent', () => {
  let component: DialogLookupComponent;
  let fixture: ComponentFixture<DialogLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
