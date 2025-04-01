import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { INewCartBundle } from 'src/app/new-models/new-cart';
import { IConfig } from 'src/app/new-models/new-config';
import { IModelType, ItemType } from 'src/app/new-models/new-enum';
import { INewGift, NewGift } from 'src/app/new-models/new-gift';
import { INewPostcardBundle, NewPostcardBundle } from 'src/app/new-models/new-postcard';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-promo-suggestions-item',
  templateUrl: './new-promo-suggestions-item.component.html',
  styleUrls: ['./new-promo-suggestions-item.component.scss']
})
export class NewPromoSuggestionsItemComponent {
  @Input() set item(value: IModelType) {
    this.itemValue = value;
  }
  @Output() click: EventEmitter<string> = new EventEmitter();

  configService: NewConfigService;
  fileService: NewFileService;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  cartService: NewCartService;
  toastController: ToastController;

  constructor(
    _configService: NewConfigService,
    _fileService: NewFileService,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _cartService: NewCartService,
    _toastController: ToastController,
  ) {
    this.configService = _configService;
    this.fileService = _fileService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.cartService = _cartService;
    this.toastController = _toastController;
  }

  itemValue: IModelType;
  config: IConfig;
  type: ItemType;
  image: string = '';
  price: number = 0;
  usprice: number = 0;
  sgprice: number = 0;
  bundle: INewCartBundle | undefined = undefined;
  isDiscounted: boolean = false;
  originalDisplay: string = '';
  priceDisplay: string = '';
  loading: boolean = false;

  async ngOnInit() {
    this.config = await this.configService.get()
    this.type = this.itemValue.type;
    if (this.type === 'card') {
      let images = await this.cardService.getImages(this.itemValue.id, true);
      if (images.length > 0) {
        this.image = await this.fileService.getImageURL(images[0].url);
      }
      let card: NewCard = new NewCard(this.itemValue as INewCard, this.config);
      this.price = card.price;
      this.usprice = card.usprice;
      this.sgprice = card.sgprice;
      this.isDiscounted = card.isDiscounted();
      if (card.isDiscounted()) this.originalDisplay = card.originalPriceDisplay();
      this.priceDisplay = card.priceDisplay()
    }
    else if (this.type === 'sticker') {
      let images = await this.stickerService.getImages(this.itemValue.id, true);
      if (images.length > 0) {
        this.image = await this.fileService.getImageURL(images[0].url);
      }
      let sticker: NewSticker = new NewSticker(this.itemValue as INewSticker)
      this.price = sticker.price;
      this.usprice = sticker.usprice;
      this.sgprice = sticker.sgprice;
      this.priceDisplay = sticker.priceDisplay()
    }
    else if (this.type === 'postcard') {
      let images = await this.postcardService.getImages(this.itemValue.id, true);
      if (images.length > 0) {
        this.image = await this.fileService.getImageURL(images[0].url);
      }
      let bundles: INewPostcardBundle[] = await this.postcardService.getBundles(this.itemValue.id);
      if (bundles.length > 0) {
        bundles.sort((a, b) => { return a.price - b.price });
        let bundle: NewPostcardBundle = new NewPostcardBundle(bundles[0]);
        this.price = bundle.price;
        this.usprice = bundle.usprice;
        this.sgprice = bundle.sgprice;
        this.bundle = {
          count: bundle.count,
          price: bundle.price,
          sgprice: bundle.sgprice,
          usprice: bundle.usprice
        }
        this.priceDisplay = bundle.priceDisplay()
      }
    }
    else if (this.type === 'gift') {
      let images = await this.giftService.getImages(this.itemValue.id, true);
      if (images.length > 0) {
        this.image = await this.fileService.getImageURL(images[0].url);
      }
      let gift: NewGift = new NewGift(this.itemValue as INewGift);
      this.price = gift.price;
      this.priceDisplay = gift.priceDisplay()
    }
  }

  async onAddToCart() {
    this.loading = true;
    let id = await this.cartService.add(
      {
        id: '',
        itemId: this.itemValue.id,
        userId: '',
        price: this.price,
        sgprice: this.sgprice,
        usprice: this.usprice,
        type: this.type,
        bundle: this.bundle && this.bundle,
        personalize: undefined,
        mark: true,
        datetime: (new Date()).getTime()
      }
    );
    let message: string = '';
    if (this.type === 'card') message = 'Card is added on the Cart';
    else if (this.type === 'sticker') message = 'Sticker is added on the Cart';
    else if (this.type === 'gift') message = 'Gift is added on the Cart';
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });
    await toast.present();
    this.click.emit(id);
    this.loading = true;
  }
}
