import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  @Input() set cards(_cards: Card[]) {
    this.allCards = _cards.filter(x => x.type === 'card');
    this.allECards = _cards.filter(x => x.type === 'ecard');
    this.allGifts = _cards.filter(x => x.type === 'gift');
    this.allStickers = _cards.filter(x => x.type === 'sticker');
    this.allPostcards = _cards.filter(x => x.type === 'postcard');
  }

  allCards: Card[] = [];
  allECards: Card[] = [];
  allGifts: Card[] = [];
  allStickers: Card[] = [];
  allPostcards: Card[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
