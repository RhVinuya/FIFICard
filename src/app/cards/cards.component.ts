import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ImageService } from 'src/app/services/image.service';
import { FilterService } from './../services/filter.service';
import { Card } from './../models/card';
import { CardService } from './../services/card.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipientService } from '../services/recipient.service';
import { EventService } from '../services/event.service';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Event } from '../models/event';

export class EventSetting {
  public event: string;
  public mainCard: string;
  public bannerLink: string;

  constructor(_event: string, _mainCard: string, _bannerLink: string) {
    this.event = _event;
    this.mainCard = _mainCard;
    this.bannerLink = _bannerLink;
  }
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  id?: string;
  event?: string;
  search?: string;
  recipient?: string;

  caption: string = '';
  banner: string = '';
  title: Title;
  service: CardService;
  eventService: EventService;
  imageService: ImageService;
  filterService: FilterService;
  serviceRecipient: RecipientService;
  activateRoute: ActivatedRoute;
  def: ChangeDetectorRef;
  loadingController: LoadingController;

  cards: Card[] = [];
  eventDetails: Event | undefined = undefined;

  type: 'card' | 'gift' | 'sticker' | 'postcard' | 'ecard' | 'clipart' = 'card';
  priority: string = '';

  constructor(
    private _title: Title,
    private _service: CardService,
    private _eventService: EventService,
    private _imageService: ImageService,
    private _filterService: FilterService,
    private _serviceRecipient: RecipientService,
    private _activateRoute: ActivatedRoute,
    private _def: ChangeDetectorRef,
    private _loadingController: LoadingController,
    private location: Location
  ) {
    this.title = _title;
    this.service = _service;
    this.eventService = _eventService;
    this.imageService = _imageService;
    this.filterService = _filterService;
    this.serviceRecipient = _serviceRecipient;
    this.loadingController = _loadingController;
    this.activateRoute = _activateRoute;
    this.def = _def;
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.event = params['event'];
      this.search = params['search'];
      this.recipient = params['recipient'];

      this.load();
    });
  }

  async load() {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Events...'
    });
    await loading.present();

    try {
      if (this.id) {
        let event: Event = await this.eventService.getById(this.id);
        this.eventDetails = event;
        this.event = event.name!;
        this.title.setTitle(this.event);
        this.caption = this.event;
        this.def.detectChanges();

        if (environment.priority.find(x => x.event == this.id!))
          this.priority = environment.priority.find(x => x.event == this.id!)!.card;

        if (event.banner != undefined) {
          this.imageService.getImageURL(event.banner).then(img => {
            this.banner = img;
          });
        }

        if (event.isECard && event.isECard == true) {
          this.type = 'ecard';
        }
        else if (event.isPostcard && event.isPostcard == true) {
          this.type = 'postcard';
        }
        else if (event.isSticker && event.isSticker == true) {
          this.type = 'sticker';
        }
        else if (event.isGift && event.isGift == true) {
          this.type = 'gift';
        }

        this.getCards(this.type, this.event!);
      }
      else if (this.event) {
        this.title.setTitle(this.event);
        this.caption = this.event;

        let events: Event[] = await this.eventService.getByName(this.event!);
        if (events.length > 0) {
          if (events[0].banner != undefined) {
            this.banner = await this.imageService.getImageURL(events[0].banner);
          }

          if (events[0].isECard && events[0].isECard == true) {
            this.type = 'ecard';
          }
          else if (events[0].isPostcard && events[0].isPostcard == true) {
            this.type = 'postcard';
          }
          else if (events[0].isSticker && events[0].isSticker == true) {
            this.type = 'sticker';
          }
          else if (events[0].isGift && events[0].isGift == true) {
            this.type = 'gift';
          }
        }
      }
      else if ((this.search) && (this.search != '')) {
        this.title.setTitle('Fibei Greetings');
        this.getSearchCard(this.search);
      }
      else {
        this.title.setTitle('Fibei Greetings');
        this.getAllCards();
      }
    }
    finally {
      await loading.dismiss();
    }
  }

  replaceAll(value: string): string {
    let newValue = value.split(' ').join('');
    newValue = newValue.split("’").join('');
    newValue = newValue.split("'").join('');
    return newValue.toLocaleLowerCase();
  }

  async getAllCards() {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Cards...'
    });
    await loading.present();

    try {
      this.cards = await this.service.getCards();
    }
    finally {
      await loading.dismiss();
    }
  }

  async getCards(type: 'card' | 'gift' | 'sticker' | 'postcard' | 'ecard' | 'clipart', event: string) {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Cards...'
    });
    await loading.present();

    try {
      this.cards = await this.service.getCardsByTypeAndEvent(type, event);
    }
    finally {
      await loading.dismiss();
    }
  }

  async getCardsForEvent(event: string) {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Loading Cards...'
    });
    await loading.present();

    try {
      this.cards = await this.service.getCardsByEvent(event);
    }
    finally {
      await loading.dismiss();
    }
  }

  async getSearchCard(search: string) {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: 'Searching...'
    });
    await loading.present();

    try {
      this.cards = [];
      this.cards = await this.doSearch(search);
      if (this.cards.length > 0) this.caption! = "Search: " + this.search;
      else this.caption! = "Search: " + this.search + " - No Record Found";
    }
    finally {
      await loading.dismiss();
    }
  }

  doSearch(search: string): Promise<Card[]> {
    let value = search.toLowerCase()
      .replace(",", " ")
      .replace("!", " ")
      .replace(".", " ")
      .trim();

    return new Promise(async resolve => {
      let data = await this.service.getCardsByEvent(search)
      if (data.length > 0){
        resolve(data);
      }
      
      data = await this.service.getSearchCards('search_name', value);
      if (data.length > 0){
        resolve(data);
      }

      data = await this.service.getSearchCards('search_description', value);
      if (data.length > 0){
        resolve(data);
      }
    })
  }

  onBack() {
    this.location.back();
  }
}
