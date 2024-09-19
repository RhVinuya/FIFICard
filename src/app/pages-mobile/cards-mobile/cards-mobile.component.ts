import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewCard } from 'src/app/new-models/new-card';
import { NewEvent } from 'src/app/new-models/new-event';
import { NewRecipient } from 'src/app/new-models/new-recipient';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewEventService } from 'src/app/new-services/new-event.service';
import { NewRecipientService } from 'src/app/new-services/new-recipients.service';
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
  recipientService: NewRecipientService;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _eventService: NewEventService,
    _storageService: NewStorageService,
    _recipientService: NewRecipientService,
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.eventService = _eventService;
    this.storageService = _storageService;
    this.recipientService = _recipientService;
  }

  activeevents: string[] = [];
  event: string;
  recipient: string
  filter: string;
  loading: boolean = false;
  cards: INewCard[] = [];
  display: INewCard[] = [];
  displayCount: number = 20;
  recipients: string[] = [ "For All" ];
  filters: string[] = [];

  events: NewEvent[] | null = [];
  currentEvent: NewEvent;

  ngOnInit(): void {
    
    this.activateRoute.params.subscribe( async params => {
      this.event = params['event'];

      this.events = this.storageService.getCategories('card');

      this.events?.forEach( (event) => {
        if(event.name == this.event){
          this.currentEvent = event;
        }
      })

      await this.loadCards();
    });

  }

  async loadCards () {
    this.cards = await this.cardService.getByEvent(this.event, false, 'regular');
    this.display = this.cards;

    for(const card of this.cards) {
      for(let recipient of card.recipients!) {
        if(!this.recipients.find( x => x == recipient)){
          this.recipients.push(recipient);
        }
      }

      console.log(card.name, " ----- ",  card.recipient);
    }
  }

  onRecipientSelect(recipient: string) {

    if(recipient == this.recipients[0]) {

      this.display = this.cards;

    }else {

      this.display = this.cards.filter( o => {
        return o.recipients!.includes(recipient);
      })
  
      console.log(this.display);
    }
  }

}
