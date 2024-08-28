import { Component, Input, OnInit } from '@angular/core';
import { INewCard } from 'src/app/new-models/new-card';
import { INewPersonalize } from 'src/app/new-models/new-personalize';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';

@Component({
  selector: 'app-new-project-item',
  templateUrl: './new-project-item.component.html',
  styleUrls: ['./new-project-item.component.scss']
})
export class NewProjectItemComponent implements OnInit {
  @Input() project: INewPersonalize;

  cardService: NewCardService;
  fileService: NewFileService;

  constructor(
    _cardService: NewCardService,
    _fileService: NewFileService
  ) { 
    this.cardService = _cardService;
    this.fileService = _fileService;
  }

  iCard: INewCard;
  primary: string = '';

  async ngOnInit(): Promise<void> {
    this.iCard = await this.cardService.get(this.project.itemId);
    let images = await this.cardService.getImages(this.project.itemId);
    if (images && images.length > 0) {
      this.primary = await this.fileService.getImageURL(images[0].url)
    }
  }

}
