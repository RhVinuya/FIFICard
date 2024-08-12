import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePlayerComponent } from './sample-player.component';

describe('SamplePlayerComponent', () => {
  let component: SamplePlayerComponent;
  let fixture: ComponentFixture<SamplePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplePlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamplePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
