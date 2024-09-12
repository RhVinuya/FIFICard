import { EventService } from "./../../../services/event.service";
import { NewCardService } from "src/app/new-services/new-card.service";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { INewCard } from "src/app/new-models/new-card";
import { NewEventService } from "src/app/new-services/new-event.service";
import { NewEvent } from "src/app/new-models/new-event";

@Component({
  selector: "app-card-categories-mobile",
  templateUrl: "./card-categories-mobile.component.html",
  styleUrls: ["./card-categories-mobile.component.scss"],
})
export class CardCategoriesMobileComponent implements OnInit {
  eventService: NewEventService;
  columns: number = 2;

  cardevents = environment.cardevents;

  activeevents: string[] = [];
  events: NewEvent[] = [];

  constructor(_eventService: NewEventService) {
    this.eventService = _eventService;
  }

  ngOnInit(): void {
    this.load().then(() => {
      console.log("card categories loaded");
    });
  }

  async load() {
    this.events = await this.eventService.getEventByType("card");
    console.log(this.events);
  }

  getColumnSize() {
    return 12 / this.columns;
  }
}
