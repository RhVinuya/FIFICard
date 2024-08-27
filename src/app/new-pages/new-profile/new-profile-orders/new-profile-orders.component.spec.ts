import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfileOrdersComponent } from './new-profile-orders.component';

describe('NewProfileOrdersComponent', () => {
  let component: NewProfileOrdersComponent;
  let fixture: ComponentFixture<NewProfileOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProfileOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProfileOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
