import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuggestionsItemComponent } from './new-suggestions-item.component';

describe('NewSuggestionsItemComponent', () => {
  let component: NewSuggestionsItemComponent;
  let fixture: ComponentFixture<NewSuggestionsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSuggestionsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSuggestionsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
