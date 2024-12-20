import { TestBed } from '@angular/core/testing';

import { MonteCarloServiceService } from './monte-carlo-service.service';

describe('MonteCarloServiceService', () => {
  let service: MonteCarloServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonteCarloServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
