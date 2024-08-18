import { Component, OnInit } from '@angular/core';
import { INewCard } from 'src/app/new-models/new-card';
import { NewCardService } from 'src/app/new-services/new-card.service';

@Component({
  selector: 'app-new-cards',
  templateUrl: './new-cards.component.html',
  styleUrls: ['./new-cards.component.scss']
})
export class NewCardsComponent implements OnInit {

  cardService: NewCardService;

  constructor(
    _cardService: NewCardService
  ) { 
    this.cardService = _cardService
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

  loading: boolean = false;
  cards: INewCard[] = [];
  displayCount: number = 18

  ngOnInit(): void {
    this.loadCards();
  }

  async loadCards() {
    this.loading = true;
    this.cards = await this.cardService.getAll();
    this.loading = false;
  }

  loadmore(){
    this.displayCount = this.displayCount + 18;
    if (this.cards.length < this.displayCount) this.displayCount = this.cards.length - 1
  }
}
