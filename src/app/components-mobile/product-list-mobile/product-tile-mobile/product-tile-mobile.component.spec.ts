import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileMobileComponent } from './product-tile-mobile.component';

describe('ProductTileMobileComponent', () => {
  let component: ProductTileMobileComponent;
  let fixture: ComponentFixture<ProductTileMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTileMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTileMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
