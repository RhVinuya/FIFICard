import { Location } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { INewCartBundle } from 'src/app/new-models/new-cart';
import { IonicSlides, IonImg, Platform, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INewGiftImage, NewGift } from 'src/app/new-models/new-gift';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';
import { IModelType, ItemType, ModelType } from 'src/app/new-models/new-enum';
import { INewStickerImage, NewSticker } from 'src/app/new-models/new-sticker';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewPersonalizeService } from 'src/app/new-services/new-personalize.service';
import { INewPersonalize, INewPersonalizeData, INewPersonalizeDetail } from 'src/app/new-models/new-personalize';
import { INewCard, INewCardImage, INewRating, NewCard } from 'src/app/new-models/new-card';
import { INewPostcardBundle, NewPostcard, NewPostcardBundle } from 'src/app/new-models/new-postcard';
import { NewInYourCartComponent } from 'src/app/new-components/new-in-your-cart/new-in-your-cart.component';
import { NewVideoPlayerComponent } from 'src/app/new-components/new-video-player/new-video-player.component';
import { IConfig } from 'src/app/new-models/new-config';
import { NewConfigService } from 'src/app/new-services/new-config.service';

register();


@Component({
  selector: 'app-details-mobile',
  templateUrl: './details-mobile.component.html',
  styleUrls: ['./details-mobile.component.scss']
})
export class DetailsMobileComponent implements OnInit {
  
  swiperModules = [IonicSlides];

  isDiscounted = false;
  showPersonalize = false;
  personalize: INewPersonalize | undefined = undefined;
  personalizeData: INewPersonalizeData[] = [];

  imageDimensions: { width: number; height: number }[] = [];

  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  cartService: NewCartService;
  toastController: ToastController;
  personalizeService: NewPersonalizeService;
  configService: NewConfigService;
  config: IConfig;

  form = new FormGroup({
    recipient: new FormControl<string>('', [Validators.required]),
    emailto: new FormControl<string>('', [Validators.required, Validators.email]),
    message: new FormControl<string>('', [Validators.required]),
    sender: new FormControl<string>('', [Validators.required]),
    emailfrom: new FormControl<string>('', [Validators.required, Validators.email]),
  });


  constructor(
    _personalizeService: NewPersonalizeService,
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _cartService: NewCartService,
    _toastController: ToastController,
    public router: Router,
    private location: Location,
    _configService: NewConfigService,
    public platform: Platform
  ) { 
    this.configService = _configService;
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
    this.cartService = _cartService;
    this.toastController = _toastController;
    this.personalizeService = _personalizeService;
    
  }

  loading: boolean = false;
  id: string;
  type: 'cards' | 'stickers' | 'postcards' | 'gifts';
  itemType: ItemType;
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

