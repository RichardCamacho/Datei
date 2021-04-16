import { TestBed } from '@angular/core/testing';

import { CurriculumVitaeService } from './curriculum-vitae.service';

describe('CurriculumVitaeService', () => {
  let service: CurriculumVitaeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumVitaeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
