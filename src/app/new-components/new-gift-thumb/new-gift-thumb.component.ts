import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConfig } from 'src/app/new-models/new-config';
import { INewGift, NewGift } from 'src/app/new-models/new-gift';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-gift-thumb',
  templateUrl: './new-gift-thumb.component.html',
  styleUrls: ['./new-gift-thumb.component.scss']
})
export class NewGiftThumbComponent implements OnInit {
  @Input() gift: INewGift;

  configService: NewConfigService;
  storageService: NewStorageService;
  giftService: NewGiftService;
  fileService: NewFileService;
  router: Router;

  constructor(
    _configService: NewConfigService, 
    _storageService: NewStorageService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _router: Router
  ) { 
    this.configService = _configService;
    this.storageService = _storageService;
    this.giftService = _giftService
    this.fileService = _fileService;
    this.router = _router;
  }

  config: IConfig;
  _gift: NewGift;
  primary: string = '';
  secondary: string = '';

  async ngOnInit(): Promise<void> {
    this.config = await this.configService.get();
    this.storageService.saveItemDetails(this.gift);

    this._gift = new NewGift(this.gift, this.config);

    let giftImages = await this.giftService.getImages(this._gift.id);
    if (giftImages.length > 0) {
      this.primary = await this.fileService.getImageURL(giftImages[0].url);
    }
    if (giftImages.length > 1) {
      this.secondary = await this.fileService.getImageURL(giftImages[1].url);
    }
    else {
      this.secondary = this.primary;
    }
  }

  onClick(){
    this.router.navigate(['/new/details/gift/' + this._gift.id])
  }
}
