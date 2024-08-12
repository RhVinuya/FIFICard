import { PriceService } from '../../services/price.service';

import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { configFromSession } from '@ionic/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';

class Batch {
  public cards: Card[];

  constructor() {
    this.cards = [];
  }
}

@Component({
  selector: 'app-home-featured',
  templateUrl: './home-featured.component.html',
  styleUrls: ['./home-featured.component.scss'],
  providers: [NgbCarouselConfig]
})

export class HomeFeaturedComponent implements OnInit {
  @Input() caption: string = '';
  @Input() homeCardEvent?: string;
  @Input() limit: Number;
  @Input() isSignAndSend: boolean = false;
  @Input() withPrice: boolean = false;
  @Input() ids: string[] = [];

  service: CardService;
  priceService: PriceService;
  imageService: ImageService;
  cards: Card[] = [];
  batches: Batch[] = [];
  isMobile: boolean;

  constructor(
    _service: CardService,
    _priceService: PriceService,
    _imageService: ImageService,
    config: NgbCarouselConfig
  ) {
    this.service = _service;
    this.priceService = _priceService;
    this.imageService = _imageService;
    config.interval = 8000;
    config.wrap = true;
    config.pauseOnHover = false;
    config.showNavigationArrows = true;
    config.animation = true;
  }

  ngOnInit() {
    if (this.ids.length == 0) {
      if (this.isSignAndSend) {
        this.loadSignAndSend();
      }
      else {
        this.loadFeatured();
      }
    }
    else {
      this.getCard(0);
    }

    this.isMobile = window.innerWidth <= 500;
  }

  loadFeatured() {
    this.service.getFeaturedCards(this.homeCardEvent?.trim()!, this.limit == 0 ? 12 : Number(this.limit)).then(data => {
      this.cards = [];
      let ctr = 1;
      data.sort(() => Math.random() - Math.random()).forEach(card => {
        this.cards.push(card);
        this.getImage(card);
        ctr = ctr + 1;
      });
      this.loadBatch(1);
    });
  }

  loadSignAndSend() {
    this.service.getSignAndSendFeaturedCards().then(data => {
      this.cards = [];
      let ctr = 1;
      data.sort(() => Math.random() - Math.random()).forEach(card => {
        this.cards.push(card);
        this.getImage(card);
        ctr = ctr + 1;
      });
      this.loadBatch(1);
    })
  }

  getCard(count: number) {
    if (count < this.ids.length) {
      this.service.getACard(this.ids[count]).then(card => {
        this.cards.push(card);
        this.getImage(card);
        this.getCard(count + 1);
      });
    }
    else {
      this.loadBatch(1);
    }
  }

  getImage(card: Card) {
    this.service.getPrimaryImage(card.id!).then(image => {
      this.imageService.getImageURL(image).then(url => {
        this.cards.forEach(value => {
          if (card.id == value.id) {
            card.imageUrl = url;
          }
        })
      });
    });
  }

  loadBatch(_index: number) {
    this.batches = [];
    const displayCount = this.isMobile ? 2 : 6;
    let counter: number = 1;
    let cards: Card[] = []

    this.cards.forEach(randomCard => {
      cards.push(randomCard);
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

  getPrice(card: Card): number {
    let type: 'STANDARD' | 'GLITTERED' | 'EMBOSSED' = 'STANDARD'
    if (card.types!.findIndex(x => x == 'STANDARD') >= 0) {
      type = 'STANDARD';
    }
    else if (card.types!.findIndex(x => x == 'GLITTERED') >= 0) {
      type = 'GLITTERED';
    }
    if (card.types!.findIndex(x => x == 'EMBOSSED') >= 0) {
      type = 'EMBOSSED';
    }
    return this.priceService.getPrice(card, type)
  }

}
