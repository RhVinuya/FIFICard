import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { IModelType } from 'src/app/new-models/new-enum';
import { INewGift, NewGift } from 'src/app/new-models/new-gift';
import { INewPostcard, NewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';
import { environment } from 'src/environments/environment';

class Batch {
  public items: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[];

  constructor(_item: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[]) {
    this.items = _item;
  }
}

@Component({
  selector: 'app-new-suggestions',
  templateUrl: './new-suggestions.component.html',
  styleUrls: ['./new-suggestions.component.scss']
})
export class NewSuggestionsComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  @Input() set model(value: IModelType) {
    this.iModel = value;
    this.inialize();
  }
  @Input() type: 'card' | 'sticker' | 'postcard' | 'gift';

  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  cartService: NewCartService;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _cartService: NewCartService,
    config: NgbCarouselConfig
  ) {
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.cartService = _cartService;

    config.interval = 10000;
    config.wrap = true;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    config.animation = true;
  }

  loading: boolean = false;
  iModel: IModelType;
  startIndex: number = 0;
  endIndex: number = 6;
  canClickPrevious: boolean = false;
  canClickNext: boolean = false;

  limit: number = 6;
  batches: Batch[] = [];
  items: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[] = [];

  ngOnInit() {
  }

  async inialize() {
    this.loading = true;
    if (this.type === 'card') {
      let iCard = this.iModel as INewCard;
      let items = await this.cardService.getByEvent(iCard.event, iCard.signAndSend ? iCard.signAndSend : false, iCard.messagetype);
      let values = items.filter(x => x.id !== iCard.id).slice(0, 30)
      this.items = values.slice(0, 30);
      //this.loadData();
    }
    else if (this.type === 'sticker') {
      let iSticker = this.iModel as INewSticker;
      let event = this.getAValidEvent(environment.stickerevents, iSticker.events);
      let items = await this.stickerService.getByEvent(event)
      let values = items.filter(x => x.id !== iSticker.id).slice(0, 30)
      this.items = values.slice(0, 30);
      //this.loadData();
    }
    else if (this.type === 'postcard') {
      let iPostcard = this.iModel as INewPostcard;
      let event = this.getAValidEvent(environment.postcardevents, iPostcard.events);
      let items = await this.postcardService.getByEvent(event)
      let values = items.filter(x => x.id !== iPostcard.id).slice(0, 30)
      this.items = values.slice(0, 30);
      //this.loadData();
    }
    else if (this.type === 'gift') {
      let iGift = this.iModel as INewGift;
      let event = this.getAValidEvent([...environment.giftscategories, ...environment.giftsrecipients], iGift.events);
      let items  = await this.giftService.getByEvent(event);
      let values = items.filter(x => x.id !== iGift.id).slice(0, 30)
      this.items = values.slice(0, 30);
    }
    
    let slides = Math.floor(this.items.length / this.limit) + (this.items.length % this.limit !== 0 ? 1 : 0);

    let x: number;
    for (x = 1; x <= slides; x++) {
      let end: number = x * this.limit;
      let batch: Batch = new Batch(this.items.slice(end - this.limit, end));
      this.batches.push(batch);
    }

    this.loading = false;
  }

  getAValidEvent(events: string[], itemEvents: string[]): string {
    let result: string = '';
    itemEvents.forEach(itemEvent => {
      if (itemEvent) {
        if (events.findIndex(event => event === itemEvent) >= 0) {
          result = itemEvent;
        }
      }
    })
    return result;
  }

  /*
  loadData() {
    if (this.startIndex < 6) this.canClickPrevious = false;
    else this.canClickPrevious = true;
    if (this.suggestions.length > this.endIndex) this.canClickNext = true;
    else this.canClickNext = false;
  }
  */

  previous() {
    this.carousel.prev();
  }

  next() {
    this.carousel.next();
  }

  getAsCard(value: INewCard | INewSticker | INewPostcard | INewGift) {
    return value as INewCard;
  }

  getAsSticker(value: INewCard | INewSticker | INewPostcard | INewGift) {
    return value as INewSticker;
  }

  getAsPostcard(value: INewCard | INewSticker | INewPostcard | INewGift) {
    return value as INewPostcard;
  }

  getAsGift(value: INewCard | INewSticker | INewPostcard | INewGift) {
    return value as INewGift;
  }
}

