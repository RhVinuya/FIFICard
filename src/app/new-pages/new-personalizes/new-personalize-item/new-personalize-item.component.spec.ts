import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPersonalizeItemComponent } from './new-personalize-item.component';

describe('NewPersonalizeItemComponent', () => {
  let component: NewPersonalizeItemComponent;
  let fixture: ComponentFixture<NewPersonalizeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPersonalizeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPersonalizeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
