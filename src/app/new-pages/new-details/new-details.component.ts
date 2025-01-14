import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NewInYourCartComponent } from 'src/app/new-components/new-in-your-cart/new-in-your-cart.component';
import { NewVideoPlayerComponent } from 'src/app/new-components/new-video-player/new-video-player.component';
import { INewCard, INewCardImage, INewRating, NewCard, NewRating } from 'src/app/new-models/new-card';
import { INewCartBundle } from 'src/app/new-models/new-cart';
import { IModelType, ModelType } from 'src/app/new-models/new-enum';
import { INewGift, INewGiftImage, NewGift } from 'src/app/new-models/new-gift';
import { INewPostcard, INewPostcardBundle, NewPostcard, NewPostcardBundle } from 'src/app/new-models/new-postcard';
import { INewSticker, INewStickerImage, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.component.html',
  styleUrls: ['./new-details.component.scss']
})
export class NewDetailsComponent implements OnInit {
  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  cartService: NewCartService;
  toastController: ToastController;
  offCanvas: NgbOffcanvas;
  modalService: NgbModal;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _cartService: NewCartService,
    _toastController: ToastController,
    _offCanvas: NgbOffcanvas,
    _modalService: NgbModal,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
    this.cartService = _cartService;
    this.toastController = _toastController;
    this.offCanvas = _offCanvas;
    this.modalService = _modalService;
    this.ref = _ref
  }

  loading: boolean = false;
  id: string;
  type: 'card' | 'sticker' | 'postcard' | 'gift';
  model: ModelType;
  iModel: IModelType;
  bundles: NewPostcardBundle[] = [];
  images: string[] = [];
  ratings: NewRating[] = [];
  rate: number = 0;
  qr: string = '';
  recipients: string[] = [];

  isAddToCart: boolean = false;
  isBundle: boolean = false;
  isPersonalize: boolean = false;
  isFeatured: boolean = false;
  isPoetry: boolean = false;
  isRegular: boolean = false;
  isCardBundle: boolean = false;
  isDiscounted: boolean = false;

  stickerimage: string = '';

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.loading = true;
      this.id = params['id'];
      this.type = params['type'];

      if (this.type === 'card') {
        this.cardService.get(this.id).then(async value => {
          this.iModel = value;
          let card = new NewCard(value);
          this.isDiscounted = card.isDiscounted() ?? false;
          this.recipients = card.getRecipients();
          this.model = card;
          this.isAddToCart = true;
          this.isPersonalize = this.model instanceof NewCard ?  this.model.signAndSend : false;
          this.isFeatured = this.model.featured;
          this.isPoetry = this.model instanceof NewCard && this.model.messagetype === 'poetry';
          this.isRegular = this.model instanceof NewCard && this.model.messagetype === 'regular';
          this.isCardBundle = this.model instanceof NewCard? this.model.cardbundle : false;
          this.loading = false;
          this.ref.detectChanges();
          let images = await this.cardService.getImages(this.id, true);
          this.loadImages(images.filter(x => x.title !== 'QR'));
          let qrImage = images.find(x => x.title === 'QR');
          if (qrImage) this.qr = await this.fileService.getImageURL(qrImage.url);
          await this.loadRatings(await this.cardService.getRatings(this.id));
        })
      }
      else if (this.type === 'sticker') {
        this.stickerService.get(this.id).then(async value => {
          this.iModel = value;
          this.model = new NewSticker(value);
          this.isAddToCart = true;
          this.isFeatured = this.model.featured;
          this.loading = false;
          this.ref.detectChanges();
          this.loadImages(await this.stickerService.getImages(this.id, true));
          await this.loadRatings(await this.cardService.getRatings(this.id));
        })
      }
      else if (this.type === 'postcard') {
        this.postcardService.get(this.id).then(async value => {
          this.iModel = value;
          this.model = new NewPostcard(value);
          this.isBundle = true;
          this.isFeatured = this.model.featured;
          this.loading = false;
          this.ref.detectChanges();
          this.loadImages(await this.postcardService.getImages(this.id, true));

          let ibundles = await this.postcardService.getBundles(this.id);
          ibundles.sort((a, b) => { return a.price - b.price });
          ibundles.forEach(ibundle => {
            this.bundles.push(new NewPostcardBundle(ibundle));
          })

          await this.loadRatings(await this.cardService.getRatings(this.id));
        })
      }
      else if (this.type === 'gift') {
        this.giftService.get(this.id).then(async value => {
          this.iModel = value;
          this.model = new NewGift(value);
          this.isAddToCart = true;
          this.isFeatured = this.model.featured;
          this.loading = false;
          this.ref.detectChanges();
          this.loadImages(await this.giftService.getImages(this.id, true));
          await this.loadRatings(await this.cardService.getRatings(this.id));
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
        if (item.title === 'Stickers') this.stickerimage = url;
      }
      this.ref.detectChanges();
    }
  }

  async loadRatings(ratings: INewRating[]) {
    let value: number = 0;
    ratings.forEach(rating => {
      value = value + rating.rate;
    })
    this.rate = value / ratings.length;

    this.ratings = this.ratings.sort( (a, b) => {

      if (a.created > b.created) return 1;
      if (a.created < b.created) return -1;
      return 0;
    });
  }

  getPrice() {
    if (this.type === 'card') return (this.model as NewCard).priceDisplay();
    else if (this.type === 'sticker') return (this.model as NewSticker).priceDisplay();
    else if (this.type === 'gift') return (this.model as NewGift).priceDisplay();
    else return '';
  }

  getOriginalPrice() {
    if (this.type === 'card'){
       return (this.model as NewCard).originalPriceDisplay()
    };

    return 0;
  }

  getPersonalizePrice(discounted: boolean = false){
    if (this.type === 'card' && this.isPersonalize) return (this.model as NewCard).getPersonalizePriceDisplay(discounted);
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
    this.offCanvas.open(NewInYourCartComponent, { position: 'end' });
  }

  getICard() {
    return this.iModel as INewCard;
  }

  playInstruction() {
    const reference = this.modalService.open(NewVideoPlayerComponent, { animation: true, size: 'xl', centered: true });
    reference.componentInstance.url = '/assets/images/talking-card.mp4'
  }

  getEvents(){
    if (this.type === 'card') {
      let iNewCard = this.iModel as INewCard;
      return iNewCard.event
    }
    else if (this.type === 'sticker') {
      let iNewSticker = this.iModel as INewSticker
      return iNewSticker.events.join(", ")
    }
    else if (this.type === 'postcard') {
      let iNewPostcard = this.iModel as INewPostcard
      return iNewPostcard.events.join(", ")
    }
    else if (this.type === 'gift') {
      let iNewGift = this.iModel as INewGift
      return iNewGift.events.join(", ")
    }
    return "";
  }
}
