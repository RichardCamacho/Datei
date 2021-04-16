import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListRxjsComponent } from './contact-list-rxjs.component';

describe('ContactListRxjsComponent', () => {
  let component: ContactListRxjsComponent;
  let fixture: ComponentFixture<ContactListRxjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListRxjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
