import { TestBed } from '@angular/core/testing';

import { AuthEmpresaService } from './auth-empresa.service';

describe('AuthEmpresaService', () => {
  let service: AuthEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
