import { TestBed } from '@angular/core/testing';

import { SchoolingService } from './schooling.service';

describe('SchoolingService', () => {
  let service: SchoolingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
