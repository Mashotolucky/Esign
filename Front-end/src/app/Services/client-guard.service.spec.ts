import { TestBed } from '@angular/core/testing';

import { ClientGuardService } from './client-guard.service';

describe('ClientGuardService', () => {
  let service: ClientGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
