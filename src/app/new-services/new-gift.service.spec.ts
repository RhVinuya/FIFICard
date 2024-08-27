import { TestBed } from '@angular/core/testing';

import { NewGiftService } from './new-gift.service';

describe('NewGiftService', () => {
  let service: NewGiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewGiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
