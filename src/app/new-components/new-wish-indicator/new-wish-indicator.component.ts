import { Component, Input, OnInit } from '@angular/core';
import { NewWishlistService } from 'src/app/new-services/new-wishlist.service';

@Component({
  selector: 'app-new-wish-indicator',
  templateUrl: './new-wish-indicator.component.html',
  styleUrls: ['./new-wish-indicator.component.scss']
})
export class NewWishIndicatorComponent implements OnInit {
  @Input() set id(value: string){
    this.load(value);
  }

  wishlistService: NewWishlistService;

  constructor(
    _wishlistService: NewWishlistService
  ) { 
    this.wishlistService = _wishlistService;
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

  onClick(event: Event){
    event.stopPropagation();
    this.isMark = !this.isMark;
    let list = this.wishlistService.get();
    if (this.isMark) list = [this._id, ...list.filter(x => x !== this._id)];
    else list = [...list.filter(x => x !== this._id)];
    this.wishlistService.save(list);
  }

}
