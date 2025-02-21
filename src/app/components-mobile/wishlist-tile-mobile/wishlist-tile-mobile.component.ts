import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewConfirmMessageComponent } from 'src/app/new-components/new-confirm-message/new-confirm-message.component';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { IConfig } from 'src/app/new-models/new-config';
import { INewGift, NewGift } from 'src/app/new-models/new-gift';
import { INewPostcard, NewPostcard, NewPostcardBundle } from 'src/app/new-models/new-postcard';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { IWishlist } from 'src/app/new-pages/new-wishlist/new-wishlist.component';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-wishlist-tile-mobile',
  templateUrl: './wishlist-tile-mobile.component.html',
  styleUrls: ['./wishlist-tile-mobile.component.scss']
})
export class WishlistTileMobileComponent implements OnInit {

  @Input() wishlist: IWishlist;
  @Output() onRemoveItem: EventEmitter<string> = new EventEmitter()

  fileService: NewFileService;
  cardService: NewCardService;
  postcardService: NewPostcardService;
  storageService: NewStorageService;
  modalService: NgbModal;
  configService: NewConfigService;

  product: NewCard | NewSticker | NewPostcard | NewGift;
  type: string;
  isBundle: boolean = false;
  isPersonalize: boolean = false;

  primary: string = 'https://ionicframework.com/docs/img/demos/card-media.png';
  secondary: string = 'https://ionicframework.com/docs/img/demos/card-media.png';

  min: NewPostcardBundle;
  max: NewPostcardBundle;
  config: IConfig;
  
  constructor(
    public router: Router,
    _postcardService: NewPostcardService,
    _storageService: NewStorageService,
    _cardService: NewCardService,
    _fileService: NewFileService,
    _modalService: NgbModal,
    _configService: NewConfigService,
  ) { 
    this.configService = _configService;
    this.storageService = _storageService;
    this.cardService = _cardService;
    this.postcardService = _postcardService;
    this.fileService = _fileService;
    this.modalService = _modalService;
  }

  async ngOnInit():  Promise<void> {
    this.config = await this.configService.get();
    this.product = this.wishlist.model;
    let type = this.wishlist.type;

    console.log(type);
    switch(type) {
      case 'card':   
          this.type = "cards";
          this.product = new NewCard(this.product as INewCard, this.config);
          this.isPersonalize = this.product instanceof NewCard ?  this.product.signAndSend : false;
        break;
      case 'sticker':  
        this.type = "stickers";
          this.product = new NewSticker(this.product  as INewSticker);
        break;
      case 'postcard':  
          this.type = "postcards";
          this.product = new NewPostcard(this.product as INewPostcard);
          this.isBundle = true;

          let bundles = await this.postcardService.getBundles(this.product.id);

          if (bundles.length > 0) {
            bundles.sort((a, b) => { return a.price - b.price });
            this.min = new NewPostcardBundle(bundles[0]);
            this.max = new NewPostcardBundle(bundles[bundles.length - 1]); 
          }
        break;
      case 'gift':  
          this.type = "gifts";
          this.product = new NewGift(this.product as INewGift);
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


  getPrice() {
    if (this.type === 'cards') return (this.product as NewCard).priceDisplay();
    else if (this.type === 'stickers') return (this.product as NewSticker).priceDisplay();
    else if (this.type === 'gifts') return (this.product as NewGift).priceDisplay();
    else return '';
  }

  getPersonalizePrice(){
    if (this.type === 'cards' && this.isPersonalize) return (this.product as NewCard).getPersonalizePriceDisplay();
    else return ''
  }

  gotoDetails() {
    this.router.navigateByUrl(this.type + "/" + this.product.id + "/details")
  }

  onRemove() {
    const reference = this.modalService.open(NewConfirmMessageComponent, { animation: true });
    reference.componentInstance.title = 'Remove';
    reference.componentInstance.message = "Are you sure to remove?";
    reference.componentInstance.yes = 'YES';
    reference.componentInstance.no = 'NO';
    let resultSubs = reference.componentInstance.result.subscribe( async (value: any) => {
        if(value) {
          this.onRemoveItem.emit(this.product.id)
        }
        
        reference.close();
    })

    reference.result.then(_ => {
      resultSubs.unsubscribe();
    });
  }


}
