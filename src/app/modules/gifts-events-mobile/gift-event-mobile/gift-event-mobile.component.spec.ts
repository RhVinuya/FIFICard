import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftEventMobileComponent } from './gift-event-mobile.component';

describe('GiftEventMobileComponent', () => {
  let component: GiftEventMobileComponent;
  let fixture: ComponentFixture<GiftEventMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftEventMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftEventMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
