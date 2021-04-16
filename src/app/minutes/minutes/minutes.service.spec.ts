import { TestBed } from '@angular/core/testing';

import { MinutesService } from './minutes.service';

describe('MinutesService', () => {
  let service: MinutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
