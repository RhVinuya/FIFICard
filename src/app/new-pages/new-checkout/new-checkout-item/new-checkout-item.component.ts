import { Component, Input, OnInit } from '@angular/core';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { INewCart } from 'src/app/new-models/new-cart';
import { INewPaymentItem } from 'src/app/new-models/new-payment';
import { INewPostcard, NewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-checkout-item',
  templateUrl: './new-checkout-item.component.html',
  styleUrls: ['./new-checkout-item.component.scss']
})
export class NewCheckoutItemComponent implements OnInit {
  @Input() set item(value: INewPaymentItem){
    this.iItem = value;
  }

  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  fileService: NewFileService;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _fileService: NewFileService
  ) { 
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.fileService = _fileService;
  }

  iItem: INewPaymentItem;
  model: NewCard | NewSticker | NewPostcard | undefined = undefined;
  primary: string = '';
  bundleDetails: string = ''

  async ngOnInit(): Promise<void> {
    if (this.iItem.type === 'card') {
      let iCard = await this.cardService.get(this.iItem.itemid);
      this.model = new NewCard(iCard as INewCard);
      let images = await this.cardService.getImages(this.iItem.itemid);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iItem.type === 'sticker') {
      let iSticker = await this.stickerService.get(this.iItem.itemid);
      this.model = new NewSticker(iSticker as INewSticker);
      let images = await this.stickerService.getImages(this.iItem.itemid);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this.iItem.type === 'postcard') {
      let iPostcard = await this.postcardService.get(this.iItem.itemid);
      this.model = new NewPostcard(iPostcard as INewPostcard);
      if (this.iItem.bundle){
        this.bundleDetails = 'Bundle of ' + this.iItem.bundle.count.toLocaleString() + ' pcs'
      }
      let images = await this.postcardService.getImages(this.iItem.itemid);
      if (images.length > 0) this.loadImage(images[0].url)
    }
  }

  async loadImage(url: string) {
    this.primary = await this.fileService.getImageURL(url);
  }

  convertAmount(value: number) {
    return '₱ ' + value.toLocaleString('en-US', { minimumFractionDigits: 2 })
  }
}