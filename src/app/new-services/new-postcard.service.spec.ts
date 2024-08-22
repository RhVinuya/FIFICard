import { TestBed } from '@angular/core/testing';

import { NewPostcardService } from './new-postcard.service';

describe('NewPostcardService', () => {
  let service: NewPostcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPostcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
