import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { signoutGuard } from './signout.guard';

describe('signoutGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => signoutGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
