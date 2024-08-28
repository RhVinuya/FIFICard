import { Component, Input, OnInit } from '@angular/core';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-wish-indicator',
  templateUrl: './new-wish-indicator.component.html',
  styleUrls: ['./new-wish-indicator.component.scss']
})
export class NewWishIndicatorComponent implements OnInit {
  @Input() set id(value: string){
    this.load(value);
  }

  storageService: NewStorageService;

  constructor(
    _storageService: NewStorageService
  ) { 
    this.storageService = _storageService;
  }

  _id: string;
  isMark: boolean = false

  ngOnInit(): void {
  }

  load(value: string){
    this._id = value;
    let list = this.storageService.getWishist();
    this.isMark = list.findIndex(x => x === this._id) >= 0;
  }

  onClick(){
    this.isMark = !this.isMark;
    let list = this.storageService.getWishist();
    if (this.isMark) {
      list = [this._id, ...list.filter(x => x !== this._id)]
    }
    else {
      list = [...list.filter(x => x !== this._id)]
    }
    this.storageService.saveWishlist(list);
  }

}
