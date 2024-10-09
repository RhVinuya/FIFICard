import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlesMobileComponent } from './bundles-mobile.component';

describe('BundlesMobileComponent', () => {
  let component: BundlesMobileComponent;
  let fixture: ComponentFixture<BundlesMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BundlesMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BundlesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
