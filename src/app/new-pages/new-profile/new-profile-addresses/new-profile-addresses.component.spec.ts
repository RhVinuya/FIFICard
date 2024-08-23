import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfileAddressesComponent } from './new-profile-addresses.component';

describe('NewProfileAddressesComponent', () => {
  let component: NewProfileAddressesComponent;
  let fixture: ComponentFixture<NewProfileAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProfileAddressesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProfileAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
