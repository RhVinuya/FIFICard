import { TestBed } from '@angular/core/testing';

import { NewPersonalizeService } from './new-personalize.service';

describe('NewPersonalizeService', () => {
  let service: NewPersonalizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPersonalizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
