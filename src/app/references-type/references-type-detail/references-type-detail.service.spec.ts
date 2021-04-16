import { TestBed } from '@angular/core/testing';

import { ReferencesTypeDetailService } from './references-type-detail.service';

describe('ReferencesTypeDetailService', () => {
  let service: ReferencesTypeDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferencesTypeDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
