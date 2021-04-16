import { TestBed } from '@angular/core/testing';

import { SpecificObjectivesService } from './specific-objectives.service';

describe('SpecificObjectivesService', () => {
  let service: SpecificObjectivesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificObjectivesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
