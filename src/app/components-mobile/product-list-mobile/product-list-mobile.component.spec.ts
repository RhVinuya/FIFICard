import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListMobileComponent } from './product-list-mobile.component';

describe('ProductListMobileComponent', () => {
  let component: ProductListMobileComponent;
  let fixture: ComponentFixture<ProductListMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
