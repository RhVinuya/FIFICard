import { TestBed } from '@angular/core/testing';

import { SecureInnerGuard } from './secure-inner.guard';

describe('SecureInnerGuard', () => {
  let guard: SecureInnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecureInnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
