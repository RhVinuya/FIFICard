import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStickersComponent } from './new-stickers.component';

describe('NewStickersComponent', () => {
  let component: NewStickersComponent;
  let fixture: ComponentFixture<NewStickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStickersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
