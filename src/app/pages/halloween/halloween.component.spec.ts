import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalloweenComponent } from './halloween.component';

describe('HalloweenComponent', () => {
  let component: HalloweenComponent;
  let fixture: ComponentFixture<HalloweenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalloweenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HalloweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
