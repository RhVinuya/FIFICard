
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { configFromSession } from '@ionic/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
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
  @Input() caption?: string;
  @Input() homeCardEvent?: string;
  @Input() limit: Number;
  @Input() isSignAndSend: boolean;

  service: CardService;
  cards: Card[] = [];
  batches: Batch[] = [];
  isMobile: boolean;

  constructor(
    private _service: CardService,
    private config: NgbCarouselConfig
  ) {
    this.service = _service;
    config.interval = 7000;
    config.wrap = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = true;
  }
  ngOnInit() {
    if (this.isSignAndSend) {
      this.loadSignAndSend();
    }
    else {
      this.loadFeatured();
    }

    this.isMobile = window.innerWidth <= 500;
  }

  loadFeatured() {
    this.service.getFeaturedCards(this.homeCardEvent?.trim()!, this.limit == 0 ? 12 : Number(this.limit)).then(data => {
      this.cards = [];
      let ctr = 1;
      data.forEach(card => {
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
      data.forEach(card => {
        this.cards.push(card);
        this.getImage(card);
        ctr = ctr + 1;
      });
      this.loadBatch(1);
    })
  }

  getImage(card: Card) {
    this.getAvailableURL(card.primary!).then(url => {
      this.cards.forEach(value => {
        if (card.id == value.id) {
          card.imageUrl = url;

        }
        //this.loadBatch(1);
      })
    });
  }

  getAvailableURL(image: string): Promise<string> {
    return new Promise((resolve, rejects) => {
      this.service.getImageURL(image + environment.imageSize.medium).then(url => {
        resolve(url);
      }).catch(err => {
        this.service.getImageURL(image).then(url => {
          resolve(url);
        });
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

}
