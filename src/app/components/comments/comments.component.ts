import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../services/event.service';
import { CardService } from '../../services/card.service';
import { OrderService } from '../../services/order.service';
import { ECardComment } from '../../models/comment';
import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/models/card';

class Batch {
  public cards: Card[];

  constructor() {
    this.cards = [];
  }
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [NgbCarouselConfig]
})
export class CommentsComponent implements OnInit {
  @Input() set id(_id: string) {
    this.orderid = _id;
    this.loadComments();
    this.getThankYouCards();
  }

  orderService: OrderService;
  cardService: CardService;
  config: NgbCarouselConfig;

  constructor(
    _orderService: OrderService,
    _cardService: CardService,
    _config: NgbCarouselConfig
  ) {
    this.orderService = _orderService;
    this.cardService = _cardService;
    this.config = _config;
    this.config.interval = 8000;
    this.config.wrap = true;
    this.config.pauseOnHover = false;
    this.config.showNavigationArrows = true;
    this.config.animation = true;
  }

  orderid: string;
  comments: ECardComment[] = [];
  batches: Batch[] = [];
  isMobile: boolean;

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 500;
  }

  loadComments() {
    this.orderService.getComments(this.orderid).then(comments => {
      this.comments = comments;
    })
  }

  save(comment: ECardComment) {
    this.orderService.addComment(this.orderid, comment).then(data => {
      this.comments.push(data);
    })
  }

  async getThankYouCards() {
    this.cardService.getCardsByTypeAndEvent('ecard', 'Thank You').then(randomCards => {
      this.batches = [];
      const displayCount = this.isMobile ? 2 : 4;
      let counter: number = 1;
      let cards: Card[] = []

      randomCards.forEach(randomCard => {
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
    })
  }

}
