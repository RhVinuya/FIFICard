import { TestBed } from '@angular/core/testing';

import { NewStorageService } from './new-storage.service';

describe('NewStorageService', () => {
  let service: NewStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
