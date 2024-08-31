import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-checkout-gcash',
  templateUrl: './new-checkout-gcash.component.html',
  styleUrls: ['./new-checkout-gcash.component.scss']
})
export class NewCheckoutGcashComponent implements OnInit {

  activeModal: NgbActiveModal;

  constructor(
    _activeModal: NgbActiveModal
  ) { 
    this.activeModal = _activeModal
  }

  step: 1 | 2 | 3 = 1;

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close();
  }

}
