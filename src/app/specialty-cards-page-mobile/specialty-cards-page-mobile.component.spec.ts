import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyCardsPageMobileComponent } from './specialty-cards-page-mobile.component';

describe('SpecialtyCardsPageMobileComponent', () => {
  let component: SpecialtyCardsPageMobileComponent;
  let fixture: ComponentFixture<SpecialtyCardsPageMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialtyCardsPageMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialtyCardsPageMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
