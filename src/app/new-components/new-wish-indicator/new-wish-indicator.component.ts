import { Component, Input, OnInit } from '@angular/core';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-wish-indicator',
  templateUrl: './new-wish-indicator.component.html',
  styleUrls: ['./new-wish-indicator.component.scss']
})
export class NewWishIndicatorComponent implements OnInit {
  @Input() id: string;

  storageService: NewStorageService;

  constructor(
    _storageService: NewStorageService
  ) { 
    this.storageService = _storageService;
  }

  isMark: boolean = false

  ngOnInit(): void {
    let list = this.storageService.getWishist();
    this.isMark = list.findIndex(x => x === this.id) >= 0;
  }

  onClick(){
    this.isMark = !this.isMark;
    let list = this.storageService.getWishist();
    if (this.isMark) {
      list = [this.id, ...list.filter(x => x !== this.id)]
    }
    else {
      list = [...list.filter(x => x !== this.id)]
    }
    this.storageService.saveWishlist(list);
  }

}
