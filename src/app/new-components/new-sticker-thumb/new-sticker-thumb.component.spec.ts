import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStickerThumbComponent } from './new-sticker-thumb.component';

describe('NewStickerThumbComponent', () => {
  let component: NewStickerThumbComponent;
  let fixture: ComponentFixture<NewStickerThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStickerThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStickerThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
