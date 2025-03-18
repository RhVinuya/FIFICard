import { NewCartService } from 'src/app/new-services/new-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { IBreadcrumb } from 'src/app/new-components/new-title/new-title.component';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { INewCart } from 'src/app/new-models/new-cart';

@Component({
  selector: 'app-title-mobile',
  templateUrl: './title-mobile.component.html',
  styleUrls: ['./title-mobile.component.scss']
})
export class TitleMobileComponent implements OnInit {


  @Input() set title(_value: string) {
    this._title = _value
  }

  @Input() set cart(_value: boolean) {
    this._cart = _value
  }  
  
  @Input() set size(_value: number) {
    this._size = _value
  }  
  
  
  @Input() set wishlist(_value: boolean) {
    this._wishlist = _value
  }

  
  constructor(
    private location: Location,
    public router: Router,
    public storageService: NewStorageService,
    public cartService: NewCartService
  ) { }

  _title: string = '';
  _cart: boolean = false;
  _wishlist: boolean = false;
  _size: number = 2;
  wishlistItems: string[] = [];
  cartItems: INewCart[] = [];

  async ngOnInit(): Promise<void> {
    this.wishlistItems = this.storageService.getWishist();
    this.cartItems = await this.cartService.getAll();
  }

  goBack() {
      this.location.back();
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
  }

  goToWishlist() {
      this.router.navigateByUrl('/wishlist');
  }
}
