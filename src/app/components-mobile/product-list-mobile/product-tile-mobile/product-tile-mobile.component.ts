import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { IConfig } from 'src/app/new-models/new-config';
import { INewGift, NewGift } from 'src/app/new-models/new-gift';
import { INewPostcard, NewPostcard, NewPostcardBundle } from 'src/app/new-models/new-postcard';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-product-tile-mobile',
  templateUrl: './product-tile-mobile.component.html',
  styleUrls: ['./product-tile-mobile.component.scss']
})
export class ProductTileMobileComponent implements OnInit {

  @Input() iproduct: INewCard | INewSticker | INewPostcard | INewGift;
  @Input() type: string;

  router: Router;
  isDiscounted = false;

  configService: NewConfigService;
  fileService: NewFileService;
  cardService: NewCardService;
  postcardService: NewPostcardService;
  storageService: NewStorageService;

  product: NewCard | NewSticker | NewPostcard | NewGift;
  min: NewPostcardBundle;
  max: NewPostcardBundle;
  
  isBundle: boolean = false;
  isPersonalize: boolean = false;

  primary: string = 'https://ionicframework.com/docs/img/demos/card-media.png';
  secondary: string = 'https://ionicframework.com/docs/img/demos/card-media.png';

  config: IConfig;
  
  constructor(
    _configService: NewConfigService,
    _storageService: NewStorageService,
    _cardService: NewCardService,
    _fileService: NewFileService,
    _postcardService: NewPostcardService,
    _router: Router
  ) { 
    this.configService = _configService;
    this.storageService = _storageService;
    this.cardService = _cardService;
    this.postcardService = _postcardService;
    this.fileService = _fileService;
    this.router = _router;
  }

  async ngOnInit(): Promise<void> {

    this.config = await this.configService.get();

    switch(this.type) {
      case 'cards':  
          this.product = new NewCard(this.iproduct as INewCard, this.config);
          this.isPersonalize = this.product instanceof NewCard ?  this.product.signAndSend : false;
          this.isDiscounted = (this.product as NewCard).isDiscounted();
        break;
      case 'stickers':  
          this.product = new NewSticker(this.iproduct  as INewSticker);
        break;
      case 'postcards':  
          this.product = new NewPostcard(this.iproduct as INewPostcard);
          this.isBundle = true;

          let bundles = await this.postcardService.getBundles(this.product.id);

          if (bundles.length > 0) {
            bundles.sort((a, b) => { return a.price - b.price });
            this.min = new NewPostcardBundle(bundles[0]);
            this.max = new NewPostcardBundle(bundles[bundles.length - 1]); 
          }
        break;
      case 'gifts':  
          this.product = new NewGift(this.iproduct as INewGift);
        break;
    }

    let cardImages = await this.cardService.getImages(this.product.id);
    if (cardImages.length > 0) {
      this.primary = await this.fileService.getImageURL(cardImages[0].url); //.split(".png").join('_74x100.png'));
    }
    if (cardImages.length > 1) {
      this.secondary = await this.fileService.getImageURL(cardImages[1].url);
    }
    else {
      this.secondary = this.primary;
    }
  }

  gotoDetails(){
    this.router.navigateByUrl(`/${this.type}/${this.product.id}/details`);
  }


  getPrice() {
    if (this.type === 'cards') return (this.product as NewCard).priceDisplay();
    else if (this.type === 'stickers') return (this.product as NewSticker).priceDisplay();
    else if (this.type === 'gifts') return (this.product as NewGift).priceDisplay();
    else return '';
  }

  getPersonalizePrice(discounted: boolean = false){
    if (this.type === 'cards' && this.isPersonalize) return (this.product as NewCard).getPersonalizePriceDisplay(discounted);
    else return ''
  }

  getOriginalPrice() {
    if (this.type === 'cards') return (this.product as NewCard).originalPriceDisplay();
    else if (this.type === 'stickers') return (this.product as NewSticker);
    else if (this.type === 'gifts') return (this.product as NewGift);
    else return '';
  }

  
}
