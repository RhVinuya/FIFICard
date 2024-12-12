import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMobileComponent } from './layout-mobile.component';

describe('LayoutMobileComponent', () => {
  let component: LayoutMobileComponent;
  let fixture: ComponentFixture<LayoutMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
