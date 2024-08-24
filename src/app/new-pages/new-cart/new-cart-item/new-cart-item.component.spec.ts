import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCartItemComponent } from './new-cart-item.component';

describe('NewCartItemComponent', () => {
  let component: NewCartItemComponent;
  let fixture: ComponentFixture<NewCartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCartItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
