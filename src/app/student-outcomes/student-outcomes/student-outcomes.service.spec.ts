import { TestBed } from '@angular/core/testing';

import { StudentOutcomesService } from './student-outcomes.service';

describe('StudentOutcomesService', () => {
  let service: StudentOutcomesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentOutcomesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
