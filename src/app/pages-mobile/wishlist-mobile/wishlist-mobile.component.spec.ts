import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistMobileComponent } from './wishlist-mobile.component';

describe('WishlistMobileComponent', () => {
  let component: WishlistMobileComponent;
  let fixture: ComponentFixture<WishlistMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
