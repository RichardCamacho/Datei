import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddUserComponent } from './edit-add-user.component';

describe('EditAddUserComponent', () => {
  let component: EditAddUserComponent;
  let fixture: ComponentFixture<EditAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
