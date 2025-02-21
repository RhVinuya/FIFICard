import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewCard } from 'src/app/new-models/new-card';
import { NewCart } from 'src/app/new-models/new-cart';
import { IConfig } from 'src/app/new-models/new-config';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-cart-view',
  templateUrl: './new-cart-view.component.html',
  styleUrls: ['./new-cart-view.component.scss']
})
export class NewCartViewComponent implements OnInit {
  @Input() cart: NewCart;
  @Output() delete: EventEmitter<string> = new EventEmitter();

  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  configService: NewConfigService;
  config: IConfig;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _configService: NewConfigService,
  ) { 
    this.configService = _configService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
  }

  image: string = '';
  name: string = '';
  description: string = '';
  price: string = '';
  bundle: string = '';
  cardbundle: boolean = false;

  isDiscounted: boolean = false;
  discountPrice: string = '';

  async ngOnInit(): Promise<void> {
    this.config = await this.configService.get();

    if (this.cart.type === 'card') {
      let iCard = await this.cardService.get(this.cart.itemId);

      if (iCard) {
        let model = new NewCard(iCard, this.config);
        this.isDiscounted = model.isDiscounted() ?? false;

        this.name = iCard.name;
        this.description = iCard.description;

        if (this.isDiscounted) {
          this.discountPrice = (this.cart.personalize) ? model.getPersonalizePriceDisplay(this.isDiscounted) : model.priceDisplay()
        }

        this.price =  this.cart.priceDisplay()

        let images = await this.cardService.getImages(this.cart.itemId);
        if (images.length > 0) {
          this.fileService.getImageURL(images[0].url).then(value => this.image = value)
        }
        this.cardbundle = iCard.cardbundle;
      }
    }
    if (this.cart.type === 'sticker') {
      let iSticker = await this.stickerService.get(this.cart.itemId);
      if (iSticker) {
        this.name = iSticker.name;
        this.description = iSticker.description;
        this.price = this.cart.priceDisplay()
        let images = await this.stickerService.getImages(this.cart.itemId);
        if (images.length > 0) {
          this.fileService.getImageURL(images[0].url).then(value => this.image = value)
        }
      }
    }
    if (this.cart.type === 'postcard') {
      let iPostcard = await this.postcardService.get(this.cart.itemId);
      if (iPostcard) {
        this.name = iPostcard.name;
        this.description = iPostcard.description;
        if (this.cart.bundle !== undefined) this.bundle = 'Bundle of ' + this.cart.bundle.countDisplay() + ' pcs for ' + '₱' + this.cart.bundle.priceDisplay()
        let images = await this.postcardService.getImages(this.cart.itemId);
        if (images.length > 0) {
          this.fileService.getImageURL(images[0].url).then(value => this.image = value)
        }
      }
    }
    if (this.cart.type === 'gift') {
      let iGift = await this.giftService.get(this.cart.itemId);
      if (iGift) {
        this.name = iGift.name;
        this.description = iGift.description;
        this.price = this.cart.priceDisplay()
        let images = await this.giftService.getImages(this.cart.itemId);
        if (images.length > 0) {
          this.fileService.getImageURL(images[0].url).then(value => this.image = value)
        }
      }
    }
  }

  onDelete() {
    this.delete.emit(this.cart.id)
  }

}
