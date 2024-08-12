import { EventService } from 'src/app/services/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';
import { Event } from '../../models/event';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sign-and-send-cards',
  templateUrl: './sign-and-send-cards.component.html',
  styleUrls: ['./sign-and-send-cards.component.scss']
})
export class SignAndSendCardsComponent implements OnInit {
  cardService: CardService;
  eventService: EventService;
  activateRoute: ActivatedRoute;
  loadingController: LoadingController;

  constructor(
    _cardService: CardService,
    _eventService: EventService,
    _activateRoute: ActivatedRoute,
    _loadingController: LoadingController
  ) {
    this.cardService = _cardService;
    this.eventService = _eventService;
    this.activateRoute = _activateRoute;
    this.loadingController = _loadingController;
  }

  event: Event;
  caption: string = '';
  cards: Card[] = [];

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      if (params['id'] != 'all') {
        this.loadEvent(params['id']);
      }
      else {
        this.loadAllCards();
      }
    });
  }

  async loadEvent(_id: string) {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Event...'
    });
    await loading.present();

    try {
      this.event = await this.eventService.getById(_id);
      this.caption = this.event.name! + ' Cards';
    }
    finally {
      await loading.dismiss();
      this.loadCards();
    }
  }

  async loadAllCards() {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Cards...'
    });
    await loading.present();

    try {
      this.cards = await this.cardService.getSignAndSendCards();
    }
    finally {
      await loading.dismiss();
    }
  }

  async loadCards() {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Cards...'
    });
    await loading.present();

    try {
      this.cards = await this.cardService.getSignAndSendByEvent(this.event.name!);
    }
    finally {
      await loading.dismiss();
    }
  }
}
