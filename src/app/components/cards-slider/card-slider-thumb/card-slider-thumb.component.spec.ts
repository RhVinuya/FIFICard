import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSliderThumbComponent } from './card-slider-thumb.component';

describe('CardSliderThumbComponent', () => {
  let component: CardSliderThumbComponent;
  let fixture: ComponentFixture<CardSliderThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSliderThumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSliderThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
