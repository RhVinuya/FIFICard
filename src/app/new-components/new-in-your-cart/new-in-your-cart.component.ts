import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { NewCart, TotalCart } from 'src/app/new-models/new-cart';
import { IConfig } from 'src/app/new-models/new-config';
import { LocationType } from 'src/app/new-models/new-enum';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-in-your-cart',
  templateUrl: './new-in-your-cart.component.html',
  styleUrls: ['./new-in-your-cart.component.scss']
})
export class NewInYourCartComponent implements OnInit {

  activeOffCanvas: NgbActiveOffcanvas;
  cartService: NewCartService;
  locationService: NewLocationService;
  router: Router;
  toastController: ToastController;
  cardService: NewCardService;
    stickerService: NewStickerService;
    postcardService: NewPostcardService;
    giftService: NewGiftService;
  configService: NewConfigService;
  config: IConfig;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _activeOffCanvas: NgbActiveOffcanvas,
    _cartService: NewCartService,
    _locationService: NewLocationService,
    _router: Router,
    _toastController: ToastController,
    _configService: NewConfigService,
  ) { 
    this.configService = _configService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.activeOffCanvas = _activeOffCanvas;
    this.cartService = _cartService;
    this.locationService = _locationService;
    this.router = _router;
    this.toastController = _toastController
  }

  totalCart: TotalCart;

  carts: NewCart[] = [];
  total: string = '';

  async ngOnInit(): Promise<void> {
    this.config = await this.configService.get();
    let iCarts = await this.cartService.getAll();
    this.totalCart = new TotalCart(this.cartService, this.cardService, this.stickerService, this.postcardService, this.giftService, iCarts, this.config);
  }

  async onDelete(cart: NewCart) {
    await this.totalCart.remove(cart.id)

    let message: string = '';

    if (cart.type === 'card') {
      message = 'Card is removed on the Cart'
    }
    else if (cart.type === 'sticker') {
      message = 'Sticker is removed on the Cart'
    }
    else if (cart.type === 'postcard') {
      message = 'Postcard bundle is removed on the Cart'
    }

    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });
    await toast.present();

    if (this.totalCart.count() === 0) this.activeOffCanvas.close();
  }

  openCart() {
    this.router.navigate(['/new/cart'])
    this.activeOffCanvas.close();
  }

  close(){
    this.activeOffCanvas.close()
  }

}
