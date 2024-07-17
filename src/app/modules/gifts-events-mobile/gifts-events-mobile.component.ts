import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../models/event';

@Component({
  selector: 'app-gifts-events-mobile',
  templateUrl: './gifts-events-mobile.component.html',
  styleUrls: ['./gifts-events-mobile.component.scss']
})
export class GiftsEventsMobileComponent implements OnInit {

  @Input() set events(_events: Event[]) {
    this.eventList = _events
  }

  eventList: Event[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
