import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcardThumbComponent } from './postcard-thumb.component';

describe('PostcardThumbComponent', () => {
  let component: PostcardThumbComponent;
  let fixture: ComponentFixture<PostcardThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostcardThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostcardThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
