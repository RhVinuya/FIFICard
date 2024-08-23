import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCreateAddressComponent } from './new-create-address.component';

describe('NewCreateAddressComponent', () => {
  let component: NewCreateAddressComponent;
  let fixture: ComponentFixture<NewCreateAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCreateAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCreateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
