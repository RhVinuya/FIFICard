import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NewCart } from 'src/app/new-models/new-cart';
import { LocationType } from 'src/app/new-models/new-enum';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-in-your-cart-mobile',
  templateUrl: './in-your-cart-mobile.component.html',
  styleUrls: ['./in-your-cart-mobile.component.scss']
})
export class InYourCartMobileComponent implements OnInit {

  cartService: NewCartService;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  locationService: NewLocationService;
  router: Router;
  toastController: ToastController;

  constructor(
    _cartService: NewCartService,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _locationService: NewLocationService,
    _router: Router,
    _toastController: ToastController
  ) {
    this.cartService = _cartService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.locationService = _locationService;
    this.router = _router;
    this.toastController = _toastController
  }

  carts: NewCart[] = [];
  total: string = '';

  async ngOnInit(): Promise<void> {
    console.log("inyourcart")
    let iCarts = await this.cartService.getAll();
    iCarts.reverse();
    for await (let iCart of iCarts) {
      let cart = new NewCart(iCart, this.cardService, this.stickerService, this.postcardService, this.giftService)
      await cart.loadItem();
      this.carts.push(cart);

    }
    this.computeTotal();
  }

  async onDelete(id: string) {
    let type = this.carts.find(x => x.id === id)!.type;
    this.carts = this.carts.filter(x => x.id !== id);
    await this.cartService.delete(id);
    this.computeTotal();

    let message: string = '';

    if (type === 'card') {
      message = 'Card is removed on the Cart'
    }
    else if (type === 'sticker') {
      message = 'Sticker is removed on the Cart'
    }
    else if (type === 'postcard') {
      message = 'Postcard bundle is removed on the Cart'
    }

    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });
    await toast.present();

  }

  computeTotal() {
    let location: LocationType = this.locationService.getlocation();
    let symbol: string = this.locationService.getPriceSymbol();
    let subtotal: number = 0;
    this.carts.forEach(x => {
      if (location === 'ph') {
        if (x.type !== 'postcard') subtotal = subtotal + x.price
        else if (x.bundle) subtotal = subtotal + x.bundle.price
      }
      else if (location === 'sg') {
        if (x.type !== 'postcard') subtotal = subtotal + x.sgprice
        else if (x.bundle) subtotal = subtotal + x.bundle.sgprice
      }
      else {
        if (x.type !== 'postcard') subtotal = subtotal + x.usprice
        else if (x.bundle) subtotal = subtotal + x.bundle.usprice
      }
    })
    this.total = symbol + subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })
  }

  openCart() {
    this.router.navigate(['/new/cart']);
  }

  close() {
  }

}
