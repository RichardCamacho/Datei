import { TestBed } from '@angular/core/testing';

import { CoversService } from './covers.service';

describe('CoversService', () => {
  let service: CoversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
