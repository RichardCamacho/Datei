import { TestBed } from '@angular/core/testing';

import { CoauthorsService } from './coauthors.service';

describe('CoauthorsService', () => {
  let service: CoauthorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoauthorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
