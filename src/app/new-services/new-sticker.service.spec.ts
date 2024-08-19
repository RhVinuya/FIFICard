import { TestBed } from '@angular/core/testing';

import { NewStickerService } from './new-sticker.service';

describe('NewStickerService', () => {
  let service: NewStickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewStickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
