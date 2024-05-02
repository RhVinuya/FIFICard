import { PriceService } from './../services/price.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { CardService } from '../services/card.service';
import { LoadingController } from '@ionic/angular';
import { Card } from '../models/card';

@Component({
  selector: 'app-postcards',
  templateUrl: './postcards.component.html',
  styleUrls: ['./postcards.component.scss']
})
export class PostcardsComponent implements OnInit {

  loadingController: LoadingController;
  eventService: EventService;
  cardService: CardService;
  priceService: PriceService;

  constructor(
    _loadingController: LoadingController,
    _eventService: EventService,
    _cardService: CardService,
    _priceService: PriceService
  ) {
    this.loadingController = _loadingController;
    this.eventService = _eventService;
    this.cardService = _cardService;
    this.priceService = _priceService;
  }

  original: Card[] = []
  cards: Card[] = []
  allEvents: Event[] = [];
  events: Event[] = [];
  others: Event[] = [];

  title: string = "ALL";

  ngOnInit(): void {
    this.initalize();
  }

  async initalize() {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    try {
      this.original = await this.cardService.getCardsByType("postcard");
      this.cards = this.original;
      this.allEvents = await  this.eventService.getEventPostcard();
      this.events = this.allEvents.filter(x => x.tag === 'Events');
      this.others = this.allEvents.filter(x => x.tag === 'Others');
    }
    finally {
      await loading.dismiss();
    }
  }

  async setEvent(id: string) {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    try{
      if (id === 'all'){
        this.cards = this.original;
        this.title = "ALL";
      }
      else {
        this.cards = [];
        let event: Event | undefined = this.allEvents.find(x => x.id === id);
        if (event){
          this.title = event.title && event.title !== '' ? event.title.toUpperCase() : event.name!.toUpperCase();
          this.original.forEach(card => {
            if (card.events!.findIndex(x => x === event!.name) >= 0) this.cards.push(card);
          })
        }
      }
    }
    finally{
      await loading.dismiss();
      const element = document.getElementById('items');
      if (element != null) {
        element.scrollIntoView({ behavior: 'smooth' });
     }

    }
  }
}
