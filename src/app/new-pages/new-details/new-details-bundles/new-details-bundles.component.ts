import { Component, Input, OnInit } from '@angular/core';
import { INewCard } from 'src/app/new-models/new-card';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';

export interface IBundle {
  id: string;
  url: string;
}

@Component({
  selector: 'app-new-details-bundles',
  templateUrl: './new-details-bundles.component.html',
  styleUrls: ['./new-details-bundles.component.scss']
})
export class NewDetailsBundlesComponent implements OnInit {
  @Input() ids: string[];

  cardService: NewCardService;
  fileService: NewFileService;

  constructor(
    _cardService: NewCardService,
    _fileService: NewFileService
  ) { 
    this.cardService = _cardService;
    this.fileService = _fileService;
  }

  bunles: IBundle[] = [];

  async ngOnInit(): Promise<void> {
    for await (let id of this.ids) {
      let value = await this.cardService.get(id);
      if (value) {
        let images = await this.cardService.getImages(value.id);
        let image = images.find(x => x.title === 'Front')
        if (image) {
          let url = await this.fileService.getImageURL(image.url)
          this.bunles.push({
            id: value.id,
            url: url
          })
        }
      }
    }
  }
}
