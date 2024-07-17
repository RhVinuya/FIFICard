import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftsEventsMobileComponent } from './gifts-events-mobile.component';

describe('GiftsEventsMobileComponent', () => {
  let component: GiftsEventsMobileComponent;
  let fixture: ComponentFixture<GiftsEventsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftsEventsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftsEventsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
