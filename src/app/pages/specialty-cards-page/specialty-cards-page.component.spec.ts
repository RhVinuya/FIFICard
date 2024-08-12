import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyCardsPageComponent } from './specialty-cards-page.component';

describe('SpecialtyCardsPageComponent', () => {
  let component: SpecialtyCardsPageComponent;
  let fixture: ComponentFixture<SpecialtyCardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialtyCardsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyCardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
