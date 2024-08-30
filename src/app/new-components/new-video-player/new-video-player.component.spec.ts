import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVideoPlayerComponent } from './new-video-player.component';

describe('NewVideoPlayerComponent', () => {
  let component: NewVideoPlayerComponent;
  let fixture: ComponentFixture<NewVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVideoPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
