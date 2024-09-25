import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewPayment, NewPayment } from 'src/app/new-models/new-payment';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewPaymentService } from 'src/app/new-services/new-payment.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss']
})
export class NewPaymentComponent implements OnInit {

  activateRoute: ActivatedRoute;
  storageService: NewStorageService;
  paymentService: NewPaymentService;
  cartService: NewCartService;
  ref: ChangeDetectorRef;

  constructor(
    _activateRoute: ActivatedRoute,
    _storageService: NewStorageService,
    _paymentService: NewPaymentService,
    _cartService: NewCartService,
    _ref: ChangeDetectorRef
  ) {
    this.activateRoute = _activateRoute;
    this.storageService = _storageService;
    this.paymentService = _paymentService;
    this.cartService = _cartService;
    this.ref = _ref;
  }

  isProcessing: boolean | undefined = undefined;
  isRefreshing: boolean | undefined = undefined;
  iPayment: INewPayment | undefined = undefined;

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
      else if (params['gateway'] === 'paymongo') {
        let id = this.storageService.getPaymongoID();
        let iPayment = this.storageService.getPayment();
        if (iPayment && (iPayment.gateway === 'gcash' || iPayment.gateway === 'paymaya')) {
          this.processPayMongo(iPayment, id);
        }
      }
      else if (params['gateway'] === 'gcash-upload') {
        let iPayment = this.storageService.getPayment();
        if (iPayment && iPayment.gateway === 'gcash') {
          this.processGCashUpload(iPayment);
        }
      }
    });
  }

  async processSpecialCode(iPayment: INewPayment) {
    this.isProcessing = true;
    this.ref.detectChanges();

    let payment: NewPayment = new NewPayment();
    payment.load(iPayment)
    let paymentId = await this.paymentService.add(payment);

    this.clear(iPayment);

    this.isProcessing = false;

    this.loadPaymentDetails(paymentId);
    this.ref.detectChanges();
  }

  async processCard(iPayment: INewPayment, id: string) {
    this.isProcessing = true;
    this.ref.detectChanges();

    let payment: NewPayment = new NewPayment();
    payment.load(iPayment)
    payment.details = await this.paymentService.stripeConfirm(id);
    let paymentId = await this.paymentService.add(payment);

    this.clear(iPayment);

    this.isProcessing = false;

    this.loadPaymentDetails(paymentId);
    this.ref.detectChanges();
  }

  async processPayMongo(iPayment: INewPayment, id: string) {
    this.isProcessing = true;
    this.ref.detectChanges();

    let payment: NewPayment = new NewPayment();
    payment.load(iPayment)
    let details = await this.paymentService.payMongoConfirm(id);
    if (details) {
      payment.details = details;
      let paymentId = await this.paymentService.add(payment);

      this.clear(iPayment);

      this.isProcessing = false;

      this.loadPaymentDetails(paymentId);
    }

    this.storageService.clearPaymongoID();
    this.isProcessing = false;
    this.ref.detectChanges();
  }

  async processGCashUpload(iPayment: INewPayment) {
    this.isProcessing = true;
    this.ref.detectChanges();

    let payment: NewPayment = new NewPayment();
    payment.load(iPayment)
    let paymentId = await this.paymentService.add(payment);

    this.clear(iPayment);

    this.isProcessing = false;

    this.loadPaymentDetails(paymentId);

    this.ref.detectChanges();
  }

  async clear(iPayment: INewPayment) {
    for await (let item of iPayment.items) {
      await this.cartService.delete(item.id)
    }
    this.storageService.clearPayment();
  }

  async loadPaymentDetails(id: string) {
    this.isRefreshing = true;
    this.iPayment = await this.paymentService.get(id);
    this.ref.detectChanges();
    this.isRefreshing = false;
  }

}
