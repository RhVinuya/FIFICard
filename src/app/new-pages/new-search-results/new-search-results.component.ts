import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { INewCard } from 'src/app/new-models/new-card';
import { INewGift } from 'src/app/new-models/new-gift';
import { INewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker } from 'src/app/new-models/new-sticker';
import { LocationType, Type } from 'src/app/new-models/type';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';

@Component({
  selector: 'app-new-search-results',
  templateUrl: './new-search-results.component.html',
  styleUrls: ['./new-search-results.component.scss']
})

export class NewSearchResultsComponent implements OnInit, OnDestroy {

  activateRoute: ActivatedRoute;
  locationService: NewLocationService;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;

  constructor(
    _activateRoute: ActivatedRoute,
    _locationService: NewLocationService,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService
  ) {
    this.activateRoute = _activateRoute;
    this.locationService = _locationService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
  }

  title: string = ' results for ';
  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Search",
      url: "",
      active: true
    }
  ];
  paramsSubscription: Subscription;
  type: Type = 'card';
  location: LocationType;
  search: string = '';
  cards: INewCard[] = [];
  stickers: INewSticker[] = [];
  postcards: INewPostcard[] = [];
  gifts: INewGift[] = [];
  loading: boolean = true;
  displayCount: number = 12;
  cardsloaded: boolean = false;
  stickerloaded: boolean = false;
  postcardloaded: boolean = false;
  giftloaded: boolean = false;

  ngOnInit(): void {
    this.location = this.locationService.getlocation();
    this.paramsSubscription = this.activateRoute.params.subscribe(params => {
      this.search = params['search'] ? params['search'] : '';
      this.initialize();
      this.process();
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  initialize() {
    this.type = 'card';
    this.cards = [];
    this.stickers = [];
    this.postcards = [];
    this.gifts = [];
    this.cardsloaded = false;
    this.stickerloaded = false;
    this.postcardloaded = false;
    this.giftloaded = false;
    this.loading = true;
    this.displayCount = 12;
  }

  cardSearch(search: string, items: INewCard[]): INewCard[] {
    let searches = search.split(' ');
    let results: INewCard[] = [];
    [...items].forEach(card => {
      if (card.code === search) {
        results = [...results, card];
        return;
      }
      if (card.name.toLowerCase().includes(search.toLowerCase())) {
        results = [...results, card];
        return;
      }
      if (searches.some(search => card.name.toLowerCase().includes(search.toLowerCase()))) {
        results = [...results, card];
        return;
      }
      if (card.event.toLowerCase().includes(search.toLowerCase())) {
        results = [...results, card];
        return;
      }
      if (searches.some(search => card.event.toLowerCase().includes(search.toLowerCase()))) {
        results = [...results, card];
        return;
      }
      if (card.events.some(event => event.toLowerCase().includes(search.toLowerCase()))) {
        results = [...results, card];
        return;
      }
      if (searches.some(search => card.events.some(event => event.toLowerCase().includes(search.toLowerCase())))) {
        results = [...results, card];
        return;
      }
      if (card.recipients) {
        if (card.recipients.some(recipient => recipient.toLowerCase().includes(search.toLowerCase()))) {
          results = [...results, card];
          return;
        }
        if (searches.some(search => card.recipients!.some(recipient => recipient.toLowerCase().includes(search.toLowerCase())))) {
          results = [...results, card];
          return;
        }
      }
    })
    return results;
  }

  stickerSearch(search: string, items: INewSticker[]): INewSticker[] {
    let searches = search.split(' ');
    let results: INewSticker[] = [];
    [...items].forEach(sticker => {
      if (sticker.code === search) {
        results = [...results, sticker];
        return;
      }
      if (sticker.name.toLowerCase().includes(search.toLowerCase())) {
        results = [...results, sticker];
        return;
      }
      if (searches.some(search => sticker.name.toLowerCase().includes(search.toLowerCase()))) {
        results = [...results, sticker];
        return;
      }
      if (sticker.events.some(event => event.toLowerCase().includes(search.toLowerCase()))) {
        results = [...results, sticker];
        return;
      }
      if (searches.some(search => sticker.events.some(event => event.toLowerCase().includes(search.toLowerCase())))) {
        results = [...results, sticker];
        return;
      }
    })
    return results;
  }

  postcardSearch(search: string, items: INewPostcard[]): INewPostcard[] {
    let searches = search.split(' ');
    let results: INewPostcard[] = [];
    [...items].forEach(postcard => {
      if (postcard.code === search) {
        results = [...results, postcard];
        return;
      }
      if (postcard.name.toLowerCase().includes(search.toLowerCase())) {
        results = [...results, postcard];
        return;
      }
      if (searches.some(search => postcard.name.toLowerCase().includes(search.toLowerCase()))) {
        results = [...results, postcard];
        return;
      }
      if (postcard.events.some(event => event.toLowerCase().includes(this.search.toLowerCase()))) {
        results = [...results, postcard];
        return;
      }
      if (searches.some(search => postcard.events.some(event => event.toLowerCase().includes(search.toLowerCase())))) {
        results = [...results, postcard];
        return;
      }
    })
    return results;
  }

  giftSearch(search: string, items: INewGift[]): INewGift[] {
    if (search === '') return [...items];
    else {
      let searches = search.split(' ');
      let results: INewGift[] = [];
      [...items].forEach(gift => {
        if (gift.code === search) {
          results = [...results, gift];
          return;
        }
        if (gift.name.toLowerCase().includes(search.toLowerCase())) {
          results = [...results, gift];
          return;
        }
        if (searches.some(search => gift.name.toLowerCase().includes(search.toLowerCase()))) {
          results = [...results, gift];
          return;
        }
        if (gift.events.some(event => event.toLowerCase().includes(this.search.toLowerCase()))) {
          results = [...results, gift];
          return;
        }
        if (searches.some(search => gift.events.some(event => event.toLowerCase().includes(search.toLowerCase())))) {
          results = [...results, gift];
          return;
        }
        if (gift.recipients) {
          if (gift.recipients.some(recipient => recipient.toLowerCase().includes(search.toLowerCase()))) {
            results = [...results, gift];
            return;
          }
          if (searches.some(search => gift.recipients!.some(recipient => recipient.toLowerCase().includes(search.toLowerCase())))) {
            results = [...results, gift];
            return;
          }
        }
      })
      return results;
    }
  }

  process() {
    this.cardService.getAll().then(items => {
      this.cards = this.cardSearch(this.search, items);
      this.cardsloaded = true;
      this.check();
    });
    this.stickerService.getAll().then(items => {
      this.stickers = this.stickerSearch(this.search, items)
      this.stickerloaded = true;
      this.check();
    });
    this.postcardService.getAll().then(items => {
      this.postcards = this.postcardSearch(this.search, items)
      this.postcardloaded = true;
      this.check();
    });
    this.giftService.getAll().then(items => {
      this.gifts = this.giftSearch(this.search, items.filter(x => x.locations.includes(this.location)))
      this.giftloaded = true;
      this.check();
    });
  }

  check() {
    if (this.cards.length > 0 || this.stickers.length > 0 || this.postcards.length > 0 || this.gifts.length > 0) {
      this.loading = false;
      if (this.cards.length > 0) this.type = 'card';
      if (this.cards.length === 0 && this.stickers.length > 0) this.type = 'sticker';
      if (this.cards.length === 0 && this.stickers.length === 0 && this.postcards.length > 0) this.type = 'postcard';
      if (this.cards.length === 0 && this.stickers.length === 0 && this.postcards.length === 0 && this.gifts.length > 0) this.type = 'gift';
    }
    if (this.cardsloaded && this.stickerloaded && this.postcardloaded && this.giftloaded && this.cards.length === 0 && this.stickers.length === 0 && this.postcards.length === 0 && this.gifts.length === 0) {
      this.loading = false;
      this.type = 'card';
    }
  }

  onChangeType(value: Type) {
    this.displayCount = 12;
    this.type = value;
  }

  loadmore() {
    this.displayCount = this.displayCount + 12;
  }
}
