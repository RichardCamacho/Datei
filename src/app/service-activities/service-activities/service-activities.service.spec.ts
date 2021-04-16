import { TestBed } from '@angular/core/testing';

import { ServiceActivitiesService } from './service-activities.service';

describe('ServiceActivitiesService', () => {
  let service: ServiceActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
