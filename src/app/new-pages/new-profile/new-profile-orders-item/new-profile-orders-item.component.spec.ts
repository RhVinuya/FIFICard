import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfileOrdersItemComponent } from './new-profile-orders-item.component';

describe('NewProfileOrdersItemComponent', () => {
  let component: NewProfileOrdersItemComponent;
  let fixture: ComponentFixture<NewProfileOrdersItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProfileOrdersItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProfileOrdersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
