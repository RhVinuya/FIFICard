
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INewCard } from 'src/app/new-models/new-card';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-cards',
  templateUrl: './new-cards.component.html',
  styleUrls: ['./new-cards.component.scss']
})
export class NewCardsComponent implements OnInit {

  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.ref = _ref;
  }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Cards",
      url: "",
      active: true
    }
  ];

  cardevents = environment.cardevents;
  recipientoptions = ['FOR ALL', 'FOR HIM', 'FOR HER', 'FOR KIDS AND TEENS'];
  filteroptions = ['POETRY', 'MESSAGE', 'PERSONALIZED', 'TALKING CARD'];

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

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      this.event = '';
      this.events = [];
      this.recipient = '';
      this.recipients = [];

      if (id !== 'all') {
        console.log(this.cardevents)
        if (this.cardevents.findIndex(x => x.toLowerCase() === id.toLowerCase()) >= 0) {
          this.event = id;
          this.events.push(id);
        }
        else if (this.recipientoptions.findIndex(x => x.toLowerCase() === id.toLowerCase()) >= 0) {
          this.recipient = id;
          this.recipients.push(id);
        }
        else if (this.filteroptions.findIndex(x => x.toLowerCase() === id.toLowerCase()) >= 0) {
          this.filter = id;
          this.filters.push(id);
        }
      }
      
      this.ref.detectChanges();
      this.loadDisplay();
    });
    this.loadCards();
  }

  async loadCards() {
    this.loading = true;
    this.cards = await this.cardService.getAll();

    this.cardevents.forEach(event => {
      let list = this.cards.filter(x => x.event.toLowerCase() === event.toLowerCase())
      if (list.length > 0) this.activeevents.push(event)
    })
  
    this.loadDisplay();
    this.loading = false;
  }

  loadmore() {
    this.displayCount = this.displayCount + 20;
    if (this.display.length < this.displayCount) this.displayCount = this.display.length;
  }

  loadDisplay() {
    if (this.cards.length > 0) {

      this.display = [];

      //filter events
      if (this.events.length === 0) {
        this.cards.forEach(card => {
          let found: boolean = false;
          environment.cardevents.forEach(event => {
            if (card.event.toLowerCase() === event.toLowerCase()) found = true
          })
          if (found) this.display = [...this.display, card];
        });
      }
      else {
        this.cards.forEach(card => {
          let found: boolean = false;
          this.events.forEach(event => {
            if (card.event.toLowerCase() === event.toLowerCase()) found = true
          })
          if (found) this.display = [...this.display, card];
        })
      }

      //filter recipients
      if (this.recipients.length > 0 && this.display.length > 0) {
        const temp = this.display.map(object => ({ ...object }))
        this.display = [];
        temp.forEach(card => {
          let found: boolean = false;
          this.recipients.forEach(recipient => {
            if (recipient === 'FOR ALL') found = true
            else if (card.recipients.findIndex(x => x.toLowerCase() === recipient.toLowerCase()) >= 0) found = true
          })
          if (found) this.display = [...this.display, card];
        })
      }

      //filter
      if (this.filters.length > 0 && this.display.length > 0) {
        const temp = this.display.map(object => ({ ...object }))
        this.display = [];
        temp.forEach(card => {
          let found: boolean = false;
          this.filters.forEach(filter => {
            if (filter === 'POETRY' && card.messagetype === 'poetry') found = true;
            else if (filter === 'MESSAGE' && card.messagetype === 'regular') found = true;
            else if (filter === 'PERSONALIZED' && card.signAndSend === true) found = true;
            else if (filter === 'TALKING CARD' && card.talkingcard === true) found = true;
          })
          if (found) this.display = [...this.display, card];
        })
      }

      this.ref.detectChanges();
      this.updateCount(this.display.length);
    }
  }

  onClickEvent(event: string) {
    if (this.events.length > 0) {
      if (this.events[0] === event) this.events = [];
      else this.events = [event];
    }
    else this.events = [event]
    this.loadDisplay();
  }

  onRemoveEvent(event: string) {
    this.events = [...this.events.filter(x => x !== event)]
    this.loadDisplay();
  }

  onClickRecipient(e: any) {
    let idx = this.recipients.findIndex(x => x === e.target.value);
    if (e.target.checked === true) {
      if (idx <= 0) this.recipients.push(e.target.value)
    }
    else {
      if (idx >= 0) this.recipients = this.recipients.filter(x => x !== e.target.value)
    }
    this.loadDisplay();
  }

  onClickFilter(e: any) {
    let idx = this.filters.findIndex(x => x === e.target.value);
    if (e.target.checked === true) {
      if (idx <= 0) this.filters.push(e.target.value)
    }
    else {
      if (idx >= 0) this.filters = this.filters.filter(x => x !== e.target.value)
    }
    this.loadDisplay();
  }

  updateCount(count: number) {
    this.breadcrumbs = [
      {
        title: "Home",
        url: "/",
        active: false
      },
      {
        title: "Cards ( " + count + " )",
        url: "",
        active: true
      }
    ];
    this.ref.detectChanges();
  }
}
