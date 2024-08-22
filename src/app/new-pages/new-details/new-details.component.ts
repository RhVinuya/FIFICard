import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NewInYourCartComponent } from 'src/app/new-components/new-in-your-cart/new-in-your-cart.component';
import { INewCard, INewCardImage, INewRating, NewCard } from 'src/app/new-models/new-card';
import { INewCartBundle } from 'src/app/new-models/new-cart';
import { INewPostcard, INewPostcardBundle, NewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker, INewStickerImage, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
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
  fileService: NewFileService;
  cartService: NewCartService;
  toastController: ToastController;
  offCanvas: NgbOffcanvas;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _fileService: NewFileService,
    _cartService: NewCartService,
    _toastController: ToastController,
    _offCanvas: NgbOffcanvas,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.fileService = _fileService;
    this.cartService = _cartService;
    this.toastController = _toastController;
    this.offCanvas = _offCanvas;
    this.ref = _ref
  }

  loading: boolean = false;
  id: string;
  type: 'card' | 'sticker' | 'postcard';
  model: NewCard | NewSticker | NewPostcard;
  iModel: INewCard | INewSticker | INewPostcard;
  bundles: INewPostcardBundle[] = [];
  images: string[] = [];
  rate: number = 0;

  isFeatured: boolean = false;
  isPoetry: boolean = false;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.loading = true;
      this.id = params['id'];
      this.type = params['type'];

      if (this.type === 'card') {
        this.cardService.get(this.id).then(async value => {
          this.iModel = value;
          this.model = new NewCard(value);
          this.isFeatured = this.model.featured;
          this.isPoetry = this.model instanceof NewCard && this.model.messagetype === 'poetry';
          this.loading = false;
          this.ref.detectChanges();
          this.loadImages(await this.cardService.getImages(this.id));
          this.loadRatings(await this.cardService.getRatings(this.id));
        })
      }
      else if (this.type === 'sticker') {
        this.stickerService.get(this.id).then(async value => {
          this.iModel = value;
          this.model = new NewSticker(value);
          this.isFeatured = this.model.featured;
          this.loading = false;
          this.ref.detectChanges();
          this.loadImages(await this.stickerService.getImages(this.id));
        })
      }
      else if (this.type === 'postcard') {
        this.postcardService.get(this.id).then(async value => {
          this.iModel = value;
          this.model = new NewPostcard(value);
          this.isFeatured = this.model.featured;
          this.loading = false;
          this.ref.detectChanges();
          this.loadImages(await this.postcardService.getImages(this.id));
          this.bundles = await this.postcardService.getBundles(this.id);
          this.bundles.sort((a, b) => { return a.price - b.price });
        })
      }
    });
  }

  async loadImages(items: INewCardImage[] | INewStickerImage[]) {
    if (items.length > 0) {
      this.images = [];
      for await (let item of items) {
        let url = await this.fileService.getImageURL(item.url);
        this.images = [...this.images, url]
      }
      this.ref.detectChanges();
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
    else return '';
  }

  async onClickBundle(bundle: INewPostcardBundle) {
    this.cartService.add({
      id: '',
      itemid: this.id,
      price: 0,
      sgprice: 0,
      usprice: 0,
      type: 'postcard',
      bundle: {
        count: bundle.count,
        price: bundle.price,
        sgprice: bundle.sgprice,
        usprice: bundle.usprice,
      } as INewCartBundle
    })
    const toast = await this.toastController.create({
      message: 'Postcard bundle is added on the Cart',
      duration: 1500,
      position: 'top',
    });
    await toast.present();
    this.offCanvas.open(NewInYourCartComponent, { position: 'end' });
  }

}
