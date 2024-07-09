import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsMobileComponent } from './events-mobile.component';

describe('EventsMobileComponent', () => {
  let component: EventsMobileComponent;
  let fixture: ComponentFixture<EventsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
