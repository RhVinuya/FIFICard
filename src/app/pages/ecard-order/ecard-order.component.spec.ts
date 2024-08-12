import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECardOrderComponent } from './ecard-order.component';

describe('ECardOrderComponent', () => {
  let component: ECardOrderComponent;
  let fixture: ComponentFixture<ECardOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECardOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ECardOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
