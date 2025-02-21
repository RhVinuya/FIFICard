import { Component, Input, OnInit } from '@angular/core';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { IConfig } from 'src/app/new-models/new-config';
import { INewGift, NewGift } from 'src/app/new-models/new-gift';
import { INewPaymentItem, NewPaymentItem } from 'src/app/new-models/new-payment';
import { INewPostcard, NewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-checkout-item',
  templateUrl: './new-checkout-item.component.html',
  styleUrls: ['./new-checkout-item.component.scss']
})
export class NewCheckoutItemComponent implements OnInit {
  @Input() set iItem(value: INewPaymentItem){
    this.item = new NewPaymentItem(value, this.locationService.getlocation());
  }

  locationService: NewLocationService;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  configService: NewConfigService;
  config: IConfig;

  constructor(
    _locationService: NewLocationService,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _configService: NewConfigService,
  ) { 
    this.configService = _configService;
    this.locationService = _locationService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
  }

  item: NewPaymentItem;
  model: NewCard | NewSticker | NewPostcard | undefined = undefined;
  primary: string = '';
  bundleDetails: string = ''

  async ngOnInit(): Promise<void> {
    this.config = await this.configService.get();

    if (this.item.type === 'card') {
      let iCard = await this.cardService.get(this.item.itemId);
      this.model = new NewCard(iCard as INewCard, this.config);
      let images = await this.cardService.getImages(this.item.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.item.type === 'sticker') {
      let iSticker = await this.stickerService.get(this.item.itemId);
      this.model = new NewSticker(iSticker as INewSticker);
      let images = await this.stickerService.getImages(this.item.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.item.type === 'postcard') {
      let iPostcard = await this.postcardService.get(this.item.itemId);
      this.model = new NewPostcard(iPostcard as INewPostcard);
      if (this.item.bundle){
        this.bundleDetails = 'Bundle of ' + this.item.bundle.countDisplay() + ' pcs'
      }
      let images = await this.postcardService.getImages(this.item.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.item.type === 'gift') {
      let iGift = await this.giftService.get(this.item.itemId);
      this.model = new NewGift(iGift as INewGift);
      let images = await this.giftService.getImages(this.item.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
  }

  async loadImage(url: string) {
    this.primary = await this.fileService.getImageURL(url);
  }
}
