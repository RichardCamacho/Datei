import { TestBed } from '@angular/core/testing';

import { NoAcademicExperienceService } from './no-academic-experience.service';

describe('NoAcademicExperienceService', () => {
  let service: NoAcademicExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoAcademicExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
