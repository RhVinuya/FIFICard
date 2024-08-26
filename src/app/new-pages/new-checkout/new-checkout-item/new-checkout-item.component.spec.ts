import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCheckoutItemComponent } from './new-checkout-item.component';

describe('NewCheckoutItemComponent', () => {
  let component: NewCheckoutItemComponent;
  let fixture: ComponentFixture<NewCheckoutItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCheckoutItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCheckoutItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
