import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCartViewComponent } from './new-cart-view.component';

describe('NewCartViewComponent', () => {
  let component: NewCartViewComponent;
  let fixture: ComponentFixture<NewCartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCartViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
