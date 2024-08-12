import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-search-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.scss']
})
export class SearchListingComponent implements OnInit {
  @Input() set cards(_cards: Card[]) {
    this.allCards = _cards;
    this.loadbutton = (this.allCards.length !== 0) && (this.allCards.length > this.limit);
    this.loaditems();
  }

  allCards: Card[] = [];
  displayCards: Card[] = [];
  limit: number = 20;
  loadbutton: boolean = false;
  loadcount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  loaditems(){
    let current = this.loadcount;
    this.loadcount = this.loadcount + this.limit;
    this.loadcount = this.allCards.length > this.loadcount ? this.loadcount : this.allCards.length;
    this.displayCards = [...this.displayCards, ...this.allCards.slice(current, this.loadcount)];
    this.loadbutton =  (this.allCards.length !== this.displayCards.length);

  }

  onLoadMoreClick() {
    this.loaditems();
  }

}
