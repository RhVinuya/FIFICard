import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { INewCard } from 'src/app/new-models/new-card';
import { INewSticker } from 'src/app/new-models/new-sticker';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { ToastController } from '@ionic/angular';
import { INewGift } from 'src/app/new-models/new-gift';
import { IModelType, ItemType } from 'src/app/new-models/new-enum';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-cart-button-mobile',
  templateUrl: './add-cart-button-mobile.component.html',
  styleUrls: ['./add-cart-button-mobile.component.scss']
})
export class AddCartButtonMobileComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<AddCartButtonMobileComponent>;

  @Input() type: ItemType;
  @Input() item: IModelType;

  cartService: NewCartService;
  toastController: ToastController;
  router: Router;

  constructor(
    _cartService: NewCartService,
    _toastController: ToastController,
    _router: Router
  ) {
    this.cartService = _cartService;
    this.toastController = _toastController
    this.router = _router;
  }

  isHover: boolean = false;
  isProcessing: boolean = false;

  price: number = 0;
  sgprice: number = 0;
  usprice: number = 0;

  ngOnInit(): void {
    if (this.type === 'card') {
      this.price = (this.item as INewCard).price;
      this.sgprice = (this.item as INewCard).sgprice;
      this.usprice = (this.item as INewCard).usprice;
    }
    else if (this.type === 'sticker'){
      this.price = (this.item as INewSticker).price;
      this.sgprice = (this.item as INewSticker).sgprice;
      this.usprice = (this.item as INewSticker).usprice;
    }
    else if (this.type === 'gift'){
      this.price = (this.item as INewGift).price;
    }
  }

  mouserEnter() {
    this.isHover = true;
  }

  mouseLeave() {
    this.isHover = false;
  }

  async onClick() {
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
    //window.location.href = '/cart';
    this.router.navigate(['/cart']);
  }
}
