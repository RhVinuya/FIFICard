import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardThumbComponent } from './new-card-thumb.component';

describe('NewCardThumbComponent', () => {
  let component: NewCardThumbComponent;
  let fixture: ComponentFixture<NewCardThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCardThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCardThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
