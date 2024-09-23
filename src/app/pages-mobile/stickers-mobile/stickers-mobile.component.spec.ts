import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickersMobileComponent } from './stickers-mobile.component';

describe('StickersMobileComponent', () => {
  let component: StickersMobileComponent;
  let fixture: ComponentFixture<StickersMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickersMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickersMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
