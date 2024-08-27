import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGiftThumbComponent } from './new-gift-thumb.component';

describe('NewGiftThumbComponent', () => {
  let component: NewGiftThumbComponent;
  let fixture: ComponentFixture<NewGiftThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGiftThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGiftThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
