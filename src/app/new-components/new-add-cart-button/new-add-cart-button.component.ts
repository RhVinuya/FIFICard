import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { NewInYourCartComponent } from '../new-in-your-cart/new-in-your-cart.component';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { INewSticker } from 'src/app/new-models/new-sticker';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { ToastController } from '@ionic/angular';
import { INewGift } from 'src/app/new-models/new-gift';
import { IModelType, ItemType } from 'src/app/new-models/new-enum';
import { INewDiscount } from 'src/app/new-models/new-discount';
import { environment } from "src/environments/environment";
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { IConfig } from 'src/app/new-models/new-config';

@Component({
  selector: 'app-new-add-cart-button',
  templateUrl: './new-add-cart-button.component.html',
  styleUrls: ['./new-add-cart-button.component.scss']
})
export class NewAddCartButtonComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<NewAddCartButtonComponent>;

  @Input() type: ItemType;
  @Input() item: IModelType;
  @Input() fullwidth: boolean = false;

  offCanvas: NgbOffcanvas;
  cartService: NewCartService;
  toastController: ToastController;
  configService: NewConfigService;
  config: IConfig;

  constructor(
    _offCanvas: NgbOffcanvas,
    _cartService: NewCartService,
    _toastController: ToastController,
    _configService: NewConfigService,
  ) { 
    this.configService = _configService;
    this.offCanvas = _offCanvas;
    this.cartService = _cartService;
    this.toastController = _toastController
  }

  isHover: boolean = false;
  isProcessing: boolean = false;

  price: number = 0;
  sgprice: number = 0;
  usprice: number = 0;
  isDiscounted: boolean = false;
  discount: INewDiscount | undefined;
  discountedPrice: number = 0;

  async ngOnInit() {
    this.config = await this.configService.get();

    if (this.type === 'card') {
      let item = new NewCard(this.item as INewCard, this.config);

      this.price = (this.item as INewCard).price;
      this.sgprice = (this.item as INewCard).sgprice;
      this.usprice = (this.item as INewCard).usprice;

      if( item.isDiscounted() ) {
        let discounts: INewDiscount[] = [];
        environment.discounts.forEach(value => discounts.push(value as INewDiscount));
        discounts = discounts.filter(x => x.active === true &&  x.event === item.event);
        this.discount = discounts[0];
        this.isDiscounted = item.isDiscounted();
        this.discountedPrice = new NewCard(this.item as INewCard,this.config).getDiscountedPrice();
      }

    }
    else if (this.type === 'sticker'){
      this.price = (this.item as INewSticker).price;
      this.sgprice = (this.item as INewSticker).sgprice;
      this.usprice = (this.item as INewSticker).usprice;
    }
    else if (this.type === 'gift'){
      this.price = (this.item as INewGift).price;
      this.sgprice = (this.item as INewGift).sgprice;
      this.usprice = (this.item as INewGift).usprice;
    }
  }

  mouserEnter() {
    this.isHover = true;
  }

  mouseLeave() {
    this.isHover = false;
  }

  async onClick(event: Event) {
    event.stopPropagation();
    await this.cartService.add(
      {
        id: '',
        itemId: this.item.id,
        userId: '',
        price: this.price,
        sgprice: this.sgprice,
        usprice: this.usprice,
        type: this.type,
        bundle: undefined,
        personalize: undefined,
        mark: true,
        discount: this.discount,
        discountPrice: this.discountedPrice,
        isDiscounted: this.isDiscounted,
        datetime: (new Date()).getTime()
      }
    );
    let message: string = '';
    if (this.type === 'card') message = 'Card is added on the Cart';
    else if (this.type === 'sticker') message = 'Sticker is added on the Cart';
    else if (this.type === 'gift')  message = 'Gift is added on the Cart';
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });
    await toast.present();
    this.offCanvas.open(NewInYourCartComponent, { position: 'end' });
  }
}
