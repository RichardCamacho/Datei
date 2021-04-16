import { TestBed } from '@angular/core/testing';

import { ContinuousImprovementService } from './continuous-improvement.service';

describe('ContinuousImprovementService', () => {
  let service: ContinuousImprovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContinuousImprovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
