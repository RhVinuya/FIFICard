import { CardService } from 'src/app/services/card.service';
import { ImageService } from 'src/app/services/image.service';
import { Component, OnInit, Input, enableProdMode, ChangeDetectorRef } from '@angular/core';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-ecard-event',
  templateUrl: './ecard-event.component.html',
  styleUrls: ['./ecard-event.component.scss']
})
export class ECardEventComponent implements OnInit {
  @Input() event: Event;

  imageService: ImageService;
  cardService: CardService;
  def: ChangeDetectorRef

  constructor(
    _imageService: ImageService,
    _cardService: CardService,
    _def: ChangeDetectorRef
  ) { 
    this.imageService = _imageService
    this.cardService = _cardService;
    this.def = _def;
  }

  url: string = '';
  enable: boolean = false;

  ngOnInit(): void {
    this.loadImage();
    this.checkAvailability();
  }

  loadImage(){
    this.imageService.getImageURL(this.event.thumbnail).then(url => {
      this.url = url;
      this.def.detectChanges();
    })
  }

  checkAvailability(){
    this.cardService.getCardsByTypeAndEvent('ecard', this.event.name!).then(cards => {
      this.enable = cards.length > 0;
      this.def.detectChanges();
    });
  } 
}
