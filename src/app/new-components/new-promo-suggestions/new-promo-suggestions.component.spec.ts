import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPromoSuggestionsComponent } from './new-promo-suggestions.component';

describe('NewPromoSuggestionsComponent', () => {
  let component: NewPromoSuggestionsComponent;
  let fixture: ComponentFixture<NewPromoSuggestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPromoSuggestionsComponent]
    });
    fixture = TestBed.createComponent(NewPromoSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
