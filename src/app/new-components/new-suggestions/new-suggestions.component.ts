import { Component, Input, OnInit } from '@angular/core';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { INewGift, NewGift } from 'src/app/new-models/new-gift';
import { INewPostcard, NewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker, NewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-suggestions',
  templateUrl: './new-suggestions.component.html',
  styleUrls: ['./new-suggestions.component.scss']
})
export class NewSuggestionsComponent implements OnInit {

  @Input() model: NewCard | NewSticker | NewPostcard | NewGift;
  @Input() type: string;

  startIndex: number = 0;
  endIndex: number = 6;
  canClickPrevious: boolean = false;
  canClickNext: boolean = false;

  cardList: NewCard[]| undefined = undefined;
  stickerList: NewSticker[] | undefined = undefined;
  postcardList: NewPostcard[] | undefined = undefined;
  giftList: NewGift[] | undefined = undefined;

  cardSuggestions: NewCard[]| undefined = undefined;
  stickerSuggestions: NewSticker[] | undefined = undefined;
  postcardSuggestions: NewPostcard[] | undefined = undefined;
  giftSuggestions: NewGift[] | undefined = undefined;

  iModel: INewCard | INewSticker | INewPostcard | INewGift;

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

  ngOnInit(): void {
    console.log(this.model);

    if (this.model instanceof NewCard && this.type === 'card') {
      this.cardService.getByEvent(this.model.event).then(async (cards: NewCard[]) => {
        this.cardSuggestions = cards;
        this.cardList = cards.slice(this.startIndex, this.endIndex);
        this.loadData(this.cardSuggestions);
      })
    }
    else if (this.model instanceof NewSticker && this.type === 'sticker') {
      this.stickerService.getByEvent(this.model.events).then(async (stickers: NewSticker[]) => {
        this.stickerSuggestions = stickers;
        this.stickerList = stickers.slice(this.startIndex, this.endIndex);
        this.loadData(this.stickerSuggestions);
      })
    }
    else if (this.model instanceof NewPostcard && this.type === 'postcard') {
      this.postcardService.getByEvent(this.model.events).then(async ( postcards: NewPostcard[] ) => {
        this.postcardSuggestions = postcards;
        this.postcardList = postcards.slice(this.startIndex, this.endIndex);
        this.loadData(this.postcardSuggestions);
      })
    }
    else if (this.model instanceof NewGift && this.type === 'gift') {
      this.giftService.getByEvent(this.model.events).then(async gifts => {
        this.giftSuggestions = gifts;
        this.giftList = gifts.slice(this.startIndex, this.endIndex);
        this.loadData(this.giftSuggestions);
      })
    }
  }

  loadData(data: NewCard[] | NewSticker[] | NewPostcard[] | NewGift[]) {
    if(this.startIndex < 6) {
      this.canClickPrevious = false;
    }else{
      this.canClickPrevious = true;
    }
    if(data.length > this.endIndex) {
      this.canClickNext = true;
    }else{
      this.canClickNext = false;
    }
  }

  previous() {
    this.startIndex -= 6;
    this.endIndex -= 6;
    this.getList();
  }

  next() {
    this.startIndex += 6;
    this.endIndex += 6;
    this.getList();
  }

  getList() {
    switch(this.type) {
      case 'card': 
          this.cardList = this.cardSuggestions!.slice(this.startIndex, this.endIndex);
          this.loadData(this.cardSuggestions!);
        break;
      case 'sticker': 
          this.stickerList = this.stickerSuggestions!.slice(this.startIndex, this.endIndex);
          this.loadData(this.stickerSuggestions!);
        break;
      case 'postcard': 
          this.postcardList = this.postcardSuggestions!.slice(this.startIndex, this.endIndex);
          this.loadData(this.postcardSuggestions!);
        break;
      case 'gift': 
          this.giftList = this.giftSuggestions!.slice(this.startIndex, this.endIndex);
          this.loadData(this.giftSuggestions!);
        break;
    }

  }

}

