import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistTileMobileComponent } from './wishlist-tile-mobile.component';

describe('WishlistTileMobileComponent', () => {
  let component: WishlistTileMobileComponent;
  let fixture: ComponentFixture<WishlistTileMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistTileMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistTileMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
