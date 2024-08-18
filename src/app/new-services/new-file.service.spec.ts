import { TestBed } from '@angular/core/testing';

import { NewFileService } from './new-file.service';

describe('NewFileService', () => {
  let service: NewFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
