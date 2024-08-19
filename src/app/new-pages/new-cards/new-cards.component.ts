
import { Component, OnInit } from '@angular/core';
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

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService
  }

  loading: boolean = false;
  cards: INewCard[] = [];
  display: INewCard[] = [];
  displayCount: number = 20;
  events: string[] = []

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
    if (this.cards.length < this.displayCount) this.displayCount = this.cards.length - 1
  }

  loadDisplay() {
    if (this.cards.length > 0) {
      this.display = [];
      if (this.events.length === 0) {
        this.cards.forEach(card => {
          let found: boolean = false;
          environment.events.forEach(event => {
            if (card.events.findIndex(x => x.toLowerCase() === event.toLowerCase()) >= 0) {
              found = true
            }
          })
          if (found) this.display = [...this.display, card];
        });
      }
      else {
        this.cards.forEach(card => {
          let found: boolean = false;
          this.events.forEach(event => {
            if (card.events.findIndex(x => x.toLowerCase() === event.toLowerCase()) >= 0) {
              found = true
            }
          })
          if (found) this.display = [...this.display, card];
        })
      }
      this.updateCount(this.display.length)
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

  updateCount(count: number){
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
  }
}
