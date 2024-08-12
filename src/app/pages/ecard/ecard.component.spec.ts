import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECardComponent } from './ecard.component';

describe('ECardComponent', () => {
  let component: ECardComponent;
  let fixture: ComponentFixture<ECardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ECardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
