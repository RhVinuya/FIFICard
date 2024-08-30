import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-new-suggestions',
  templateUrl: './new-suggestions.component.html',
  styleUrls: ['./new-suggestions.component.scss']
})
export class NewSuggestionsComponent implements OnInit {
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
  ) {
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.cartService = _cartService;
  }

  loading: boolean = false;
  iModel: IModelType;
  startIndex: number = 0;
  endIndex: number = 6;
  canClickPrevious: boolean = false;
  canClickNext: boolean = false;

  suggestions: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[] = [];
  list: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[] = [];

  ngOnInit() {
  }

  async inialize() {
    this.loading = true;
    if (this.type === 'card') {
      let iCard = this.iModel as INewCard;
      this.suggestions = await this.cardService.getByEvent(iCard.event, iCard.signAndSend ? iCard.signAndSend : false, iCard.messagetype);
      this.suggestions = this.suggestions.filter(x => x.id !== iCard.id).slice(0, 30)
      this.list = this.suggestions.slice(this.startIndex, this.endIndex);
      this.loadData();
    }
    else if (this.type === 'sticker') {
      let iSticker = this.iModel as INewSticker;
      let event = this.getAValidEvent(environment.stickerevents, iSticker.events);
      this.suggestions = await this.stickerService.getByEvent(event)
      this.suggestions = this.suggestions.filter(x => x.id !== iSticker.id).slice(0, 30)
      this.list = this.suggestions.slice(this.startIndex, this.endIndex);
      this.loadData();
    }
    else if (this.type === 'postcard') {
      let iPostcard = this.iModel as INewPostcard;
      let event = this.getAValidEvent(environment.postcardevents, iPostcard.events);
      this.suggestions = await this.postcardService.getByEvent(event)
      this.suggestions = this.suggestions.filter(x => x.id !== iPostcard.id).slice(0, 30)
      this.list = this.suggestions.slice(this.startIndex, this.endIndex);
      this.loadData();
    }
    else if (this.type === 'gift') {
      let iGift = this.iModel as INewGift;
      let event = this.getAValidEvent([...environment.giftscategories, ...environment.giftsrecipients], iGift.events);
      this.suggestions = await this.giftService.getByEvent(event);
      this.suggestions = this.suggestions.filter(x => x.id !== iGift.id).slice(0, 30)
      this.list = this.suggestions.slice(this.startIndex, this.endIndex);
      this.loadData();
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

  loadData() {
    if (this.startIndex < 6) this.canClickPrevious = false;
    else this.canClickPrevious = true;
    if (this.suggestions.length > this.endIndex) this.canClickNext = true;
    else this.canClickNext = false;
  }

  previous() {
    this.startIndex -= 6;
    this.endIndex -= 6;
    this.list = this.suggestions.slice(this.startIndex, this.endIndex)
    this.loadData()
  }

  next() {
    this.startIndex += 6;
    this.endIndex += 6;
    this.list = this.suggestions.slice(this.startIndex, this.endIndex)
    this.loadData()
  }

  getAsCard(list: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[]) {
    return list as INewCard[];
  }

  getAsSticker(list: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[]) {
    return list as INewSticker[];
  }

  getAsPostcard(list: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[]) {
    return list as INewPostcard[];
  }

  getAsGift(list: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[]) {
    return list as INewGift[];
  }
}

