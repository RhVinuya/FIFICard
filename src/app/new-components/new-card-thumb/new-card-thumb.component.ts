import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewCard, INewRating, NewCard } from 'src/app/new-models/new-card';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-card-thumb',
  templateUrl: './new-card-thumb.component.html',
  styleUrls: ['./new-card-thumb.component.scss']
})
export class NewCardThumbComponent implements OnInit {
  @Input() card: INewCard;

  storageService: NewStorageService;
  cardService: NewCardService;
  fileService: NewFileService;
  router: Router;

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

  _card: NewCard;
  primary: string = '';
  secondary: string = '';
  rate: number = 0;

  async ngOnInit(): Promise<void> {
    this.storageService.saveItemDetails(this.card);
    
    this._card = new NewCard(this.card);
    
    let cardImages = await this.cardService.getImages(this._card.id);
    if (cardImages.length > 0) {
      this.primary = await this.fileService.getImageURL(cardImages[0].url);
    }
    if (cardImages.length > 1) {
      this.secondary = await this.fileService.getImageURL(cardImages[1].url);
    }
    else {
      this.secondary = this.primary;
    }

    this.loadRatings(await this.cardService.getRatings(this._card.id))
  }

  onClick(){
    this.router.navigate(['/new/details/card/' + this._card.id])
  }

  loadRatings(ratings: INewRating[]) {
    let value: number = 0;
    ratings.forEach(rating => {
      value = value + rating.rate;
    })
    this.rate = value / ratings.length;
  }
}
