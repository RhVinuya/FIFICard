import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLayoutStickersComponent } from './new-layout-stickers.component';

describe('NewLayoutStickersComponent', () => {
  let component: NewLayoutStickersComponent;
  let fixture: ComponentFixture<NewLayoutStickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLayoutStickersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLayoutStickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
