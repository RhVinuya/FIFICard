import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewConfirmMessageComponent } from 'src/app/new-components/new-confirm-message/new-confirm-message.component';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { NewCart } from 'src/app/new-models/new-cart';
import { IConfig } from 'src/app/new-models/new-config';
import { ModelType } from 'src/app/new-models/new-enum';
import { INewGift, NewGift } from 'src/app/new-models/new-gift';
import { INewPostcard, NewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-cart-item',
  templateUrl: './new-cart-item.component.html',
  styleUrls: ['./new-cart-item.component.scss']
})
export class NewCartItemComponent implements OnInit {
  @Input() set cart(value: NewCart) {
    this.loadDetails(value);
  }
  @Output() onChangeMark: EventEmitter<boolean> = new EventEmitter()
  @Output() onRemoveItem: EventEmitter<string> = new EventEmitter()

  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  modalService: NgbModal;
  configService: NewConfigService;
  config: IConfig;
  router: Router;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _modalService: NgbModal,
    _configService: NewConfigService,
    _router: Router
  ) { 
    this.configService = _configService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
    this.modalService = _modalService;
    this.router = _router;
  }

  model: ModelType | undefined = undefined;
  _cart: NewCart | undefined = undefined;
  primary: string = '';
  bundleDetails: string = '';
  cardbundle: boolean = false;
  isDiscounted: boolean = false;
  isAvailable: boolean = true;

  ngOnInit() {
  }

  async loadDetails(cart: NewCart) {
    this._cart = cart; 
    this.config = await this.configService.get();

    if (this._cart.type === 'card') {
      let iCard = this._cart.item as INewCard;
      this.model = new NewCard(iCard as INewCard, this.config);

      this.isDiscounted = (this.model as NewCard).isDiscounted() ?? false;
      let images = await this.cardService.getImages(this._cart.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
      this.cardbundle = iCard.cardbundle;
    }
    else if (this._cart.type === 'sticker') {
      let iSticker = this._cart.item as INewSticker;
      this.model = new NewSticker(iSticker as INewSticker, this.config);
      let images = await this.stickerService.getImages(this._cart.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this._cart.type === 'postcard') {
      let iPostcard = this._cart.item as INewPostcard;
      this.model = new NewPostcard(iPostcard as INewPostcard, this.config);
      if (this._cart.bundle){
        this.bundleDetails = 'Bundle of ' + this._cart.bundle.countDisplay()+ ' pcs'
      }
      let images = await this.postcardService.getImages(this._cart.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this._cart.type === 'gift') {
      let iGift = this._cart.item as INewGift;
      this.model = new NewGift(iGift as INewGift, this.config);
      let images = await this.giftService.getImages(this._cart.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
  }

  async loadImage(url: string) {
    this.primary = await this.fileService.getImageURL(url);
  }

  getAmount() {
    if (this._cart) {
      if (this._cart.type === 'postcard') {
        if (this._cart.bundle) return this._cart.bundle.priceDisplay()
        else return this._cart.priceDisplay();
      }
      else return this._cart.priceDisplay();
    }
    return '';
  }

  getDiscountedAmount() {
    if (this.model && this._cart) {
      if (this._cart.type === 'postcard') {
        if (this._cart.bundle) return this._cart.bundle.priceDisplay()
        else return this._cart.priceDisplay();
      }
      else return this._cart.personalize ? (this.model as NewCard).getPersonalizePriceDisplay(true) : (this.model as NewCard).priceDisplay();
    }
    return '';
  }

  onChange(e: any) {
    this.onChangeMark.emit(e.target.checked);
  }

  onRemove() {
    const reference = this.modalService.open(NewConfirmMessageComponent, { animation: true });
    reference.componentInstance.title = 'Remove';
    reference.componentInstance.message = "Are you sure to remove?";
    reference.componentInstance.yes = 'YES';
    reference.componentInstance.no = 'NO';
    let resultSubs = reference.componentInstance.result.subscribe((value: any) => {
      if (this._cart !== undefined && value) {
        this.onRemoveItem.emit(this._cart.id)
      }
      reference.close();
      resultSubs.unsubscribe();
    })
  }

  onOpen() {
    if (this._cart && this._cart.isActive && this._cart.isAvailable)  this.router.navigate(['/new/details/' + this._cart.type + '/' + this._cart.itemId])
  }
}
