import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewCard } from 'src/app/new-models/new-card';
import { INewGift } from 'src/app/new-models/new-gift';
import { INewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-product-tile-mobile',
  templateUrl: './product-tile-mobile.component.html',
  styleUrls: ['./product-tile-mobile.component.scss']
})
export class ProductTileMobileComponent implements OnInit {

  @Input() product: INewCard | INewSticker | INewPostcard | INewGift;

  storageService: NewStorageService;
  cardService: NewCardService;
  fileService: NewFileService;
  router: Router;
  primary: string = 'https://ionicframework.com/docs/img/demos/card-media.png';
  secondary: string = 'https://ionicframework.com/docs/img/demos/card-media.png';

  constructor(
    _storageService: NewStorageService,
    _cardService: NewCardService,
    _fileService: NewFileService,
    _router: Router
  ) { 
    this.storageService = _storageService;
    this.cardService = _cardService;
    this.fileService = _fileService;
    this.router = _router;
  }

  async ngOnInit(): Promise<void> {
    let cardImages = await this.cardService.getImages(this.product.id);
    if (cardImages.length > 0) {
      this.primary = await this.fileService.getImageURL(cardImages[0].url.split(".png").join('_74x100.png'));
    }
    if (cardImages.length > 1) {
      this.secondary = await this.fileService.getImageURL(cardImages[1].url);
    }
    else {
      this.secondary = this.primary;
    }
  }


}
