import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authPersonaGuard } from './auth-persona.guard';

describe('authPersonaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authPersonaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
