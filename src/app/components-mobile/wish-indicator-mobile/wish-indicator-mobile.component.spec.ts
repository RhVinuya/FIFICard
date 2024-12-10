import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishIndicatorMobileComponent } from './wish-indicator-mobile.component';

describe('WishIndicatorMobileComponent', () => {
  let component: WishIndicatorMobileComponent;
  let fixture: ComponentFixture<WishIndicatorMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishIndicatorMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishIndicatorMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
