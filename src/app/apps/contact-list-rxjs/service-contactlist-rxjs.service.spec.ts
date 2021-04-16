import { TestBed } from '@angular/core/testing';

import { ServiceContactlistRxjsService } from './service-contactlist-rxjs.service';

describe('ServiceContactlistRxjsService', () => {
  let service: ServiceContactlistRxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceContactlistRxjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
