import { TestBed } from '@angular/core/testing';

import { SubjectInformationService } from './subject-information.service';

describe('SubjectInformationService', () => {
  let service: SubjectInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
