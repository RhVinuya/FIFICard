import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { error } from 'console';
import { OrderECard } from 'src/app/models/order-ecard';
import { Payment, StripeDetails } from 'src/app/models/payment';
import { IPaymentKeys, NewConfigService } from 'src/app/new-services/new-config.service';
import { CardService } from 'src/app/services/card.service';
import { EmailService } from 'src/app/services/email.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-confirm',
  templateUrl: './cart-confirm.component.html',
  styleUrls: ['./cart-confirm.component.scss']
})
export class CartConfirmComponent implements OnInit {

  loadingController: LoadingController;
  activateRoute: ActivatedRoute;
  storageService: StorageService;
  paymentService: PaymentService;
  userService: UserService;
  cardService: CardService;
  orderService: OrderService;
  emailService: EmailService;
  configService: NewConfigService;

  constructor(
    _loadingController: LoadingController,
    _activateRoute: ActivatedRoute,
    _storageService: StorageService,
    _paymentService: PaymentService,
    _userService: UserService,
    _cardService: CardService,
    _orderService: OrderService,
    _emailService: EmailService,
    _configService: NewConfigService
  ) { 
    this.loadingController = _loadingController;
    this.activateRoute = _activateRoute;
    this.storageService = _storageService;
    this.paymentService = _paymentService;
    this.userService = _userService;
    this.cardService = _cardService;
    this.orderService = _orderService;
    this.emailService = _emailService;
    this.configService = _configService;
  }

  loading: HTMLIonLoadingElement;

  ngOnInit(): void {
    this.process();
  }

  async sendECardEmail(order: OrderECard) {
    let ecardEmailId = await this.emailService.sendECardEmail(order);
    await this.orderService.updateECardSent(order.id, ecardEmailId);

    let ecardConfirmEmailId = await this.emailService.SendECardConfirmEmail(order);
    await this.orderService.updateECardConfirm(order.id, ecardConfirmEmailId);
  }

  async process(){
    this.loading = await this.loadingController.create({
      message: 'Confirming Payment...'
    });
    
    this.activateRoute.params.subscribe(async params => {
      this.loading.present();
      let id: string = params['id'];

      const userDetails = JSON.parse(localStorage.getItem('user')!);
      let uid = userDetails!.uid;

      let selected: any[] = this.storageService.getItems();
      let status = await this.paymentService.getInitial();


      let keys: IPaymentKeys = await this.configService.getStripeKeys();

      const stripe = require('stripe')(keys.secretKey);
      const session = await stripe.checkout.sessions.retrieve(id);
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
      const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);

      let stripeDetails: StripeDetails = new StripeDetails();
      stripeDetails.id = paymentIntent.id,
      stripeDetails.type = paymentMethod.type,
      stripeDetails.brand = paymentMethod.card ? paymentMethod.card.brand : '',
      stripeDetails.amount = Number(paymentIntent.amount) / 100,
      stripeDetails.last4 = paymentMethod.card ? paymentMethod.card.last4 : '';

      let items: string[] = selected.map(x => x.id!);
      
      let payment: Payment = new Payment();
      payment.user_id = uid;
      payment.orders = items;
      payment.gateway = 'Stripe';
      payment.stripe = stripeDetails;
      payment.total = stripeDetails.amount;
      payment.status = status;

      let paymentId = await this.paymentService.createPayment(payment);
      await this.userService.addPayment(uid, paymentId);

      for await (const item of selected){
        try {
          let card = await this.cardService.getACard(item.card_id!);
          
          if (card.type !== 'ecard') await this.orderService.updatePaidOrder(item.id!, paymentId);
          else await this.orderService.updatePaidECardOrder(item.id!, paymentId);
          
          await this.userService.addOrder(uid, item.id!);

          let orders: string[] = [];
          if (card.orders) {
            orders = card.orders;
            orders.push(item.id!);
          } 
          else orders = [item.id!];
          await this.cardService.updateCardOrder(item.card_id!, orders);
          
          if (card.type === 'ecard') await this.userService.removeItemOnECart(uid, item.id!);
          else await this.userService.removeItemOnCart(uid, item.id!);

          if (card.type === 'ecard') this.sendECardEmail(item as OrderECard);
        }
        catch(error) {
          console.log(error)
        }
      }
      this.storageService.clearItems();
      this.loading.dismiss();
      window.location.href = '/cart';
    });
  }

}
