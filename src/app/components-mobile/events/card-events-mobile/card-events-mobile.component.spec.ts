import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEventsMobileComponent } from './card-events-mobile.component';

describe('CardEventsMobileComponent', () => {
  let component: CardEventsMobileComponent;
  let fixture: ComponentFixture<CardEventsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardEventsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEventsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
