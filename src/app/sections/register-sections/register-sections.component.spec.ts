import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSectionsComponent } from './register-sections.component';

describe('RegisterSectionsComponent', () => {
  let component: RegisterSectionsComponent;
  let fixture: ComponentFixture<RegisterSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
