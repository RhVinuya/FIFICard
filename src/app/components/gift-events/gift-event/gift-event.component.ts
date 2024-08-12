import { Component, Input, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { ImageService } from 'src/app/services/image.service';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-gift-event',
  templateUrl: './gift-event.component.html',
  styleUrls: ['./gift-event.component.scss']
})
export class GiftEventComponent implements OnInit {
  @Input() event: Event;

  service: CardService;
  imageService: ImageService;

  constructor(
    _service: CardService,
    _imageService: ImageService
  ) {
    this.service = _service;
    this.imageService = _imageService;
  }

  image: string = '';
  url: string = '';
  enable: boolean = false;

  ngOnInit(): void {
    this.imageService.getImageURL(this.event.thumbnail).then(image => {
      this.image = image;
      this.checkCardCount(this.event!.name!);
    })
    this.loadURL();
  }

  checkCardCount(name: string) {
    this.service.getCardsByEvent(name).then(cards => {
      this.enable = cards.length > 0;
    }).catch(err => {
      this.enable = false;
    })
  }

  replaceAll(value: string): string {
    let newValue = value.split(' ').join('');
    newValue = newValue.split("’").join('');
    newValue = newValue.split("'").join('');
    return newValue.toLocaleLowerCase();
  }

  loadURL() {
    this.url = `/cards/event/${this.event.id!}`;
  }

}
