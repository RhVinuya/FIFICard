import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcardCategoriesMobileComponent } from './postcard-categories-mobile.component';

describe('PostcardCategoriesMobileComponent', () => {
  let component: PostcardCategoriesMobileComponent;
  let fixture: ComponentFixture<PostcardCategoriesMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostcardCategoriesMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostcardCategoriesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
