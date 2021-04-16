import { TestBed } from '@angular/core/testing';

import { AcademicExperienceService } from './academic-experience.service';

describe('AcademicExperienceService', () => {
  let service: AcademicExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
