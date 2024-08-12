import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftEventsComponent } from './gift-events.component';

describe('GiftEventsComponent', () => {
  let component: GiftEventsComponent;
  let fixture: ComponentFixture<GiftEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
