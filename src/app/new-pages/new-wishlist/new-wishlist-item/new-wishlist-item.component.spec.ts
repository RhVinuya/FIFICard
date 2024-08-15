import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWishlistItemComponent } from './new-wishlist-item.component';

describe('NewWishlistItemComponent', () => {
  let component: NewWishlistItemComponent;
  let fixture: ComponentFixture<NewWishlistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWishlistItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWishlistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
