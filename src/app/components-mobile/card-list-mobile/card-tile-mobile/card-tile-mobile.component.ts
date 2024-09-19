import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-card-tile-mobile',
  templateUrl: './card-tile-mobile.component.html',
  styleUrls: ['./card-tile-mobile.component.scss']
})
export class CardTileMobileComponent implements OnInit {
  @Input() card: INewCard;

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
    let cardImages = await this.cardService.getImages(this.card.id);
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
