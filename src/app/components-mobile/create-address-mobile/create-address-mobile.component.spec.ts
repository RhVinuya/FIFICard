import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddressMobileComponent } from './create-address-mobile.component';

describe('CreateAddressMobileComponent', () => {
  let component: CreateAddressMobileComponent;
  let fixture: ComponentFixture<CreateAddressMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAddressMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAddressMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
