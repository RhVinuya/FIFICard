import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, AfterViewInit, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})

export class CartsComponent implements OnInit {
  userService: UserService;
  orderService: OrderService;

  isPayment: Boolean = false;

  constructor(
    _userService: UserService,
    _orderService: OrderService
  ) {
    this.userService = _userService;
    this.orderService = _orderService;
  }

  uid: string;
  phOrder: any[] = [];
  usOrder: any[] = [];
  sgOrder: any[] = [];
  loaded: boolean = false;

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('user')!);
    this.uid = userDetails?.uid;
  }

  ionViewDidEnter() {
    this.loadUserCard();
  }

  loadUserCard() {
    this.userService.getUser(this.uid).then(async user => {
      this.phOrder = [];
      this.usOrder = [];
      this.sgOrder = [];

      if (user.carts) {
        for await (let cart of user.carts) {
          let order = await this.orderService.getOrder(cart);
          if (order) {
            if (order.location == 'us') {
              this.usOrder.push(order);
            }
            else if (order.location == 'sg') {
              this.sgOrder.push(order);
            }
            else {
              this.phOrder.push(order);
            }
          }
        }
      }

      if (user.ecarts) {
        for await (let cart of user.ecarts) {
          let order = await this.orderService.getECardOrder(cart);
          if (order) {
            if (order.location == 'us') {
              this.usOrder.push(order);
            }
            else if (order.location == 'sg') {
              this.sgOrder.push(order);
            }
            else {
              this.phOrder.push(order);
            }
          }
        }
      }
    })
  }
}
