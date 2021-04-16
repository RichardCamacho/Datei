import { TestBed } from '@angular/core/testing';

import { PrerequisitesService } from './prerequisites.service';

describe('PrerequisitesService', () => {
  let service: PrerequisitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrerequisitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
