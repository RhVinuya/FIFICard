import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftsMobileComponent } from './gifts-mobile.component';

describe('GiftsMobileComponent', () => {
  let component: GiftsMobileComponent;
  let fixture: ComponentFixture<GiftsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
