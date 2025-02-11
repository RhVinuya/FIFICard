import { TestBed } from '@angular/core/testing';

import { NewConfigService } from './new-config.service';

describe('NewConfigService', () => {
  let service: NewConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
