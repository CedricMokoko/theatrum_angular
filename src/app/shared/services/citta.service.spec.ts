import { TestBed } from '@angular/core/testing';

import { CittaService } from './citta.service';

describe('CittaService', () => {
  let service: CittaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CittaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
