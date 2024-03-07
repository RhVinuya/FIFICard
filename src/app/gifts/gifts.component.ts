import { PriceService } from './../services/price.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent implements OnInit {
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

  categories: Event[] = [];
  recipients: Event[] = [];
  events: Event[] = [];

  mode: 'Category' | 'Recipient' | 'Event' = 'Category';

  ngOnInit(): void {
    this.loadCategory();
    this.loadRecipient();
    this.loadEvent();
  }

  modeChange(mode: 'Category' | 'Recipient' | 'Event') {
    this.mode = mode;
  }

  async loadCategory() {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Categories...'
    });
    await loading.present();

    try {
      let events: Event[] = await this.service.getByTag('Shop by Category')
      events.forEach(event => {
        if (event.thumbnail) {
          this.categories.push(event);
        }
      })
      this.categories = this.sort(this.categories);
    }
    finally {
      await loading.dismiss();
    }
  }

  async loadRecipient() {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Recipients...'
    });
    await loading.present();

    try {
      let events: Event[] = await this.service.getByTag('Shop by Recipient')
      events.forEach(event => {
        if (event.thumbnail) {
          this.recipients.push(event);
        }
      })
      this.recipients = this.sort(this.recipients);
    }
    finally {
      await loading.dismiss();
    }
  }
  
  movetotop(title: string, list: Event[]): Event[] {
    return [...list.filter(x => x.name === title), ...list.filter(x => x.name !== title)];
  }

  movetolast(title: string, list: Event[]): Event[] {
    return [...list.filter(x => x.name !== title), ...list.filter(x => x.name === title)];
  }

  async loadEvent() {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Events...'
    });
    await loading.present();

    try {
      let events: Event[] = await this.service.getByTag('Shop by Event');
      events.forEach(event => {
        if (event.thumbnail != '') {
          this.events.push(event);
        }
      })
      this.events = this.sort(this.events);
      this.events = this.movetotop("Gifts for Father's Day", this.events);
      this.events = this.movetotop("Gifts for Mother's Day", this.events);
      this.events = this.movetotop("Gifts for Easter", this.events);
      this.events = this.movetotop("Gifts for Graduation", this.events);
      
      this.events = this.movetolast("Gifts for Halloween", this.events);
      this.events = this.movetolast("Gifts for Thanksgiving", this.events);
      this.events = this.movetolast("Gifts for Christmas", this.events);
      this.events = this.movetolast("Gifts for New year", this.events);
      this.events = this.movetolast("Gifts for Valentines day", this.events);
    }
    finally {
      await loading.dismiss();
    }
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
