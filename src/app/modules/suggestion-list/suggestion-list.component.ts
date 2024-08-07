import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/models/card';
import { Event } from 'src/app/models/event';
import { CardService } from 'src/app/services/card.service';
import { EventService } from 'src/app/services/event.service';
import { ImageService } from 'src/app/services/image.service';

class Batch {
  public cards: Card[];

  constructor() {
    this.cards = [];
  }
}

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss']
})
export class SuggestionListComponent implements OnInit {
  @Input() set card(_card: Card) {
    this.loadCards(_card)
  }
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();

  service: CardService;
  eventService: EventService;
  imageService: ImageService;

  constructor(
    _service: CardService,
    _eventService: EventService,
    _imageService: ImageService,
    config: NgbCarouselConfig
  ) {
    this.service = _service;
    this.eventService = _eventService;
    this.imageService = _imageService;
    config.interval = 7000;
    config.wrap = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = true;
  }

  mainCard: Card;
  batches: Batch[] = [];
  isMobile: boolean;

  ngOnInit() {
    this.isMobile = window.innerWidth <= 500;
  }

  getType(event: Event): 'card' | 'gift' | 'sticker' | 'postcard' | 'ecard' | 'clipart' {
    if (event.isCard) return 'card'
    else if (event.isGift) return 'gift'
    else if (event.isSticker) return 'sticker'
    else if (event.isPostcard) return 'postcard'
    else return 'card'
  }

  async loadCards(card: Card) {
    const getCards = (event: Event): Promise<Card[]> => {
      return new Promise(async resolve => {
        let primaryEvent: string = card.events[0];
        if (event.name.toLowerCase().includes(primaryEvent.trim().toLowerCase()) || primaryEvent.trim().toLowerCase().includes(event.name.toLowerCase())){
          let cards: Card[] = await this.service.getSuggestions(event.name, this.getType(event), 11);
          cards = cards.filter(x => x.id !== card.id)
          resolve(cards.slice(0, 10));
        }
        else resolve([]);
      })
    }

    let events: Event[] = await this.eventService.getEvents();

    let cards: Card[] = [];
    for await (let event of events.filter(x => x.isCard === true)) {
      let _cards: Card[] = await getCards(event)
        cards = [...cards, ..._cards]
    }

    for await (let event of events.filter(x => x.isGift === true)) {
      let _cards: Card[] = await getCards(event)
        cards = [...cards, ..._cards]
    }

    for await (let event of events.filter(x => x.isPostcard === true)) {
      let _cards: Card[] = await getCards(event)
        cards = [...cards, ..._cards]
    }

    for await (let event of events.filter(x => x.isSticker === true)) {
      let _cards: Card[] = await getCards(event)
        cards = [...cards, ..._cards]
    }

    console.log(cards)

    this.loadBatch(card, this.shuffle(cards));
    this.getImages();
  }

  shuffle(list: Card[]): Card[] {
    return list.sort(() => Math.random() - 0.5);
  };

  getImages() {
    this.batches.forEach(batch => {
      batch.cards.forEach(card => {
        this.getImage(card);
      })
    })
  }

  getImage(card: Card) {
    if (card.type == 'ecard') {
      this.service.getECardImages(card.id!).then(images => {
        let preview = images.find(x => x.title == 'preview')!;
        this.imageService.getImageURL(preview.url).then(url => {
          card.imageUrl = url;
        });
      })
    }
    else {
      this.service.getPrimaryImage(card.id!).then(image => {
        this.imageService.getImageURL(image).then(url => {
          card.imageUrl = url;
        });
      });
    }
  }

  loadBatch(card: Card, list: Card[]) {
    let newList: Card[] = list;
    let index: number = newList.findIndex(x => x.id == card.id);
    if (index >= 0) {
      list.splice(index, 1);
    }
    newList = newList.splice(0, 12);

    this.batches = [];
    const displayCount = this.isMobile ? 3 : 6;
    let counter: number = 1;
    let cards: Card[] = []

    newList.forEach(card => {
      cards.push(card);
      if (counter == displayCount) {
        counter = 1;
        let batch: Batch = new Batch();
        batch.cards = cards;
        this.batches.push(batch);
        cards = [];
      }
      else {
        counter++;
      }
    })

    if (cards.length > 0) {
      let batch: Batch = new Batch();
      cards.forEach(card => {
        batch.cards.push(card);
      })
      this.batches.push(batch);
    }
  }

  open(id: string) {
    this.onClick.emit(id)
  }
}
