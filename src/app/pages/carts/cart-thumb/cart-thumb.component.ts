import { Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { Order } from 'src/app/models/order';
import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Card } from 'src/app/models/card';
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/services/order.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-cart-thumb',
  templateUrl: './cart-thumb.component.html',
  styleUrls: ['./cart-thumb.component.scss']
})
export class CartThumbComponent implements OnInit {
  @Input() order: any;
  @Input() set selected(_selected: boolean) {
    this.mark = _selected
  }
  @Output() updateOrder: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() updateCard: EventEmitter<[string, Card]> = new EventEmitter<[string, Card]>();
  @Output() changeInclude: EventEmitter<[string, boolean]> = new EventEmitter<[string, boolean]>();
  @Output() deleteItem: EventEmitter<string> = new EventEmitter<string>();

  orderService: OrderService;
  cardService: CardService;
  imageService: ImageService;
  router: Router;
  def: ChangeDetectorRef;

  constructor(
    _orderService: OrderService,
    _cardService: CardService,
    _imageService: ImageService,
    _router: Router,
    _def: ChangeDetectorRef
  ) {
    this.orderService = _orderService;
    this.cardService = _cardService;
    this.imageService = _imageService;
    this.router = _router;
    this.def = _def;
  }

  card: Card;
  url: string = '';
  mark: boolean;

  ngOnInit(): void {
    this.loadCard();
  }

  loadCard() {
    this.cardService.getACard(this.order.card_id!).then(card => {
      this.card = card;

      if (card.type != 'ecard')
        this.loadImage(card.id!);
      else
        this.loadECardImage(card.id!);
    })
  }

  loadImage(id: string) {
    this.cardService.getPrimaryImage(id).then(img => {
      this.imageService.getImageURL(img).then(url => {
        this.url = url;
      })
    }).catch(err => {
    })
  }

  loadECardImage(id: string) {
    this.cardService.getECardImages(id).then(images => {
      let image = images.find(x => x.title == 'preview')!;
      this.imageService.getImageURL(image.url).then(url => {
        this.url = url;
      })
    })
  }

  updateInclude() {
    this.selected = !this.mark;
    this.changeInclude.emit([this.order.id!, this.mark]);
  }

  delete() {
    this.deleteItem.emit(this.order.id!);
  }

  getSign(): string {
    if (this.order.location == 'us') {
      return '$';
    }
    else if (this.order.location == 'sg') {
      return 'S$';
    }
    else {
      return '₱';
    }
  }

  getShippingFee(): string {
    if (this.order.shipping_fee! > 0) {
      return this.getSign() + ' ' + this.order.shipping_fee!.toFixed(2)
    }
    else {
      return 'Free'
    }
  }

  open() {
    if (this.card.type != 'ecard')
      this.router.navigate(['order/', this.card.id!, this.order.id!]);
    //else
    //  this.router.navigate(['/ecardorder', id]);
  }

  getPrice(): string {
    let value: string;
    if (this.order.bundle) {
      value = this.order.count + ' for ' + this.getSign() + ' ' + this.order.card_price.toFixed(2);
    }
    else {
      if (this.order.card_price == 0) {
        value = 'Free x ' + (this.order.count ? this.order.count : 1);
      }
      else {
        value = this.getSign() + ' ' + this.order.card_price.toFixed(2) + ' x ' + (this.order.count ? this.order.count : 1);
      }
    }
    return value;
  }
}
