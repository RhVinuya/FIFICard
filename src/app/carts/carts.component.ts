import { OrderService } from './../services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, AfterViewInit, DoCheck, OnChanges, SimpleChanges } from '@angular/core';

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
    this.userService.getUser(this.uid).then(user => {
      this.phOrder = [];
      this.usOrder = [];
      this.sgOrder = [];

      if (user.carts) {
        user.carts.forEach(async cart => {
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
        });
      }

      if (user.ecarts) {
        user.ecarts.forEach(async cart => {
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
        });
      }
    })
  }
}
