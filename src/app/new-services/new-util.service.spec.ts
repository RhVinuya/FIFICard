import { TestBed } from '@angular/core/testing';

import { NewUtilService } from './new-util.service';

describe('NewUtilService', () => {
  let service: NewUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
