import { TestBed } from '@angular/core/testing';

import { ProfessionalActivitiesService } from './professional-activities.service';

describe('ProfessionalActivitiesService', () => {
  let service: ProfessionalActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
