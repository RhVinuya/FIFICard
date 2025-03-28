import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { IConfig, IAdsImage } from 'src/app/new-models/new-config';
import { NewConfigService } from 'src/app/new-services/new-config.service';

@Component({
  selector: 'app-new-ads-modal',
  templateUrl: './new-ads-modal.component.html',
  styleUrls: ['./new-ads-modal.component.scss'],
})
export class NewAdsModalComponent  implements OnInit {
  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  configService: NewConfigService;
  activeModal: NgbActiveModal;
  router: Router;

  
  constructor(
    _activeModal: NgbActiveModal,
    _configService: NewConfigService,
    _router: Router
  ) { 
    this.activeModal = _activeModal;
    this.configService = _configService;
    this.router = _router;
  }

  config: IConfig;
  images: IAdsImage[] = [];

  async ngOnInit() {
    this.config = await this.configService.get();
    this.images = this.config.ads.flash.images;
  }
  
  onClose(event: Event) {
    event.stopPropagation();
    this.activeModal.close();
  }

  onClick() {
    this.activeModal.close();
  }

  onPrev(event: Event) {
    event.stopPropagation();
    this.carousel.prev()
  }

  onNext(event: Event) {
    event.stopPropagation();
    this.carousel.next()
  }
}
