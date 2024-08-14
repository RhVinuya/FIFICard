import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWishlistComponent } from './new-wishlist.component';

describe('NewWishlistComponent', () => {
  let component: NewWishlistComponent;
  let fixture: ComponentFixture<NewWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWishlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
