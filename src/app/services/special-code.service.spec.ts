import { TestBed } from '@angular/core/testing';

import { SpecialCodeService } from './special-code.service';

describe('SpecialCodeService', () => {
  let service: SpecialCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
