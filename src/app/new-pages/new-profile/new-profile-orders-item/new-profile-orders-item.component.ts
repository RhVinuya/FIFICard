import { Component, Input, OnInit } from '@angular/core';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { LocationType, ModelType } from 'src/app/new-models/new-enum';
import { INewGift, NewGift } from 'src/app/new-models/new-gift';
import { INewPaymentItem, NewPaymentItem } from 'src/app/new-models/new-payment';
import { INewPostcard, NewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-profile-orders-item',
  templateUrl: './new-profile-orders-item.component.html',
  styleUrls: ['./new-profile-orders-item.component.scss']
})
export class NewProfileOrdersItemComponent implements OnInit {
  @Input() iItem: INewPaymentItem;
  @Input() location: LocationType;

  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService
  ) { 
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
  }

  item: NewPaymentItem;
  model: ModelType | undefined = undefined;
  primary: string = '';
  bundleDetails: string = ''

  ngOnInit(): void {
    this.item = new NewPaymentItem(this.iItem, this.location)
    this.loadDetails();
  }

  async loadDetails() {
    if (this.iItem.type === 'card') {
      let iCard = await this.cardService.get(this.iItem.itemId);
      this.model = new NewCard(iCard as INewCard);
      let images = await this.cardService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iItem.type === 'sticker') {
      let iSticker = await this.stickerService.get(this.iItem.itemId);
      this.model = new NewSticker(iSticker as INewSticker);
      let images = await this.stickerService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iItem.type === 'postcard') {
      let iPostcard = await this.postcardService.get(this.iItem.itemId);
      this.model = new NewPostcard(iPostcard as INewPostcard);
      if (this.iItem.bundle){
        this.bundleDetails = 'Bundle of ' + this.iItem.bundle.count.toLocaleString() + ' pcs'
      }
      let images = await this.postcardService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iItem.type === 'gift') {
      let iGift = await this.giftService.get(this.iItem.itemId);
      this.model = new NewGift(iGift as INewGift);
      let images = await this.giftService.getImages(this.iItem.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
  }

  async loadImage(url: string) {
    this.primary = await this.fileService.getImageURL(url);
  }

  getPrice(){
    return '₱' + this.iItem.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
  }

  getShipping(){
    return this.iItem.shipping > 0 ? '₱' + this.iItem.shipping.toLocaleString('en-US', { minimumFractionDigits: 2 }) : 'FREE'
  }

  getTotal(){
    return '₱' + this.iItem.total.toLocaleString('en-US', { minimumFractionDigits: 2 })
  }
}
