import { TestBed } from '@angular/core/testing';

import { SoFoldersService } from './so-folders.service';

describe('SoFoldersService', () => {
  let service: SoFoldersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoFoldersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
