import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewCard } from 'src/app/new-models/new-card';
import { NewEvent } from 'src/app/new-models/new-event';
import { INewGift } from 'src/app/new-models/new-gift';
import { INewPostcard } from 'src/app/new-models/new-postcard';
import { INewSticker } from 'src/app/new-models/new-sticker';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewEventService } from 'src/app/new-services/new-event.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewRecipientService } from 'src/app/new-services/new-recipients.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-product-mobile',
  templateUrl: './product-mobile.component.html',
  styleUrls: ['./product-mobile.component.scss']
})
export class ProductMobileComponent implements OnInit {

  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  eventService: NewEventService;
  storageService: NewStorageService
  recipientService: NewRecipientService;

  constructor(
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _eventService: NewEventService,
    _storageService: NewStorageService,
    _recipientService: NewRecipientService,
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.eventService = _eventService;
    this.storageService = _storageService;
    this.recipientService = _recipientService;
  }

  activeevents: string[] = [];
  type: "cards" | "stickers" | "postcards" | "gifts";
  event: string;
  recipient: string
  filter: string;
  loading: boolean = false;
  products: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[] = [];
  display: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[] = [];
  displayCount: number = 20;
  recipients: string[] = [ "For All" ];
  filters: string[] = [];

  events: NewEvent[] | null = [];
  currentEvent: NewEvent;

  ngOnInit(): void {
    
    this.activateRoute.params.subscribe( async params => {
      this.type = params['type'];
      this.event = params['event'];

      this.events = this.storageService.getCategories(this.type);

      this.events?.forEach( (event) => {
        if(event.name == this.event){
          this.currentEvent = event;
        }
      })

      await this.loadCards();
    });

  }

  async loadCards () {

    switch(this.type) {
      case 'cards':  
          this.products = await this.cardService.getByEvent(this.event, false, 'regular');
        break;
      case 'stickers':  
          this.products = await this.stickerService.getByEvent(this.event);
        break;
      case 'postcards':  
          this.products = await this.postcardService.getByEvent(this.event);
        break;
      case 'gifts':  
          this.products = await this.giftService.getByEvent(this.event);
        break;
    }



    this.display = this.products;

    for(const card of this.products) {
      for(let recipient of card.recipients!) {
        if(!this.recipients.find( x => x == recipient)){
          this.recipients.push(recipient);
        }
      }

      console.log(card.name, " ----- ",  card.recipient);
    }
  }

  onRecipientSelect(recipient: string) {

    if(recipient == this.recipients[0]) {

      this.display = this.products;

    }else {

      this.display = this.products.filter( o => {
        return o.recipients!.includes(recipient);
      })
  
      console.log(this.display);
    }
  }

}