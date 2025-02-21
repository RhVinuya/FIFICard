import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IAdsImage, IConfig } from 'src/app/new-models/new-config';
import { NewConfigService } from 'src/app/new-services/new-config.service';

@Component({
  selector: 'app-ads-modal-mobile',
  templateUrl: './ads-modal-mobile.component.html',
  styleUrls: ['./ads-modal-mobile.component.scss'],
})
export class AdsModalMobileComponent implements OnInit {

  configService: NewConfigService;
  router: Router;
  modalCtrl: ModalController;

  constructor(
    _configService: NewConfigService,
    _router: Router,
    _modalCtrl: ModalController
  ) {
    this.configService = _configService;
    this.router = _router;
    this.modalCtrl = _modalCtrl;
  }

  config: IConfig;
  images: IAdsImage[] = [];

  async ngOnInit() {
    this.config = await this.configService.get();
    this.images = this.config.ads.flashmobile.images;
  }

  onClick(image: IAdsImage) {
    this.modalCtrl.dismiss();
    if (image.linktype === 'external') window.open(image.url, '_blank');
    else if (image.linktype === 'internal') this.router.navigate([image.url]);
  }

  onClose() {
    this.modalCtrl.dismiss();
  }

}
