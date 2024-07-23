import { CardService } from 'src/app/services/card.service';
import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @Input() set events(_event: Event[]) {
    this.eventlist = _event;
  }
  @Input() type: 'card' | 'signandsend' = 'card';

  service: CardService;
  isMobile: boolean = false;

  constructor(
    private _service: CardService,
    platform: Platform
  ) {
    
    this.isMobile = platform.is("capacitor") || platform.is("mobileweb");
    this.service = _service;
  }

  eventlist: Event[] = [];

  ngOnInit(): void {
  }
}
