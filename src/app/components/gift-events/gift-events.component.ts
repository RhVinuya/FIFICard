import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-gift-events',
  templateUrl: './gift-events.component.html',
  styleUrls: ['./gift-events.component.scss']
})
export class GiftEventsComponent implements OnInit {
  @Input() set events(_events: Event[]) {
    this.eventList = _events
  }

  constructor() {
  }

  eventList: Event[] = [];

  ngOnInit(): void {
  }

}
