import { PriceService } from './../services/price.service';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  service: EventService;
  priceService: PriceService;
  loadingController: LoadingController;

  constructor(
    _service: EventService,
    _priceService: PriceService,
    _loadingController: LoadingController
  ) {
    this.service = _service;
    this.priceService = _priceService;
    this.loadingController = _loadingController;
  }

  occassions: Event[] = [];
  events: Event[] = [];
  loading: HTMLIonLoadingElement;

  eventSort = [
    "Birthday",
    "Anniversary",
    "Wedding",
    "Retirement",
    "Graduation",
    "Mother's Day",
    "Father’s Day",
    "Grandparent's Day",
    "Baby",
    "Baptism",
    "Confirmation",
    "First Communion",
    "Military Appreciation",
    "Parents Appreciation",
    "Teacher Appreciation",
    "Thanksgiving",
    "Halloween",
    "Christmas",
    "New Year",
    "Valentine's Day",
    "Easter"
  ]

  ngOnInit(): void {
    this.loadevents();
  }

  async loadevents() {
    this.loading = await this.loadingController.create({
      message: 'Loading Events...'
    });
    await this.loading.present();
    try {
      let events: Event[] = await this.service.getEventCard();
      this.events = this.eventSorting(events.filter(x => (x.tag == 'Occasions') || (x.tag == 'Events')));
    }
    finally {
      await this.loading.dismiss();
    }
  }

  eventSorting(items: Event[]): Event[] {
    let temp: Event[] = items;
    let sorted: Event[] = [];
    this.eventSort.forEach(value => {
      sorted.push(temp.find(x => x.name === value)!);
      temp.filter(x => x.name !== value);
    })

    return sorted
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
}
