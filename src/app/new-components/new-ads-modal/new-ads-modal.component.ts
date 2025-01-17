import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-ads-modal',
  templateUrl: './new-ads-modal.component.html',
  styleUrls: ['./new-ads-modal.component.scss'],
})
export class NewAdsModalComponent  implements OnInit {

  activeModal: NgbActiveModal;
  router: Router;

  constructor(
    _activeModal: NgbActiveModal,
    _router: Router
  ) { 
    this.activeModal = _activeModal;
    this.router = _router;
  }

  ngOnInit() {}

  onClose(event: Event){
    event.stopPropagation();
    this.activeModal.close();
  }

  onOpen(event: Event) {
    event.stopPropagation();
    this.activeModal.close();
    this.router.navigate(['/cards/Valentines']);
  }
}
