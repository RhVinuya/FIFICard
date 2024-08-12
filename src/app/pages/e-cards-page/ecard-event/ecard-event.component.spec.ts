import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECardEventComponent } from './ecard-event.component';

describe('ECardEventComponent', () => {
  let component: ECardEventComponent;
  let fixture: ComponentFixture<ECardEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECardEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ECardEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
