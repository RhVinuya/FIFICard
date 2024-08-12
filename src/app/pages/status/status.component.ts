import { CardService } from 'src/app/services/card.service';
import { OrderService } from '../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order';
import { Title } from '@angular/platform-browser';
import { Card } from '../../models/card';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  id?: string;
  order?: Order;
  card?: Card;
  activateRoute: ActivatedRoute;
  service: OrderService;
  cardService: CardService;
  
  constructor(
    private _activateRoute: ActivatedRoute,
    private _service: OrderService,
    private _cardService: CardService,
  ) { 
    this.activateRoute = _activateRoute;
    this.service = _service;
    this.cardService = _cardService;
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadOrder();
    });
  }

  loadOrder(){
    this.service.subscribeOrder(this.id!).subscribe(data => {
      this.order! = data;
      this.cardService.getCard(this.order!.card_id!).subscribe(val => {
        this.card! = val;
      })
    });
  }

}
