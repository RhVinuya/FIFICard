import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewInYourCartComponent } from 'src/app/new-components/new-in-your-cart/new-in-your-cart.component';
import { NewVideoPlayerComponent } from 'src/app/new-components/new-video-player/new-video-player.component';
import { INewCard, INewCardImage, INewRating, NewCard } from 'src/app/new-models/new-card';
import { INewCartBundle } from 'src/app/new-models/new-cart';
import { IModelType, ModelType } from 'src/app/new-models/new-enum';
import { INewGiftImage, NewGift } from 'src/app/new-models/new-gift';
import { INewPostcardBundle, NewPostcard, NewPostcardBundle } from 'src/app/new-models/new-postcard';
import { INewStickerImage, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-details-mobile',
  templateUrl: './details-mobile.component.html',
  styleUrls: ['./details-mobile.component.scss']
})
export class DetailsMobileComponent implements OnInit {

  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  cartService: NewCartService;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _cartService: NewCartService,
  ) {
    this.activateRoute = _activateRoute;
  }

  loading: boolean = false;
  id: string;
  type: 'card' | 'sticker' | 'postcard' | 'gift';
  model: ModelType;
  iModel: IModelType;
  bundles: NewPostcardBundle[] = [];
  images: string[] = [];
  rate: number = 0;
  qr: string = '';

  isAddToCart: boolean = false;
  isBundle: boolean = false;
  isPersonalize: boolean = false;
  isFeatured: boolean = false;
  isPoetry: boolean = false;
  isRegular: boolean = false;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.loading = true;
      this.id = params['id'];
      this.type = params['type'];

      if (this.type === 'card') {
        this.cardService.get(this.id).then(async value => {
          this.isAddToCart = true;
          let images = await this.cardService.getImages(this.id);
          this.loadImages(images);
          let qrImage = images.find(x => x.title === 'QR');
          if (qrImage) {
            this.qr = await this.fileService.getImageURL(qrImage.url);
          }
          this.loadRatings(await this.cardService.getRatings(this.id));
        })
      }
      else if (this.type === 'sticker') {
        this.stickerService.get(this.id).then(async value => {
          this.iModel = value;
          this.model = new NewSticker(value);
          this.isAddToCart = true;
          this.isFeatured = this.model.featured;
          this.loading = false;
          this.loadImages(await this.stickerService.getImages(this.id));
          this.loadRatings(await this.cardService.getRatings(this.id));
        })
      }
      else if (this.type === 'postcard') {
        this.postcardService.get(this.id).then(async value => {
          this.iModel = value;
          this.model = new NewPostcard(value);
          this.isBundle = true;
          this.isFeatured = this.model.featured;
          this.loading = false;
          this.loadImages(await this.postcardService.getImages(this.id));
          let ibundles = await this.postcardService.getBundles(this.id);
          ibundles.sort((a, b) => { return a.price - b.price });
          ibundles.forEach(ibundle => {
            this.bundles.push(new NewPostcardBundle(ibundle));
          })
          this.loadRatings(await this.cardService.getRatings(this.id));
        })
      }
      else if (this.type === 'gift') {
        this.giftService.get(this.id).then(async value => {
          this.iModel = value;
          this.model = new NewGift(value);
          this.isAddToCart = true;
          this.isFeatured = this.model.featured;
          this.loading = false;
          this.loadImages(await this.giftService.getImages(this.id));
          this.loadRatings(await this.cardService.getRatings(this.id));
        })
      }
    });
  }

    async loadImages(items: INewCardImage[] | INewStickerImage[] | INewGiftImage[]) {
    if (items.length > 0) {
      this.images = [];
      for await (let item of items) {
        let url = await this.fileService.getImageURL(item.url);
        this.images = [...this.images, url]
      }
    }
  }

  loadRatings(ratings: INewRating[]) {
    let value: number = 0;
    ratings.forEach(rating => {
      value = value + rating.rate;
    })
    this.rate = value / ratings.length;
  }

  getPrice() {
    if (this.type === 'card') return (this.model as NewCard).priceDisplay();
    else if (this.type === 'sticker') return (this.model as NewSticker).priceDisplay();
    else if (this.type === 'gift') return (this.model as NewGift).priceDisplay();
    else return '';
  }

  getPersonalizePrice(){
    if (this.type === 'card' && this.isPersonalize) return (this.model as NewCard).getPersonalizePriceDisplay();
    else return ''
  }

  async onClickBundle(bundle: INewPostcardBundle) {
    this.cartService.add({
      id: '',
      itemId: this.id,
      userId: '',
      price: 0,
      sgprice: 0,
      usprice: 0,
      type: 'postcard',
      bundle: {
        count: bundle.count,
        price: bundle.price,
        sgprice: bundle.sgprice,
        usprice: bundle.usprice,
      } as INewCartBundle,
      personalize: undefined,
      mark: true
    })
  }

  getICard() {
    return this.iModel as INewCard;
  }

  playInstruction() {
  }

}