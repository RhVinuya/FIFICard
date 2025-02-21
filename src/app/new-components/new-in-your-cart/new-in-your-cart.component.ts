import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { NewCart } from 'src/app/new-models/new-cart';
import { IConfig } from 'src/app/new-models/new-config';
import { LocationType } from 'src/app/new-models/new-enum';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';

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
  configService: NewConfigService;
  config: IConfig;

  constructor(
    _cardService: NewCardService,
    _activeOffCanvas: NgbActiveOffcanvas,
    _cartService: NewCartService,
    _locationService: NewLocationService,
    _router: Router,
    _toastController: ToastController,
    _configService: NewConfigService,
  ) { 
    this.configService = _configService;
    this.cardService = _cardService;
    this.activeOffCanvas = _activeOffCanvas;
    this.cartService = _cartService;
    this.locationService = _locationService;
    this.router = _router;
    this.toastController = _toastController
  }

  carts: NewCart[] = [];
  total: string = '';

  async ngOnInit(): Promise<void> {
    this.config = await this.configService.get();
    let iCarts = await this.cartService.getAll();
    iCarts.reverse();
    for await (let iCart of iCarts) {
      this.carts.push(new NewCart(iCart));
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

    if (this.carts.length === 0) this.activeOffCanvas.close();
  }

  async computeTotal() {
    let location: LocationType = this.locationService.getlocation();
    let symbol: string = this.locationService.getPriceSymbol();
    let subtotal: number = 0;
    for await (let x of this.carts) {
      let isDiscounted: boolean = false;
      let discountedPrice: number = 0;

      if( x.type == 'card' ) {
        let iCard = await this.cardService.get(x.itemId);
        let model = new NewCard(iCard as INewCard, this.config);
        
        isDiscounted = model.isDiscounted() ?? false;
        if(isDiscounted) {
          discountedPrice = (x.personalize) ? model.getPersonalizePrice(isDiscounted) : model.getDiscountedPrice();
        }
      } 
 
      if (location === 'ph') {
        if (x.type !== 'postcard') subtotal = subtotal + ( isDiscounted ? discountedPrice : x.price )
        else if (x.bundle) subtotal = subtotal + x.bundle.price
      }
      else if (location === 'sg') {
        if (x.type !== 'postcard') subtotal = subtotal + ( isDiscounted ? discountedPrice : x.sgprice )
        else if (x.bundle) subtotal = subtotal + x.bundle.sgprice
      }
      else {
        if (x.type !== 'postcard') subtotal = subtotal  + ( isDiscounted ? discountedPrice : x.usprice )
        else if (x.bundle) subtotal = subtotal + x.bundle.usprice
      }
    }

    this.total = symbol + subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })
  }

  openCart() {
    this.router.navigate(['/new/cart'])
    this.activeOffCanvas.close();
  }

  close(){
    this.activeOffCanvas.close()
  }

}
