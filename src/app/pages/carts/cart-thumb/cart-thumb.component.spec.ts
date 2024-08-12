import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartThumbComponent } from './cart-thumb.component';

describe('CartThumbComponent', () => {
  let component: CartThumbComponent;
  let fixture: ComponentFixture<CartThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartThumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
