import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCategoriesMobileComponent } from './card-categories-mobile.component';

describe('CardCategoriesMobileComponent', () => {
  let component: CardCategoriesMobileComponent;
  let fixture: ComponentFixture<CardCategoriesMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCategoriesMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCategoriesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
