import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewCard } from 'src/app/new-models/new-card';
import { NewEvent } from 'src/app/new-models/new-event';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewEventService } from 'src/app/new-services/new-event.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-cards-mobile',
  templateUrl: './cards-mobile.component.html',
  styleUrls: ['./cards-mobile.component.scss']
})
export class CardsMobileComponent implements OnInit {

  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  eventService: NewEventService;
  storageService: NewStorageService

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _eventService: NewEventService,
    _storageService: NewStorageService
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.eventService = _eventService;
    this.storageService = _storageService;
  }

  activeevents: string[] = [];
  event: string;
  recipient: string
  filter: string;
  loading: boolean = false;
  cards: INewCard[] = [];
  display: INewCard[] = [];
  displayCount: number = 20;
  events: string[] = [];
  recipients: string[] = [];
  filters: string[] = [];


  cardevents: NewEvent[] | null = null;

  ngOnInit(): void {
    
    this.activateRoute.params.subscribe( async params => {
      let id = params['id'];
      this.event = '';
      this.events = [];
      this.recipient = '';
      this.recipients = [];

      this.cardevents = this.storageService.getCategories('card');

      console.log(this.cardevents);

      // if (id !== 'all') {
      //   console.log(this.cardevents)
      //   // if (this.cardevents.findIndex(x => x.toLowerCase() === id.toLowerCase()) >= 0) {
      //   //   this.event = id;
      //   //   this.events.push(id);
      //   // }
      //   // else if (this.recipientoptions.findIndex(x => x.toLowerCase() === id.toLowerCase()) >= 0) {
      //   //   this.recipient = id;
      //   //   this.recipients.push(id);
      //   // }
      //   // else if (this.filteroptions.findIndex(x => x.toLowerCase() === id.toLowerCase()) >= 0) {
      //   //   this.filter = id;
      //   //   this.filters.push(id);
      //   // }
      // }
    });
  }

}
