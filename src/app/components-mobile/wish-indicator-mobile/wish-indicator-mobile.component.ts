import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NewWishlistService } from 'src/app/new-services/new-wishlist.service';

@Component({
  selector: 'app-wish-indicator-mobile',
  templateUrl: './wish-indicator-mobile.component.html',
  styleUrls: ['./wish-indicator-mobile.component.scss']
})
export class WishIndicatorMobileComponent implements OnInit {
  @Input() set id(value: string){
    this.load(value);
  }

  wishlistService: NewWishlistService;
  toastController: ToastController;

  constructor(
    public router: Router,
    _wishlistService: NewWishlistService,
    _toastController: ToastController
  ) { 
    this.wishlistService = _wishlistService;
    this.toastController = _toastController;
  }

  _id: string;
  isMark: boolean = false

  ngOnInit(): void {
  }

  load(value: string){
    this._id = value;
    let list = this.wishlistService.get();
    this.isMark = list.findIndex(x => x === this._id) >= 0;
  }

  async onClick(){
    this.isMark = !this.isMark;
    let list = this.wishlistService.get();
    if (this.isMark) list = [this._id, ...list.filter(x => x !== this._id)];
    else list = [...list.filter(x => x !== this._id)];
    this.wishlistService.save(list);    
    const toast = await this.toastController.create({
      message: this.isMark? 'Item is added to your wishlist.' : 'Item is removed to your wishlist.',
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }

}
