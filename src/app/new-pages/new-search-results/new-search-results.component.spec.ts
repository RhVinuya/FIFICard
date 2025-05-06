import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSearchResultsComponent } from './new-search-results.component';

describe('NewSearchResultsComponent', () => {
  let component: NewSearchResultsComponent;
  let fixture: ComponentFixture<NewSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSearchResultsComponent]
    });
    fixture = TestBed.createComponent(NewSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
