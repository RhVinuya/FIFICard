import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsMobileComponent } from './transactions-mobile.component';

describe('TransactionsMobileComponent', () => {
  let component: TransactionsMobileComponent;
  let fixture: ComponentFixture<TransactionsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
