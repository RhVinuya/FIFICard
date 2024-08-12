import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherGiftsComponent } from './mother-gifts.component';

describe('MotherGiftsComponent', () => {
  let component: MotherGiftsComponent;
  let fixture: ComponentFixture<MotherGiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotherGiftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
