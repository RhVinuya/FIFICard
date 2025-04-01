import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPromoSuggestionsItemComponent } from './new-promo-suggestions-item.component';

describe('NewPromoSuggestionsItemComponent', () => {
  let component: NewPromoSuggestionsItemComponent;
  let fixture: ComponentFixture<NewPromoSuggestionsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPromoSuggestionsItemComponent]
    });
    fixture = TestBed.createComponent(NewPromoSuggestionsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
