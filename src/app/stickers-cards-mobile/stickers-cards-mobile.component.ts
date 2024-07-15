import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { PriceService } from "../services/price.service";
import { EventService } from "../services/event.service";
import { CardService } from "../services/card.service";
import { Card } from "../models/card";
import { Event } from "../models/event";

@Component({
  selector: "app-stickers-cards-mobile",
  templateUrl: "./stickers-cards-mobile.component.html",
  styleUrls: ["./stickers-cards-mobile.component.scss"],
})
export class StickersCardsMobileComponent implements OnInit {
  loadingController: LoadingController;
  priceService: PriceService;
  eventService: EventService;
  cardService: CardService;
  event: any;

  constructor(
    _loadingController: LoadingController,
    _priceService: PriceService,
    _eventService: EventService,
    _cardService: CardService
  ) {
    this.loadingController = _loadingController;
    this.priceService = _priceService;
    this.eventService = _eventService;
    this.cardService = _cardService;
  }

  original: Card[] = [];
  cards: Card[] = [];
  allEvents: Event[] = [];
  occassions: Event[] = [];
  others: Event[] = [];

  title: string = "ALL";

  ngOnInit(): void {
    this.initalize();
  }

  async initalize() {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: "Loading...",
    });
    await loading.present();
    try {
      this.original = await this.cardService.getCardsByType("sticker");
      this.cards = this.original;
      this.allEvents = await this.eventService.getEventSticker();
      this.occassions = this.allEvents.filter((x) => x.tag === "Occasions");
      this.others = this.allEvents.filter((x) => x.tag === "Others");
    } finally {
      await loading.dismiss();
    }
  }

  async setEvent(id: string) {
    let loading: HTMLIonLoadingElement;
    loading = await this.loadingController.create({
      message: "Loading...",
    });
    await loading.present();
    try {
      if (id === "all") {
        this.cards = this.original;
        this.title = "ALL";
      } else {
        this.cards = [];
        let event: Event | undefined = this.allEvents.find((x) => x.id === id);
        if (event) {
          this.title =
            event.title && event.title !== ""
              ? event.title.toUpperCase()
              : event.name!.toUpperCase();
          this.original.forEach((card) => {
            if (card.events!.findIndex((x) => x === event!.name) >= 0)
              this.cards.push(card);
          });
        }
      }
    } finally {
      await loading.dismiss();
      const element = document.getElementById("items");
      if (element != null) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}
