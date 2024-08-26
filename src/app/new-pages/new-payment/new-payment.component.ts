import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewPayment, NewPayment } from 'src/app/new-models/new-payment';
import { NewPaymentService } from 'src/app/new-services/new-payment.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss']
})
export class NewPaymentComponent implements OnInit {

  activateRoute: ActivatedRoute;
  storageService: NewStorageService;
  paymentService: NewPaymentService;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _storageService: NewStorageService,
    _paymentService: NewPaymentService,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.storageService = _storageService;
    this.paymentService = _paymentService;
    this.ref = _ref;
  }

  isProcessing: boolean | undefined = undefined;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async params => {
      if (params['gateway'] === 'specialcode') {
        let iPayment = this.storageService.getPayment();
        if (iPayment && iPayment.gateway === 'specialcode') {
          this.processSpecialCode(iPayment);
        }
      }
      else if (params['gateway'] === 'card') {
        let id = params['id'];
        let iPayment = this.storageService.getPayment();
        if (iPayment && iPayment.gateway === 'card') {
          this.processCard(iPayment, id)
        }
      }
    });
  }

  async processSpecialCode(iPayment: INewPayment) {
    this.isProcessing = true;
    this.ref.detectChanges();

    let payment: NewPayment = new NewPayment();
    payment.load(iPayment)
    await this.paymentService.add(payment);

    this.clear(iPayment);

    this.isProcessing = false;
    this.ref.detectChanges();
  }

  async processCard(iPayment: INewPayment, id: string) {
    this.isProcessing = true;
    this.ref.detectChanges();

    const stripe = require('stripe')(environment.stripe.secretKey);
    const session = await stripe.checkout.sessions.retrieve(id);
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);

    let payment: NewPayment = new NewPayment();
    payment.load(iPayment)
    payment.details = {
      id: paymentIntent.id,
      type: paymentMethod.type,
      brand: paymentMethod.card ? paymentMethod.card.brand : '',
      amount: Number(paymentIntent.amount) / 100,
      last4: paymentMethod.card ? paymentMethod.card.last4 : ''
    }
    await this.paymentService.add(payment);

    this.clear(iPayment);

    this.isProcessing = false;
    this.ref.detectChanges(); 
  }

  clear(iPayment: INewPayment) {
    let cartIds = this.storageService.getCartList();
    iPayment.items.forEach(item => {
      this.storageService.removeCart(item.id);
      cartIds = [...cartIds.filter(x => x !== item.id)]
    })
    this.storageService.saveCartList(cartIds);
    this.storageService.clearPayment();
  }

}
