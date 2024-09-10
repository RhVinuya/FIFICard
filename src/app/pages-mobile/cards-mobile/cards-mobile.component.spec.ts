import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsMobileComponent } from './cards-mobile.component';

describe('CardsMobileComponent', () => {
  let component: CardsMobileComponent;
  let fixture: ComponentFixture<CardsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
