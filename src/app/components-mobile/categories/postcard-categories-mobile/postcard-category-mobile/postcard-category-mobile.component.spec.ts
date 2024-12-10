import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcardCategoryMobileComponent } from './postcard-category-mobile.component';

describe('PostcardCategoryMobileComponent', () => {
  let component: PostcardCategoryMobileComponent;
  let fixture: ComponentFixture<PostcardCategoryMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostcardCategoryMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostcardCategoryMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
