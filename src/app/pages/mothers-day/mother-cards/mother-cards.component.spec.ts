import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherCardsComponent } from './mother-cards.component';

describe('MotherCardsComponent', () => {
  let component: MotherCardsComponent;
  let fixture: ComponentFixture<MotherCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotherCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
