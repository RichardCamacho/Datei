import { TestBed } from '@angular/core/testing';

import { DialogLookupService } from './dialog-lookup.service';

describe('DialogLookupService', () => {
  let service: DialogLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
