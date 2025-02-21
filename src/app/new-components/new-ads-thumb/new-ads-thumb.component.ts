import { Component, OnInit } from '@angular/core';
import { IAdsImage, IConfig } from 'src/app/new-models/new-config';
import { NewConfigService } from 'src/app/new-services/new-config.service';

@Component({
  selector: 'app-new-ads-thumb',
  templateUrl: './new-ads-thumb.component.html',
  styleUrls: ['./new-ads-thumb.component.scss'],
})
export class NewAdsThumbComponent  implements OnInit {

  configService: NewConfigService;

  constructor(
    _configService: NewConfigService
  ) { 
    this.configService = _configService;
  }

  config: IConfig;
  images: IAdsImage[] = [];

  async ngOnInit() {
    this.config = await this.configService.get();
    this.images = this.config.ads.thumb.images;
  }

}
