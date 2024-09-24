import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCategoriesMobileComponent } from './gift-categories-mobile.component';

describe('GiftCategoriesMobileComponent', () => {
  let component: GiftCategoriesMobileComponent;
  let fixture: ComponentFixture<GiftCategoriesMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCategoriesMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCategoriesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
