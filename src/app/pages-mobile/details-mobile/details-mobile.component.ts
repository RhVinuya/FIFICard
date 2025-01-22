import { Location } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { INewCartBundle } from 'src/app/new-models/new-cart';
import { IonicSlides, ToastController } from '@ionic/angular';
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

register();


@Component({
  selector: 'app-details-mobile',
  templateUrl: './details-mobile.component.html',
  styleUrls: ['./details-mobile.component.scss']
})
export class DetailsMobileComponent implements OnInit {
  
  swiperModules = [IonicSlides];

  showPersonalize = false;
  personalize: INewPersonalize | undefined = undefined;
  personalizeData: INewPersonalizeData[] = [];

  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  cartService: NewCartService;
  toastController: ToastController;
  personalizeService: NewPersonalizeService;

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
  ) {
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

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.loading = true;
      this.id = params['id'];
      this.type = params['type'];
      console.log('details');
      console.log(this.type);

      if (this.type === 'cards') {
        this.itemType = "card";
        this.cardService.get(this.id).then(async value => {
          console.log('data');
          console.log(value);
          this.isAddToCart = true;
          let images = await this.cardService.getImages(this.id);
          this.model = new NewCard(value);
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


      console.log(this.model);
    });
  }

    async loadImages(items: INewCardImage[] | INewStickerImage[] | INewGiftImage[]) {
    if (items.length > 0) {
      this.images = [];
      for await (let item of items) {
        let url = await this.fileService.getImageURL(item.url);
        console.log(url);
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

  getPersonalizePrice(){
    if (this.type === 'cards' && this.isPersonalize) return (this.model as NewCard).getPersonalizePriceDisplay();
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
      return this.model.details.split('\n\n', 2)[1];

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
        mark: true
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
}
