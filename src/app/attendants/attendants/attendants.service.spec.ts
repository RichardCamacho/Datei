import { TestBed } from '@angular/core/testing';

import { AttendantsService } from './attendants.service';

describe('AttendantsService', () => {
  let service: AttendantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
