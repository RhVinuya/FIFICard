import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuggestionsComponent } from './new-suggestions.component';

describe('NewSuggestionsComponent', () => {
  let component: NewSuggestionsComponent;
  let fixture: ComponentFixture<NewSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSuggestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
