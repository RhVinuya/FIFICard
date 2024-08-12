import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftEventComponent } from './gift-event.component';

describe('GiftEventComponent', () => {
  let component: GiftEventComponent;
  let fixture: ComponentFixture<GiftEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
