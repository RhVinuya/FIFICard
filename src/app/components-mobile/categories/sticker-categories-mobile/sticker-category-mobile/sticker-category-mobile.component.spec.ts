import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerCategoryMobileComponent } from './sticker-category-mobile.component';

describe('StickerCategoryMobileComponent', () => {
  let component: StickerCategoryMobileComponent;
  let fixture: ComponentFixture<StickerCategoryMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerCategoryMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickerCategoryMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
