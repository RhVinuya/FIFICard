import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCategoryMobileComponent } from './gift-category-mobile.component';

describe('GiftCategoryMobileComponent', () => {
  let component: GiftCategoryMobileComponent;
  let fixture: ComponentFixture<GiftCategoryMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCategoryMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCategoryMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
