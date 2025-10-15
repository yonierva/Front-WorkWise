import { TestBed } from '@angular/core/testing';

import { AuthPersonsaService } from './auth-personsa.service';

describe('AuthPersonsaService', () => {
  let service: AuthPersonsaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthPersonsaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