  async ngOnInit() {
    this.config = await this.configService.get();

    this.activateRoute.params.subscribe(params => {
      this.loading = true;
      this.id = params['id'];
      this.type = params['type'];
      this.bundles = [];
      this.personalizeData = [];

      if (this.type === 'cards') {
        this.itemType = "card";
        this.cardService.get(this.id).then(async value => {
          this.isAddToCart = true;
          let images = await this.cardService.getImages(this.id);
          this.model = new NewCard(value, this.config);
          this.isDiscounted = (this.model as NewCard).isDiscounted();
          this.isPersonalize = this.model instanceof NewCard ? this.model.signAndSend : false;
          this.iModel = value;
          this.loadImages(images);
          let qrImage = images.find(x => x.title === 'QR');
          if (qrImage) {
            this.qr = await this.fileService.getImageURL(qrImage.url);
          }
          this.loadRatings(await this.cardService.getRatings(this.id));
        })
      }
      else if (this.type === 'stickers') {
        this.itemType = "sticker";
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
      else if (this.type === 'postcards') {
        this.itemType = "postcard";
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
      else if (this.type === 'gifts') {
        this.itemType = "gift";
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
    if (this.type === 'cards') return (this.model as NewCard).priceDisplay();
    else if (this.type === 'stickers') return (this.model as NewSticker).priceDisplay();
    else if (this.type === 'gifts') return (this.model as NewGift).priceDisplay();
    else return '';
  }

  getPersonalizePrice(discounted: boolean = false){
    if (this.type === 'cards' && this.isPersonalize) return (this.model as NewCard).getPersonalizePriceDisplay(discounted);
    else return ''
  }

  getOriginalPrice() {
    if (this.type === 'cards') return (this.model as NewCard).originalPriceDisplay();
    else if (this.type === 'stickers') return (this.model as NewSticker);
    else if (this.type === 'gifts') return (this.model as NewGift);
    else return '';
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
      mark: true,
      datetime: (new Date()).getTime()
    })

    const toast = await this.toastController.create({
      message: 'Postcard bundle is added on the Cart',
      duration: 1500,
      position: 'top',
    });
    await toast.present();
    this.goToCart();
  }

  getICard() {
    return this.iModel as INewCard;
  }

  playInstruction() {
  }

  getMessage(version: 'short' | 'long') {
    if(version == 'short')
      return this.model.details.split('\n\n', 3)[1];

    return this.model.details;
  }

  async addToCart() {
      let card: NewCard = (this.model as NewCard);
      let isDiscounted = card.isDiscounted();

      this.cartService.add({
        id: '',
        itemId: card!.id,
        userId: '',
        price: card.getPersonalizePHPrice(isDiscounted),
        sgprice: card.getPersonalizeSGPrice(isDiscounted),
        usprice: card.getPersonalizeUSPrice(isDiscounted),
        type: 'card',
        bundle: undefined,
        personalize: this.personalize,
        mark: true,
        datetime: (new Date()).getTime()
      });

      const toast = await this.toastController.create({
        message: 'Personalized card is added on the Cart',
        duration: 1500,
        position: 'top',
      });
      await toast.present();
      this.router.navigate(['/cart']);

  }

  goToCart() {
    this.router.navigateByUrl('/cart');
  }

  goBack() {
    this.location.back();
  }

  async addPersonalize() {
    this.showPersonalize = !!!this.showPersonalize;

    if (this.showPersonalize && this.personalize === undefined) {

      this.personalize = await this.personalizeService.getByCard(this.model.id)
      if (this.personalize === undefined) this.personalize = await this.personalizeService.create(this.model.id);

      this.personalize.data = this.personalize.data.filter( (v, i) => { return this.personalize?.data.indexOf(v) == i });

      if (this.personalize.data.length === 0) {
        let signAndSends = await this.cardService.getSignAndSend(this.personalize.itemId);
        
        for await (let signAndSend of signAndSends) {
          let idx = this.personalizeData.findIndex(x => x.image === signAndSend.image);
          if (idx < 0) {
            let url = await this.fileService.getImageURL(signAndSend.image);
            this.personalizeData.push({
              image: signAndSend.image,
              url: url,
              details: [{
                id: signAndSend.id,
                code: signAndSend.code,
                height: signAndSend.height,
                width: signAndSend.width,
                top: signAndSend.top,
                left: signAndSend.left,
                text: '',
                font: 'Open Sans',
                color: '#000000',
                size: 18,
                alignment: 'center'
              }]
            })
          }
          else {
            this.personalizeData[idx].details.push({
              id: signAndSend.id,
              code: signAndSend.code,
              height: signAndSend.height,
              width: signAndSend.width,
              top: signAndSend.top,
              left: signAndSend.left,
              text: '',
              font: 'Open Sans',
              color: '#000000',
              size: 18,
              alignment: 'center'
            })
          }
        }
        this.personalize.data = this.personalizeData;
        this.personalizeService.save(this.personalize);
      } else {
        this.personalizeData = this.personalize.data;
      }

    }
  }

  changeTextarea(detail: INewPersonalizeDetail) {
    this.personalizeData.forEach(data => {
      let idx = data.details.findIndex(x => x.id === detail.id);
      data.details[idx] = detail;
    })
    this.personalize!.data = this.personalizeData
    this.personalizeService.save(this.personalize!);
  }

  getRecipients() {
    return this.model.recipients?.join(', ');
  }

  getHeight(height: number, index: number) {
    const imgHeight = this.imageDimensions[index]?.height || 1;
    const imgWidth = this.imageDimensions[index]?.width || 1; 
    const clampedHeight = 1400 * (imgHeight / imgWidth);
    const heightPercentage = (( height * ( imgHeight/clampedHeight ) ) / imgHeight) * 100;
    return `${heightPercentage}%`;
  }

  getWidth(width: number, index: number) {

    const widthPercentage = (( width * ( this.platform.width()/1400 ) ) / this.platform.width()) * 100; // Convert pixels to percentage
    return `${widthPercentage}%`;
  }

  getTop(topInPx: number, index: number) {
    const imgHeight = this.imageDimensions[index]?.height || 1;
    const imgWidth = this.imageDimensions[index]?.width || 1; 
    const clampedTop = 1400 * (imgHeight / imgWidth);
    const topPercentage = (( topInPx * ( imgHeight/clampedTop ) ) / imgHeight) * 100; // Convert pixels to percentage
    return `${topPercentage}%`;
  }

  getLeft(leftInPx: number, index: number) {
    const imgWidth: number = this.imageDimensions[index]?.width || 1; // Use a default of 1 to avoid division by zero
    const leftPercentage = (( leftInPx * ( imgWidth/1400 ) ) / imgWidth) * 100; // Convert pixels to percentage
    
    return `${leftPercentage}%`;
  }

  getBackground(url: string) {
    return "url("+url+")";
  }

  imageLoaded(index:number, event:any) {
    const img = event.target as HTMLImageElement;
    this.imageDimensions[index] = { width: img.clientWidth, height: img.clientHeight };
  }
}
