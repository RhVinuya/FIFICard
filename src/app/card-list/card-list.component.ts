import { PriceService } from './../services/price.service';
import { SettingService } from './../services/setting.service';
import { RecipientService } from './../services/recipient.service';
import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../models/card';
import { Recipient } from '../models/recipient';
import { Cardtype } from '../models/cardtype';

export class Page {
  public index: number;
  public start: number;
  public end: number;
  public display: string;
  public showing: string;
  public selected: boolean;

  constructor(_index: number) {
    this.index = _index;
  }
}

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input() cards: Card[];
  @Input() priority: string;
  @Input() recipient: string;
  @Input() footer: boolean = true;
  @Input() mode: 'card' | 'gift' | 'sticker' = 'card';

  recipientService: RecipientService;
  settingService: SettingService;
  priceService: PriceService;

  recipientConfig: Recipient[] = [];

  budget: string = '';
  type: string = '';
  sort: string = '';
  message: '' | 'regular' | 'poetry' = '';
  select: '' | 'featured' | 'bestseller' = '';

  filterCards: Card[] = [];
  sortCards: Card[] = [];
  displayCards: Card[] = [];
  pages: Page[] = [];
  index: number;
  batchLimit: number = 36;
  batchCount: number = 0;
  batchShowing: string = '';
  selectedPage: Page;
  disablePrev: boolean;
  disableNext: boolean;

  recipients: string[] = [];
  selectedRecipient: string;

  types: Cardtype[] = [];

  constructor(
    _recipientService: RecipientService,
    _settingService: SettingService,
    _priceService: PriceService
  ) {
    this.recipientService = _recipientService;
    this.settingService = _settingService;
    this.priceService = _priceService;
  }

  ngOnInit(): void {
    this.getTypes();
    this.loadRecipients();
  }

  loadRecipients() {
    this.recipientService.getRecipients().then(recipients => {
      this.recipientConfig = recipients;
      this.loadCards();
    });
  }

  getTypes() {
    this.settingService.getCardType().then(types => {
      this.types = types;
    })
  }

  loadCards() {
    this.filterCards = this.cards;
    this.loadRecipient(this.cards);
    this.selectedRecipient = this.recipient != undefined ? this.recipient : this.selectedRecipient;
    this.filterCards = this.filterForRecipient();
    this.applyDisplayFilterAndSort();
  }

  averageRatings(value?: number): number {
    if (!value) {
      return 0;
    }
    else if (Number.isNaN(Number(value))) {
      return 0;
    }
    else {
      return value;
    }
  }

  applyDisplayFilterAndSort() {
    this.sortCards = this.filterCards;

    if (this.budget != '') {
      this.sortCards = this.filterForBudget(this.budget, this.sortCards);
    }
    if (this.type != '') {
      this.sortCards = this.filterForType(this.type, this.sortCards);
    }
    if (this.message != '') {
      this.sortCards = this.filterForMessageType(this.message, this.sortCards);
    }
    if (this.select != '') {
      this.sortCards = this.filterForSelect(this.select, this.sortCards);
    }
    this.sortCards = this.sortRecord(this.sort, this.sortCards);

    if (this.priority != undefined) {
      let index: number = this.sortCards.findIndex(x => x.id! == this.priority);
      if (index >= 0) {
        let card = this.sortCards[index];
        this.sortCards.splice(index, 1);
        this.sortCards.unshift(card);
      }
    }

    this.initializeBatch();
    this.loadBatch(1);
  }

  getPrice(card: Card): number {
    let type: 'STANDARD' | 'GLITTERED' | 'EMBOSSED' = 'STANDARD'
    if (card.types!.findIndex(x => x == 'STANDARD') >= 0) {
      type = 'STANDARD';
    }
    else if (card.types!.findIndex(x => x == 'GLITTERED') >= 0) {
      type = 'GLITTERED';
    }
    if (card.types!.findIndex(x => x == 'EMBOSSED') >= 0) {
      type = 'EMBOSSED';
    }
    return this.priceService.getPrice(card, type)
  }

  filterForRecipient(): Card[] {
    if (this.selectedRecipient != "All") {
      let cards: Card[] = []
      this.cards.forEach(card => {
        let recipients = card.recipients != undefined ? card.recipients : card.recipient!.split(',');
        if (recipients.findIndex(x => x.toLowerCase() == this.selectedRecipient.toLocaleLowerCase()) >= 0) {
          cards.push(card);
        }
      });
      return cards;
    }
    else {
      return this.cards;
    }
  }

  filterForBudget(_budget: string, data: Card[]): Card[] {
    let filtered: Card[] = []
    data.forEach(card => {
      if (_budget == '0 - 99') {
        if (this.getPrice(card) <= 99) {
          filtered.push(card);
        }
      }
      else if (_budget == '100 - 199') {
        if ((100 <= this.getPrice(card)) && (this.getPrice(card) <= 199)) {
          filtered.push(card);
        }
      }
      else if (_budget == '200 and Up') {
        if (200 <= this.getPrice(card)) {
          filtered.push(card);
        }
      }
    });
    return filtered;
  }

  filterForType(_type: string, data: Card[]): Card[] {
    let filtered: Card[] = [];
    data.forEach(card => {
      if (card.types) {
        card.types.forEach(type => {
          if (type.toUpperCase() == _type.toUpperCase()) {
            filtered.push(card);
          }
        })

      }
    });
    return filtered;
  }

  filterForMessageType(_type: 'regular' | 'poetry', data: Card[]): Card[] {
    return data.filter(x => x.messagetype == _type);
  }

  filterForSelect(_type: 'featured' | 'bestseller', data: Card[]): Card[] {
    if (_type == 'featured') {
      return data.filter(x => x.featured! == true);
    }
    else {
      return data.filter(x => x.bestseller! == true);
    }
  }

  sortRecord(_sort: string, data: Card[]): Card[] {
    if (_sort == "Latest") {
      return data.sort((a, b) => 0 - (a.created! > b.created! ? -1 : 1));
    }
    else if (_sort == "Price from Low to High") {
      return data.sort((a, b) => 0 - (this.getPrice(a) > this.getPrice(b) ? -1 : 1));
    }
    else if (_sort == "Price from High to Low") {
      return data.sort((a, b) => 0 - (this.getPrice(a) > this.getPrice(b) ? 1 : -1));
    }
    else if (_sort == "Highest Ratings") {
      return data.sort((a, b) => 0 - (this.averageRatings(a.ratings) > this.averageRatings(b.ratings) ? 1 : -1));
    }
    return data.sort((a, b) => 0 - (a.name!.trim().toUpperCase() > b.name!.trim().toUpperCase() ? -1 : 1));
  }

  onRecipientClick(recipient: string) {
    this.selectedRecipient = recipient;
    this.filterCards = this.filterForRecipient();
    this.applyDisplayFilterAndSort();
  }

  loadRecipient(cards: Card[]) {
    this.recipients = [];
    let withOther: boolean = false;

    this.cards.forEach(card => {
      card.recipients?.forEach(recipient => {
        if ((recipient.trim().toLocaleLowerCase() != 'all') && (recipient.trim().toLocaleLowerCase() != 'any') && (recipient != '')) {
          if (this.recipientConfig.findIndex(x => x.name.trim().toLowerCase() == recipient.trim().toLowerCase()) >= 0) {
            if (this.recipients.findIndex(x => x.trim().toLowerCase() == recipient.trim().toLowerCase()) < 0) {
              this.recipients.push(recipient.trim());
              this.selectedRecipient = recipient.trim();
            }
          }
        }
        else {
          withOther = true;
        }
      })
    });

    this.recipients = this.recipients.sort();

    if (this.recipients.length > 1) {
      this.recipients.unshift("All");
    }

    if (this.recipients.length == 0) {
      this.recipients.push("All");
    }

    this.selectedRecipient = this.recipients[0];
  }

  initializeBatch() {
    this.pages = [];

    if (this.sortCards.length > this.batchLimit) {
      this.batchCount = Math.trunc(this.sortCards.length / this.batchLimit);
      if (this.batchCount < (this.sortCards.length / this.batchLimit)) {
        this.batchCount++;
      }
    }
    else {
      this.batchCount = 1;
    }

    for (let i = 1; i <= this.batchCount; i++) {
      let page: Page = new Page(i);
      page.end = i * this.batchLimit;
      if (page.end > this.sortCards.length)
        page.end = this.sortCards.length;
      if (this.sortCards.length > this.batchLimit)
        page.start = page.end - (this.batchLimit - 1);
      else
        page.start = 1;

      //page.display = `${this.page} ${i} ${this.of} ${this.batchCount}`;
      //page.showing = `${this.showing} ${page.start} - ${page.end} ${this.to} ${this.sortCards.length} ${this.items}`;
      this.pages.push(page);
    }
  }

  loadBatch(_index: number) {
    this.index = _index;
    this.pages.forEach(page => {
      if (page.index == this.index) {
        page.selected = true;
        this.displayCards = [];
        for (let i = page.start - 1; i <= page.end - 1; i++) {
          this.displayCards.push(this.sortCards[i]);
        }
        this.batchShowing = page.showing;
        this.selectedPage = page;
      }
      else {
        page.selected = false;
      }
    });
    if (this.index == 1) {
      this.disablePrev = false;
      this.disableNext = true;
    }
    else if (this.index == this.batchCount) {
      this.disablePrev = true;
      this.disableNext = false;
    }
    else {
      this.disablePrev = true;
      this.disableNext = true;
    }
  }

  changeSelected(event: any) {
    this.loadBatch(+event.target.value);
  }

  clickNext() {
    this.loadBatch(this.index + 1);
  }

  clickPrev() {
    this.loadBatch(this.index - 1);
  }

  changeBudget(event: any) {
    this.budget = event.target.value;
    if (this.filterCards.length > 0) {
      this.applyDisplayFilterAndSort();
    }
  }

  changeType(event: any) {
    this.type = event.target.value;
    if (this.filterCards.length > 0) {
      this.applyDisplayFilterAndSort();
    }
  }

  changeSort(event: any) {
    this.sort = event.target.value;
    if (this.filterCards.length > 0) {
      this.applyDisplayFilterAndSort();
    }
  }

  changeMessage(event: any) {
    this.message = event.target.value;
    if (this.filterCards.length > 0) {
      this.applyDisplayFilterAndSort();
    }
  }

  changeSelect(event: any) {
    this.select = event.target.value;
    if (this.filterCards.length > 0) {
      this.applyDisplayFilterAndSort();
    }
  }
}
