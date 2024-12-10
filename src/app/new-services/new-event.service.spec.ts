import { TestBed } from '@angular/core/testing';

import { NewEventService } from './new-event.service';

describe('NewEventService', () => {
  let service: NewEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
