import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReviewProductComponent } from './new-review-product.component';

describe('NewReviewProductComponent', () => {
  let component: NewReviewProductComponent;
  let fixture: ComponentFixture<NewReviewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReviewProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReviewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
