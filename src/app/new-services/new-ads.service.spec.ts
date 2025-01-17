import { TestBed } from '@angular/core/testing';

import { NewAdsService } from './new-ads.service';

describe('NewAdsService', () => {
  let service: NewAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
