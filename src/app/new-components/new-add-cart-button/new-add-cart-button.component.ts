import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { NewInYourCartComponent } from '../new-in-your-cart/new-in-your-cart.component';
import { INewCard } from 'src/app/new-models/new-card';
import { INewSticker } from 'src/app/new-models/new-sticker';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-add-cart-button',
  templateUrl: './new-add-cart-button.component.html',
  styleUrls: ['./new-add-cart-button.component.scss']
})
export class NewAddCartButtonComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<NewAddCartButtonComponent>;

  @Input() type: "card" | "sticker";
  @Input() item: INewCard | INewSticker;

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

  ngOnInit(): void {
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
        price: this.item.price,
        sgprice: this.item.sgprice,
        usprice: this.item.usprice,
        type: this.type
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
