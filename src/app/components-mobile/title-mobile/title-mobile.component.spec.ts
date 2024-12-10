import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleMobileComponent } from './title-mobile.component';

describe('TitleMobileComponent', () => {
  let component: TitleMobileComponent;
  let fixture: ComponentFixture<TitleMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
