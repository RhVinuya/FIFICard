import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import {Location} from '@angular/common';
import { IonContent } from '@ionic/angular';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { INewCart, NewCart } from 'src/app/new-models/new-cart';

@Component({
  selector: 'app-product-mobile',
  templateUrl: './product-mobile.component.html',
  styleUrls: ['./product-mobile.component.scss']
})
export class ProductMobileComponent implements OnInit {


  @ViewChild(IonContent, {static : false}) content: IonContent;

  activateRoute: ActivatedRoute;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  eventService: NewEventService;
  storageService: NewStorageService
  recipientService: NewRecipientService;
  cartService: NewCartService;

  constructor(
    private location: Location,
    public router: Router,
    _activateRoute: ActivatedRoute,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _eventService: NewEventService,
    _storageService: NewStorageService,
    _recipientService: NewRecipientService,
    _cartService: NewCartService,
    
  ) {
    this.activateRoute = _activateRoute;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.eventService = _eventService;
    this.storageService = _storageService;
    this.recipientService = _recipientService;
    this.cartService = _cartService;
  }

  activeevents: string[] = [];
  type: "cards" | "stickers" | "postcards" | "gifts" | undefined = undefined;
  event: string;
  recipient: string
  filter: string;
  loading: boolean = false;
  products: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[] = [];
  display: INewCard[] | INewSticker[] | INewPostcard[] | INewGift[] = [];
  displayCount: number = 20;
  recipients: string[] = [];
  filters: string[] = [];
  canScrollUp: boolean = false;
  canScrollDown: boolean = true;
  cart: INewCart[] = [];
  
  bundle: boolean = false;

  events: NewEvent[] | null = [];
  currentEvent: NewEvent;

  async ngOnInit(): Promise<void> {
    
    this.loading = true;
    this.activateRoute.params.subscribe( params => {
      
      this.type = params['type'];
      this.event = params['event'];

      this.activateRoute.queryParams.subscribe( queueParams => {
        this.bundle = typeof queueParams['bundle'] != undefined ? queueParams['bundle'] == "true" : false;
      })

      this.events = this.storageService.getCategories(this.type!);

      this.events?.forEach( (event) => {
        if(event.name == this.event){
          this.currentEvent = event;
          this.loadCards().then(() => {
            console.log('cards loaded');
            this.loading = false;
          });
        }
        
      })
    });

  }

  async loadCards () {

    console.log(this.bundle);

    switch(this.type) {
      case 'cards':  
          this.products = await this.cardService.getAllByEvent(this.event, this.bundle);
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


    console.log("Products count: ", this.products.length);
    this.display = this.products;

    for(const card of this.products) {
      for(let recipient of card.recipients!) {
        if(!this.recipients.find( x => x == recipient)){
          this.recipients.push(recipient);
        }
      }
      //console.log(card.name, " ----- ",  card.recipient);
    }

    console.log(this.display);
  }

  onRecipientSelect(e: any) {

    if(e.detail.value == this.recipients[0]) {

      this.display = this.products;

    }else {

      this.display = this.products.filter( o => {
        return o.recipients!.includes(e.detail.value);
      })
  
      console.log(this.display);
    }
  }

  goToCart() {
      this.router.navigate(['/new/cart']);
  }

  goToWishlist() {
      this.router.navigate(['/new/wishlist']);
  }

  goBack() {
      this.location.back();
  }

  logScrolling(event: any) {

    console.log(event.detail);
    if(event && event.detail.currentY >= 300) {
      this.canScrollUp = true;
      this.canScrollDown = false;
    } else {
      this.canScrollUp = false;
      this.canScrollDown = true;
    }

  }
  logScrollStart(event: any) {
    
  }
  logScrollEnd(event: any) {
    
  }

  scrollEvent() {
    if(this.canScrollUp) {
      this.content.scrollToTop(1500);
    }

    if(this.canScrollDown) {
      this.content.scrollToBottom(1500);
    }

  }
}
