import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerCategoriesMobileComponent } from './sticker-categories-mobile.component';

describe('StickerCategoriesMobileComponent', () => {
  let component: StickerCategoriesMobileComponent;
  let fixture: ComponentFixture<StickerCategoriesMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerCategoriesMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickerCategoriesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
