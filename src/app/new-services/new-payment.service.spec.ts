import { TestBed } from '@angular/core/testing';

import { NewPaymentService } from './new-payment.service';

describe('NewPaymentService', () => {
  let service: NewPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
