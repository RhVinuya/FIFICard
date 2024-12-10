import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCategoryMobileComponent } from './card-category-mobile.component';

describe('CardCategoryMobileComponent', () => {
  let component: CardCategoryMobileComponent;
  let fixture: ComponentFixture<CardCategoryMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCategoryMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCategoryMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
