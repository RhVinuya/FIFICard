import { PaymentService } from './../../../services/payment.service';
import { CardService } from 'src/app/services/card.service';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Card } from 'src/app/models/card';
import { Payment } from 'src/app/models/payment';

export class UserOrder {
  public id: string;
  public order: Order;
  public card: Card;
  public payment: Payment;
}

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.scss']
})
export class ProfileOrdersComponent implements OnInit {
  userService: UserService;
  orderService: OrderService;
  cardService: CardService;
  paymentService: PaymentService;

  constructor(
    _userService: UserService,
    _orderService: OrderService,
    _cardService: CardService,
    _paymentService: PaymentService
  ) {
    this.userService = _userService;
    this.orderService = _orderService;
    this.cardService = _cardService;
    this.paymentService = _paymentService;
  }

  uid: string;
  user: User;
  payments: Payment[] = [];
  orders: UserOrder[] = [];
  start: string = "";

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('user')!);
    this.uid = userDetails?.uid;
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.uid).then(async user => {
      this.user = user;
      let ids: string[] = user.payments.reverse();

      if (user.payments.length > 0) this.start = ids[0]

      for await (const id of ids) {
        let payment: Payment = await this.paymentService.getPayment(id);
        this.payments.push(payment)
      }
    })
  }

  loadOrders(orders: string[]) {
    orders.slice().reverse().forEach(id => {
      let userOrder = new UserOrder();
      userOrder.id = id;
      this.orders.push(userOrder);
    });

    this.orders.forEach(userOrder => {
      this.orderService.getOrder(userOrder.id).then(order => {
        this.updateOrder(order);

        this.cardService.getACard(order.card_id!).then(card => {
          this.updateCard(order.id!, card);
        });

        this.paymentService.getPayment(order.paymentId!).then(payment => {
          this.updatePayment(order.id!, payment);
        });
      });
    });
  }

  updateOrder(order: Order) {
    this.orders.forEach(userOrder => {
      if (userOrder.id == order.id) {
        userOrder.order = order;
      }
    });
  }

  updateCard(orderId: string, card: Card) {
    this.orders.forEach(userOrder => {
      if (userOrder.id == orderId) {
        userOrder.card = card;
      }
    });
  }

  updatePayment(orderId: string, payment: Payment) {
    this.orders.forEach(userOrder => {
      if (userOrder.id == orderId) {
        userOrder.payment = payment;
      }
    });
  }

  clickCollapse(id: string) {
    if (this.start === id) this.start = ""
    else this.start = id;
  }
}
