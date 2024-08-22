import { TestBed } from '@angular/core/testing';

import { NewAddressService } from './new-address.service';

describe('NewAddressService', () => {
  let service: NewAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
