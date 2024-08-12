import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalloweenCardComponent } from './halloween-card.component';

describe('HalloweenCardComponent', () => {
  let component: HalloweenCardComponent;
  let fixture: ComponentFixture<HalloweenCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalloweenCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HalloweenCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
