import { TestBed } from '@angular/core/testing';

import { NewRecipientService } from './new-recipients.service';

describe('NewRecipientService', () => {
  let service: NewRecipientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRecipientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
