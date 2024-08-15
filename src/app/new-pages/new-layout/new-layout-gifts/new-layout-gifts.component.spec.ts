import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLayoutGiftsComponent } from './new-layout-gifts.component';

describe('NewLayoutGiftsComponent', () => {
  let component: NewLayoutGiftsComponent;
  let fixture: ComponentFixture<NewLayoutGiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLayoutGiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLayoutGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
