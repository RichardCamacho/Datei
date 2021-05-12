import { TestBed } from '@angular/core/testing';

import { SignaturesService } from './signatures.service';

describe('SignaturesService', () => {
  let service: SignaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
