import { EventService } from './../../services/event.service';
import { Card } from './../../models/card';
import { CardService } from 'src/app/services/card.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddMore } from 'src/app/models/add-more';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

class Batch {
  public items: AddMore[]

  constructor() {
    this.items = [];
  }
}

@Component({
  selector: 'app-add-more',
  templateUrl: './add-more.component.html',
  styleUrls: ['./add-more.component.scss']
})
export class AddMoreComponent implements OnInit {
  @Input() card: Card;
  @Input() limit: number;
  @Output() selectedChange: EventEmitter<AddMore[]> = new EventEmitter<AddMore[]>();

  service: CardService;
  eventService: EventService;
  isMobile: boolean;
  cards: AddMore[] = []
  displayCards: AddMore[] = [];
  selected: AddMore[] = [];
  batches: Batch[] = [];

  index: number;
  currentIndex: number;
  isPrev: boolean;
  isNext: boolean;

  constructor(
    _service: CardService,
    _eventService: EventService,
    config: NgbCarouselConfig
  ) {
    this.service = _service;
    this.eventService = _eventService;
    config.interval = 0;
    config.wrap = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = true;
  }

  recipients: string[] = [];

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 500;
    this.loadCards();
  }

  loadCards() {
    this.recipients = this.card.recipients!;
    if (this.recipients.length > 0)
      this.getGifts(0);
  }

  getGifts(ix: number) {
    if (ix < this.recipients.length) {
      
      if (this.recipients[ix].toLowerCase() != 'all') {
        this.service.getGiftsByRecipient(this.recipients[ix]).then(cards => {
          cards.forEach(card => {
            if (this.cards.findIndex(x => x.card.id! == card.id!) < 0) {
              this.cards.push(new AddMore(card));
            }
          });
          this.getGifts(ix + 1);
        });
      }
      else {
        this.loadBatch();
        //this.getAllGifts();
      }
    }
    else {
      this.loadBatch();
    }
  }

  getAllGifts() {
    this.cards = [];
    this.service.getGiftsLimited(30).then(cards => {
      cards.forEach(card => {
        this.cards.push(new AddMore(card));
      });
      this.loadBatch();
    })
  }

  loadBatch() {
    this.batches = [];
    let items: AddMore[] = [];
    let counter: number = 1;
    const displayCount: number = this.isMobile ? 3 : 6;

    this.cards.forEach(item => {
      items.push(item);
      if (counter == displayCount) {
        counter = 1;
        let batch: Batch = new Batch();
        batch.items = items;
        this.batches.push(batch);
        items = [];
      }
      else {
        counter++;
      }
    })

    if (items.length > 0) {
      let batch: Batch = new Batch();
      items.forEach(item => {
        batch.items.push(item);
      })
      this.batches.push(batch);
    }
  }

  addMoreChange(id: string, count: any) {
    this.cards.forEach(card => {
      if (card.card.id == id) {
        card.count = count;
        this.updateSelected(card);
      }
    });
  }

  updateSelected(addMore: AddMore) {
    let isFound: boolean = false;

    if (this.selected.length > 0) {
      this.selected.forEach(value => {
        if (value.card.id == addMore.card.id) {
          isFound = true;
          value.count = addMore.count;
        }
      });
    }

    if (!isFound) {
      let item = new AddMore(addMore.card);
      addMore.count = addMore.count;
      this.selected.push(addMore);
    }

    this.selectedChange.emit(this.selected);
  }
}
