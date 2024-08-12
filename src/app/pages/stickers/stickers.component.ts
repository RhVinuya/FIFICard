import { ActivatedRoute } from '@angular/router';
import { PriceService } from '../../services/price.service';
import { Title } from '@angular/platform-browser';
import { CardService } from '../../services/card.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { Card } from '../../models/card';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.scss']
})
export class StickersComponent implements OnInit {
  service: EventService;
  cardService: CardService;
  priceService: PriceService;
  def: ChangeDetectorRef;

  constructor(
    private _service: EventService,
    private _cardService: CardService,
    private _priceService: PriceService,
    private _def: ChangeDetectorRef
  ) {
    this.service = _service;
    this.cardService = _cardService;
    this.priceService = _priceService
    this.def = _def;
  }

  events: Event[] = [];
  featured: Event;

  ngOnInit(): void {
    this.loadStickers();
  }

  loadStickers() {
    this.service.getEventSticker().then((events: Event[]) => {
      this.events = events;
      this.featured = events.find(x => x.name! == 'Valentines')!;
    });
  }
}
