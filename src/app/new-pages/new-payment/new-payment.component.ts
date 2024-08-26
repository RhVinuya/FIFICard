import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { INewPayment, NewPayment } from 'src/app/new-models/new-payment';
import { NewPaymentService } from 'src/app/new-services/new-payment.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss']
})
export class NewPaymentComponent implements OnInit {

  storageService: NewStorageService;
  paymentService: NewPaymentService;
  ref: ChangeDetectorRef;

  constructor(
    _storageService: NewStorageService,
    _paymentService: NewPaymentService,
    _ref: ChangeDetectorRef
  ) {
    this.storageService = _storageService;
    this.paymentService = _paymentService;
    this.ref = _ref;
  }

  isProcessing: boolean | undefined = undefined;

  ngOnInit(): void {
    let iPayment = this.storageService.getPayment();
    if (iPayment && iPayment.gateway === 'specialcode') {
      this.processSpecialCode(iPayment);
    }
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

  clear(iPayment: INewPayment){
    let cartIds = this.storageService.getCartList();
    iPayment.items.forEach(item => {
      this.storageService.removeCart(item.id);
      cartIds = [...cartIds.filter(x => x !== item.id)]
    })
    this.storageService.saveCartList(cartIds);
    this.storageService.clearPayment();
  }

}
