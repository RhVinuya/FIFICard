import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcardsMobileComponent } from './postcards-mobile.component';

describe('PostcardsMobileComponent', () => {
  let component: PostcardsMobileComponent;
  let fixture: ComponentFixture<PostcardsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostcardsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostcardsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
