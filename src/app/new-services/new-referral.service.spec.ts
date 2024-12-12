import { TestBed } from '@angular/core/testing';

import { NewReferralService } from './new-referral.service';

describe('NewReferralService', () => {
  let service: NewReferralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewReferralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
