import { Component, Input, OnInit } from '@angular/core';
import { IBreadcrumb } from 'src/app/new-components/new-title/new-title.component';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

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
  
  @Input() set wishlist(_value: boolean) {
    this._wishlist = _value
  }

  
  constructor(
    private location: Location,
    public router: Router,
  ) { }

  _title: string = '';
  _cart: boolean = false;
  _wishlist: boolean = false;

  ngOnInit(): void {
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
