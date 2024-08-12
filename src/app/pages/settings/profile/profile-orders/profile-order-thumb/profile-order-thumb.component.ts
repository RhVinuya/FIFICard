import { ImageService } from '../../../../../services/image.service';
import { OrderECard } from '../../../../../models/order-ecard';
import { CardService } from '../../../../../services/card.service';
import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-profile-order-thumb',
  templateUrl: './profile-order-thumb.component.html',
  styleUrls: ['./profile-order-thumb.component.scss']
})
export class ProfileOrderThumbComponent implements OnInit {
  @Input() id: string;

  orderService: OrderService;
  cardService: CardService;
  imageService: ImageService;

  order: Order | undefined = undefined;
  ecardOrder: OrderECard | undefined = undefined;
  card: Card | undefined = undefined;
  image: string = '';
  total: number;

  constructor(
    _orderService: OrderService,
    _cardService: CardService,
    _imageService: ImageService
  ) {
    this.orderService = _orderService;
    this.cardService = _cardService;
    this.imageService = _imageService;
  }

  ngOnInit(): void {
    this.getOrder(this.id);
  }

  async getOrder(id: string) {
    let order: Order = await this.orderService.getOrder(id);
    if (order) {
      this.order = order;
      if (!this.order.bundle) this.total = this.order.card_price! * this.order.count!;
      else this.total = this.order.card_price!;
      await this.getCard(this.order.card_id!);
    }

    let orderECard: OrderECard = await this.orderService.getECardOrder(id);
    if (orderECard) {
      this.ecardOrder = orderECard;
      this.total = this.ecardOrder.card_price! * 1;
      await this.getCard(this.ecardOrder.card_id!);
    }
  }

  async getCard(id: string) {
    let card: Card = await this.cardService.getACard(id);
    this.card = card;
    if (card.type !== 'ecard') this.loadimage(this.card.id!);
    else this.loadecard(this.card.id!);
  }

  loadimage(id: string) {
    this.cardService.getPrimaryImage(id).then(image => this.getImage(image));
  }

  loadecard(id: string) {
    this.cardService.getECardImages(id).then(images => {
      let preview = images.find(x => x.title === 'preview')!;
      this.getImage(preview.url);
    })
  }

  getImage(image: string) {
    this.imageService.getImageURL(image).then(value => this.image = value);
  }

  getSign(order: Order | OrderECard){
    if (order.location == 'us') return '$';
    else if (order.location == 'sg') return 'S$';
    else return '₱';
  }

}
