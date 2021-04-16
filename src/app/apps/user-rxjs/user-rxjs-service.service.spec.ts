import { TestBed } from '@angular/core/testing';

import { UserRxjsServiceService } from './user-rxjs-service.service';

describe('UserRxjsServiceService', () => {
  let service: UserRxjsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRxjsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
