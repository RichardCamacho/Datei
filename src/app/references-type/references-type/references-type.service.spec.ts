import { TestBed } from '@angular/core/testing';

import { ReferencesTypeService } from './references-type.service';

describe('ReferencesTypeService', () => {
  let service: ReferencesTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferencesTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
