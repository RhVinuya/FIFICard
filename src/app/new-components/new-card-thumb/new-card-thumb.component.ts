import { Component, Input, OnInit } from '@angular/core';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { NewFileService } from 'src/app/new-services/new-file.service';

@Component({
  selector: 'app-new-card-thumb',
  templateUrl: './new-card-thumb.component.html',
  styleUrls: ['./new-card-thumb.component.scss']
})
export class NewCardThumbComponent implements OnInit {
  @Input() card: INewCard;

  fileService: NewFileService;

  constructor(
    _fileService: NewFileService
  ) { 
    this.fileService = _fileService;
  }

  _card: NewCard;
  image: string = '';

  async ngOnInit(): Promise<void> {
    this._card = new NewCard(this.card);
    if (this._card.getPrimary() !== '') {
      this.image = await this.fileService.getImageURL(this._card.getPrimary());
    }
  }

}
