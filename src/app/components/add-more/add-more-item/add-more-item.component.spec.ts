import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoreItemComponent } from './add-more-item.component';

describe('AddMoreItemComponent', () => {
  let component: AddMoreItemComponent;
  let fixture: ComponentFixture<AddMoreItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoreItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
