
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { INewCard } from "src/app/new-models/new-card";
import { NewEventService } from "src/app/new-services/new-event.service";
import { NewEvent } from "src/app/new-models/new-event";
import { EventService } from './../../../services/event.service';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: "app-card-categories-mobile",
  templateUrl: "./card-categories-mobile.component.html",
  styleUrls: ["./card-categories-mobile.component.scss"],
})
export class CardCategoriesMobileComponent implements OnInit {
  eventService: NewEventService;
  columns: number = 2;
  storageService: NewStorageService;
  
  loading: boolean = false;


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
    this.loading = true;
    this.load().then(() => {
      console.log("card categories loaded");
      this.loading = false;
    });
  }

  async load() {
    let events = await this.eventService.getEventByType('card');

    this.events = events.filter( o => o.icon);
    this.storageService.saveCategories('cards', this.events);
    
  }

  getColumnSize() {
    return 12 / this.columns;
  }
}
