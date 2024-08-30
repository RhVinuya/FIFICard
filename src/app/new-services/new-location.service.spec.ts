import { TestBed } from '@angular/core/testing';

import { NewLocationService } from './new-location.service';

describe('NewLocationService', () => {
  let service: NewLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
