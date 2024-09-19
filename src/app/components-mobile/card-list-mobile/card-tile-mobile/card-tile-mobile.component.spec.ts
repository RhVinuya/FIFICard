import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTileMobileComponent } from './card-tile-mobile.component';

describe('CardTileMobileComponent', () => {
  let component: CardTileMobileComponent;
  let fixture: ComponentFixture<CardTileMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTileMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTileMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
