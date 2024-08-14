import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGiftsComponent } from './new-gifts.component';

describe('NewGiftsComponent', () => {
  let component: NewGiftsComponent;
  let fixture: ComponentFixture<NewGiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
