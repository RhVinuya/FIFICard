import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { NewInYourCartComponent } from '../new-in-your-cart/new-in-your-cart.component';
import { INewCard } from 'src/app/new-models/new-card';
import { INewSticker } from 'src/app/new-models/new-sticker';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { ToastController } from '@ionic/angular';
import { INewPostcard } from 'src/app/new-models/new-postcard';

@Component({
  selector: 'app-new-add-cart-button',
  templateUrl: './new-add-cart-button.component.html',
  styleUrls: ['./new-add-cart-button.component.scss']
})
export class NewAddCartButtonComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<NewAddCartButtonComponent>;

  @Input() type: "card" | "sticker" | "postcard";
  @Input() item: INewCard | INewSticker | INewPostcard;

  offCanvas: NgbOffcanvas;
  cartService: NewCartService;
  toastController: ToastController;

  constructor(
    _offCanvas: NgbOffcanvas,
    _cartService: NewCartService,
    _toastController: ToastController
  ) {
    this.offCanvas = _offCanvas;
    this.cartService = _cartService;
    this.toastController = _toastController
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
        itemid: this.item.id,
        price: this.price,
        sgprice: this.sgprice,
        usprice: this.usprice,
        type: this.type,
        bundle: undefined
      }
    );
    let message: string = '';

    if (this.type === 'card') {
      message = 'Card is added on the Cart'
    }
    else if (this.type === 'sticker') {
      message = 'Sticker is added on the Cart'
    }

    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });
    await toast.present();
    this.offCanvas.open(NewInYourCartComponent, { position: 'end' });
  }
}
