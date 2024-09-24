import { Component, OnInit } from '@angular/core';
import { NewEvent } from 'src/app/new-models/new-event';
import { NewEventService } from 'src/app/new-services/new-event.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gift-categories-mobile',
  templateUrl: './gift-categories-mobile.component.html',
  styleUrls: ['./gift-categories-mobile.component.scss']
})
export class GiftCategoriesMobileComponent implements OnInit {
  eventService: NewEventService;
  columns: number = 2;
  storageService: NewStorageService;

  cardevents = environment.cardevents;

  activeevents: string[] = [];
  events: NewEvent[] = [];

  constructor(
    _eventService: NewEventService,
    _storageService: NewStorageService
  ) {
    this.eventService = _eventService;
    this.storageService = _storageService;
  }

  ngOnInit(): void {
    this.load().then(() => {
      console.log("card categories loaded");
    });
  }

  async load() {
    let events = await this.eventService.getEventByType('gift');

    this.events = events;//.filter( o => o.icon);
    this.storageService.saveCategories('gifts', this.events);
  }

  getColumnSize() {
    return 12 / this.columns;
  }

}
