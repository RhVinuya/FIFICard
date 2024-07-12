import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickersCardsMobileComponent } from './stickers-cards-mobile.component';

describe('StickersCardsMobileComponent', () => {
  let component: StickersCardsMobileComponent;
  let fixture: ComponentFixture<StickersCardsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickersCardsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickersCardsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
