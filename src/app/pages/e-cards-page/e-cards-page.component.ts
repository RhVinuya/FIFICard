import { Title } from '@angular/platform-browser';
import { EventService } from 'src/app/services/event.service';
import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-e-cards-page',
  templateUrl: './e-cards-page.component.html',
  styleUrls: ['./e-cards-page.component.scss']
})
export class ECardsPageComponent implements OnInit {
  eventService: EventService;
  cardService: CardService;

  constructor(
    _eventService: EventService,
    _cardService: CardService
  ) {
    this.eventService = _eventService;
    this.cardService = _cardService;
  }

  orders = [
    "Happy Birthday",
    "Anniversary",
    "Wedding",
    "Graduation",
    "Mother's Day",
    "Father’s Day",
    "Grandparent's Day",
    "Baptism",
    "Valentine's Day",
  ]

  spOrder = [
    "Thank You",
    "Get Well",
    "Pet"
  ]

  events: Event[] = [];
  spEvents: Event[] = [];

  ngOnInit(): void {
    this.loadEvents();
  }

  async loadEvents() {
    this.eventService.getEventECard().then(async events => {
      this.orders.forEach(async order => {
        let event = events.find(x => x.name! == order);
        if (event != undefined) {
          let cards = await this.cardService.getCardsByTypeAndEvent('ecard', event.name!);
          if (cards.length > 0)
            this.events.push(event);
        }
      })

      this.spOrder.forEach(async order => {
        let event = events.find(x => x.name! == order);
        if (event != undefined) {
          let cards = await this.cardService.getCardsByTypeAndEvent('ecard', event.name!);
          if (cards.length > 0)
            this.spEvents.push(event);
        }
      })
    })
  }

  async checkAvailability(event: Event): Promise<Boolean> {
    let cards = await this.cardService.getCardsByTypeAndEvent('ecard', event.name!);
    return cards.length > 0;
  }
}
