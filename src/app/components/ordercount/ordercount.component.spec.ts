import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdercountComponent } from './ordercount.component';

describe('OrdercountComponent', () => {
  let component: OrdercountComponent;
  let fixture: ComponentFixture<OrdercountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdercountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdercountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
