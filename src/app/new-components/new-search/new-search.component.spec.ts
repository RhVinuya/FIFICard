import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSearchComponent } from './new-search.component';

describe('NewSearchComponent', () => {
  let component: NewSearchComponent;
  let fixture: ComponentFixture<NewSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSearchComponent]
    });
    fixture = TestBed.createComponent(NewSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
