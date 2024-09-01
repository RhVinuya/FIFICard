import { TestBed } from '@angular/core/testing';

import { NewWishlistService } from './new-wishlist.service';

describe('NewWishlistService', () => {
  let service: NewWishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewWishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
