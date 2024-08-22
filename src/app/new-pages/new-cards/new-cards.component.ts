
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  cardevents = environment.cardevents;
  loading: boolean = false;
  cards: INewCard[] = [];
  display: INewCard[] = [];
  displayCount: number = 20;
  events: string[] = [];
  recipeints: string[] = [];

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

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      this.events = [];
      if (id !== 'all') {
        if (this.events.findIndex(x => x === id) < 0) this.events.push(id);
      }
      this.ref.detectChanges();
      this.loadDisplay();
    });
    this.loadCards();
  }

  async loadCards() {
    this.loading = true;
    this.cards = await this.cardService.getAll();
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
      if (this.recipeints.length > 0 && this.display.length > 0) { 
        const temp = this.display.map(object => ({ ...object }))
        this.display = [];
        temp.forEach(card => {
          let found: boolean = false;
          this.recipeints.forEach(recipient => {
            if (recipient === 'FOR ALL') found = true
            else if (card.recipient.toLowerCase() === recipient.toLowerCase()) found = true
          })
          if (found) this.display = [...this.display, card];
        })
      }

      this.ref.detectChanges();
      this.updateCount(this.display.length);
    }
  }

  onClickEvent(event: string) {
    if (this.events.findIndex(x => x === event) < 0) this.events.push(event);
    this.loadDisplay();
  }

  onRemoveEvent(event: string) {
    this.events = [...this.events.filter(x => x !== event)]
    this.loadDisplay();
  }

  onClickRecipient(e: any) {
    let idx = this.recipeints.findIndex(x => x === e.target.value);
    if (e.target.checked === true) {
      if (idx <= 0) this.recipeints.push(e.target.value)
    }
    else {
      if (idx >= 0) this.recipeints = this.recipeints.filter(x => x !== e.target.value)
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
