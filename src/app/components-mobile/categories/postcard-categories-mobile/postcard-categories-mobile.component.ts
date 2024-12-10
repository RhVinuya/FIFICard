import { Component, OnInit } from '@angular/core';
import { NewEvent } from 'src/app/new-models/new-event';
import { NewEventService } from 'src/app/new-services/new-event.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-postcard-categories-mobile',
  templateUrl: './postcard-categories-mobile.component.html',
  styleUrls: ['./postcard-categories-mobile.component.scss']
})
export class PostcardCategoriesMobileComponent implements OnInit {
  eventService: NewEventService;
  columns: number = 2;
  storageService: NewStorageService;

  cardevents = environment.cardevents;

  activeevents: string[] = [];
  events: NewEvent[] = [];
  loading: boolean = false;

  constructor(
    _eventService: NewEventService,
    _storageService: NewStorageService
  ) {
    this.eventService = _eventService;
    this.storageService = _storageService;
  }

  ngOnInit(): void {
    this.loading = true;
    this.load().then(() => {
      console.log("card categories loaded");
      this.loading = false;
    });
  }

  async load() {
    let events = await this.eventService.getEventByType('postcard');

    this.events = events.filter( o => o.icon);
    this.storageService.saveCategories('postcards', this.events);
  }

  getColumnSize() {
    return 12 / this.columns;
  }
}
