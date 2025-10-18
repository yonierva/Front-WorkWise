import { TestBed } from '@angular/core/testing';

import { AuthOfertasService } from './auth-ofertas.service';

describe('AuthOfertasService', () => {
  let service: AuthOfertasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthOfertasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
