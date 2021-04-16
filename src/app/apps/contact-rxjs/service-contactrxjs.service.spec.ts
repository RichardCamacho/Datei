import { TestBed } from '@angular/core/testing';

import { ServiceContactrxjsService } from './service-contactrxjs.service';

describe('ServiceContactrxjsService', () => {
  let service: ServiceContactrxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceContactrxjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
