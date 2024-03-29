import { Card } from './../models/card';
import { ActivatedRoute } from '@angular/router';
import { PriceService } from './../services/price.service';
import { CardService } from './../services/card.service';
import { EventService } from './../services/event.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-poetry-cards',
  templateUrl: './poetry-cards.component.html',
  styleUrls: ['./poetry-cards.component.scss']
})
export class PoetryCardsComponent implements OnInit {
  activateRoute: ActivatedRoute;
  def: ChangeDetectorRef;
  service: EventService;
  cardService: CardService;
  priceService: PriceService;
  loadingController: LoadingController;

  constructor(
    _activateRoute: ActivatedRoute,
    _def: ChangeDetectorRef,
    _service: EventService,
    _cardService: CardService,
    _priceService: PriceService,
    _loadingController: LoadingController
  ) {
    this.activateRoute = _activateRoute;
    this.def = _def;
    this.service = _service;
    this.cardService = _cardService;
    this.priceService = _priceService;
    this.loadingController = _loadingController;
  }

  caption: string = '';
  cards: Card[] = [];

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      if (params['id']) {
        this.service.getById(params['id']).then(event => {
          this.caption = event.name!;
          this.def.detectChanges();
          this.loadCards(event.name!);
        })
      }
    })
  }

  async loadCards(event: string) {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Poetry Cards...'
    });
    await loading.present();

    try {
      this.cards = await this.cardService.getPoetryCardsByEvent(event);
    }
    finally {
      await loading.dismiss();
    }
  }

}
