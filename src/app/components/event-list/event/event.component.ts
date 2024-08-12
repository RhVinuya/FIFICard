import { ImageService } from 'src/app/services/image.service';
import { CardService } from '../../../services/card.service';
import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() event: Event;
  @Input() type: 'card' | 'signandsend' = 'card';
  @Input() checkrequire: boolean = false;

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
      if (this.checkrequire)
        this.checkCardCount(this.event!.name!);
      else
        this.enable = true;
    })
    this.loadURL();
  }

  checkCardCount(name: string) {
    if (this.type == 'card') {
      this.service.getCardsByEvent(name).then(cards => {
        this.enable = cards.length > 0;
      }).catch(err => {
        this.enable = false;
      })
    }
    else {
      this.service.getSignAndSendByEvent(name).then(cards => {
        this.enable = cards.length > 0;
      }).catch(err => {
        this.enable = false;
      })
    }
  }

  replaceAll(value: string): string {
    let newValue = value.split(' ').join('');
    newValue = newValue.split("’").join('');
    newValue = newValue.split("'").join('');
    return newValue.toLocaleLowerCase();
  }

  loadURL() {
    if (this.type == 'card') {
      this.url = `/cards/event/${this.event.id!}`
    }
    else {
      this.url = '/signandsendcards/' + this.event.id!
    }
  }
}
