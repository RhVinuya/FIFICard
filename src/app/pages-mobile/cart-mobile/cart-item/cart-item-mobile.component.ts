import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewConfirmMessageComponent } from 'src/app/new-components/new-confirm-message/new-confirm-message.component';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { INewCart, NewCart } from 'src/app/new-models/new-cart';
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
  selector: 'app-cart-item-mobile',
  templateUrl: './cart-item-mobile.component.html',
  styleUrls: ['./cart-item-mobile.component.scss']
})
export class CartItemMobileComponent implements OnInit, OnChanges  {
  @Input() set cart(value: INewCart) {
    this.loadDetails(value);
  }

  @Input() status: boolean = false;

  @Input() set forceMark(_forceMark: boolean) {
    if (_forceMark !== this.mark){
      this.mark = _forceMark;
    }
  }

  @Input() onCartUpdate: EventEmitter<INewCart> = new EventEmitter()

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

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _modalService: NgbModal,
    _configService: NewConfigService,
  ) { 
    this.configService = _configService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
    this.modalService = _modalService;
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  model: ModelType | undefined = undefined;
  _cart: NewCart | undefined = undefined;
  primary: string = '';
  bundleDetails: string = ''
  mark: boolean = false;

  ngOnInit() {
    this.mark = this.status;

  }

  async loadDetails(cart: INewCart) {
    
    this.config = await this.configService.get();

    this._cart = new NewCart(cart);
    this.mark = this._cart.mark;

    console.log(this._cart);
    if (this._cart.type === 'card') {
      let iCard = await this.cardService.get(this._cart.itemId);
      this.model = new NewCard(iCard as INewCard, this.config);
      let images = await this.cardService.getImages(this._cart.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this._cart.type === 'sticker') {
      let iSticker = await this.stickerService.get(this._cart.itemId);
      this.model = new NewSticker(iSticker as INewSticker, this.config);
      let images = await this.stickerService.getImages(this._cart.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this._cart.type === 'postcard') {
      let iPostcard = await this.postcardService.get(this._cart.itemId);
      this.model = new NewPostcard(iPostcard as INewPostcard, this.config);
      if (this._cart.bundle){
        this.bundleDetails = 'Bundle of ' + this._cart.bundle.countDisplay()+ ' pcs'
      }
      let images = await this.postcardService.getImages(this._cart.itemId);
      if (images.length > 0) this.loadImage(images[0].url)
    }
    else if (this._cart.type === 'gift') {
      let iGift = await this.giftService.get(this._cart.itemId);
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
}
