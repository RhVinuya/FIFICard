import { Component, Input, OnInit } from '@angular/core';
import { INewCard } from 'src/app/new-models/new-card';
import { INewGift } from 'src/app/new-models/new-gift';
import { INewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker } from 'src/app/new-models/new-sticker';

@Component({
  selector: 'app-product-list-mobile',
  templateUrl: './product-list-mobile.component.html',
  styleUrls: ['./product-list-mobile.component.scss']
})
export class ProductListMobileComponent implements OnInit {

  @Input() type: string;
  @Input() products: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[];

  columns: number = 3;

  constructor() {}

  ngOnInit(): void {}
}
