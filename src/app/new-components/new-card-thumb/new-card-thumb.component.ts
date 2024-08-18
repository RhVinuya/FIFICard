import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';

@Component({
  selector: 'app-new-card-thumb',
  templateUrl: './new-card-thumb.component.html',
  styleUrls: ['./new-card-thumb.component.scss']
})
export class NewCardThumbComponent implements OnInit {
  @Input() card: INewCard;

  cardService: NewCardService;
  fileService: NewFileService;
  router: Router;

  constructor(
    _cardService: NewCardService,
    _fileService: NewFileService,
    _router: Router
  ) { 
    this.cardService = _cardService;
    this.fileService = _fileService;
    this.router = _router;
  }

  _card: NewCard;
  image: string = '';

  async ngOnInit(): Promise<void> {
    this._card = new NewCard(this.card);

    let cardImages = await this.cardService.getImages(this._card.id);
    if (cardImages.length > 0) {
      this.image = await this.fileService.getImageURL(cardImages[0].url);
    }
  }

  onClick(){
    this.router.navigate(['/new/details/' + this._card.id])
  }
}
