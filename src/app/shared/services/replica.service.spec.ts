import { TestBed } from '@angular/core/testing';

import { ReplicaService } from './replica.service';

describe('ReplicaService', () => {
  let service: ReplicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
