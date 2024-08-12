import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickersCardsComponent } from './stickers-cards.component';

describe('StickersCardsComponent', () => {
  let component: StickersCardsComponent;
  let fixture: ComponentFixture<StickersCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickersCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickersCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
