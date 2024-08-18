import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPersonalizeComponent } from './new-personalize.component';

describe('NewPersonalizeComponent', () => {
  let component: NewPersonalizeComponent;
  let fixture: ComponentFixture<NewPersonalizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPersonalizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPersonalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
