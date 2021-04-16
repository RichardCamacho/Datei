import { TestBed } from '@angular/core/testing';

import { SubjectFoldersService } from './subject-folders.service';

describe('SubjectFoldersService', () => {
  let service: SubjectFoldersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectFoldersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
