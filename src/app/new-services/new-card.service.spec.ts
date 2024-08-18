import { TestBed } from '@angular/core/testing';

import { NewCardService } from './new-card.service';

describe('NewCardService', () => {
  let service: NewCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
