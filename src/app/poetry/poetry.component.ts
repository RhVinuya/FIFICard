import { PriceService } from './../services/price.service';
import { Title } from '@angular/platform-browser';
import { CardService } from 'src/app/services/card.service';
import { EventService } from 'src/app/services/event.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Event } from '../models/event';
import { Card } from '../models/card';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-poetry',
  templateUrl: './poetry.component.html',
  styleUrls: ['./poetry.component.scss']
})
export class PoetryComponent implements OnInit {
  def: ChangeDetectorRef;
  service: EventService;
  cardService: CardService;
  priceService: PriceService;

  constructor(
    _def: ChangeDetectorRef,
    _service: EventService,
    _cardService: CardService,
    _priceService: PriceService
  ) {
    this.def = _def;
    this.service = _service;
    this.cardService = _cardService;
    this.priceService = _priceService;
  }

  featured: Event;
  events: Event[] = [];
  occasions: Event[] = [];
  specialty: Event[] = [];
  
  featuredButton = '';
  featuredEvents = [
    'Christmas',
    'New Year',
    "Father’s Day",
    'Graduation',
    "Mother’s Day",
    "Valentine's Day"
  ];
  featuredImages = [
    'btn-featured-xmas.png',
    'btn-featured-nyear.png',
    'btn-featured-father.png',
    'btn-featured-graduation.png',
    'btn-featured-mother.png',
    'btn-featured-valentines.png'
  ];

  ngOnInit(): void {
    this.loadEvents();
  }

  sort(events: Event[]): Event[] {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let eventsWithSched: Event[] = events.filter(x => x.month != '');
    let date: Date = new Date();
    let monthId: number = date.getMonth();
    let day: number = date.getDate();

    let newEvents: Event[] = [];
    let temp: Event[] = [];

    if (eventsWithSched.length > 0) {
      for (let i = 0; i < 12; i++) {
        eventsWithSched.forEach(event => {
          if (event.month == monthNames[monthId]) {
            if (event.date) {
              if ((event.month == monthNames[date.getMonth()]) && (event.date < day)) {
                temp.push(event)
              }
              else {
                newEvents.push(event);
              }
            }
            else {
              newEvents.push(event);
            }
          }
        })

        if (monthId < 11)
          monthId = monthId + 1;
        else
          monthId = 0;
      }

      newEvents.push(...temp);
    }

    newEvents.push(...events.filter(x => x.month == ''))

    return newEvents;
  }

  loadEvents() {
    this.service.getEventCard().then(events => {
      //this.featured = this.sort(events.filter(x => x.tag == 'Events'))[0];
      this.featured = events.find(x => x.name! == "Valentine's Day")!;

      let index = this.featuredEvents.findIndex(x => x == this.featured.name!);
      if (index >= 0) {
        this.featuredButton = '/assets/images/poetry/' + this.featuredImages[index];
      }

      this.events = this.sort(events.filter(x => x.tag == 'Events'));//.filter(x => x.name! != this.featured.name!));
      this.occasions = this.sort(events.filter(x => x.tag == 'Occasions'));
      this.specialty = this.sort(events.filter(x => x.tag == 'Specialty Card'));
    })
  }
}
