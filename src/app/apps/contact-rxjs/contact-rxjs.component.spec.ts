import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRxjsComponent } from './contact-rxjs.component';

describe('ContactRxjsComponent', () => {
  let component: ContactRxjsComponent;
  let fixture: ComponentFixture<ContactRxjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactRxjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
