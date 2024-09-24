import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMobileComponent } from './product-mobile.component';

describe('ProductMobileComponent', () => {
  let component: ProductMobileComponent;
  let fixture: ComponentFixture<ProductMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
