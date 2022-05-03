import { TestBed } from '@angular/core/testing';

import { InterpreterGuardService } from './interpreter-guard.service';

describe('InterpreterGuardService', () => {
  let service: InterpreterGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterpreterGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
