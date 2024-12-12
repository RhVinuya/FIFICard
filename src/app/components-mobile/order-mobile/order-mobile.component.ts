import { Component, Input, OnInit } from '@angular/core';
import { NewAddress } from 'src/app/new-models/new-address';
import { INewPayment, INewPaymongoDetails, INewSpecialCodeDetails, INewStripeDetails, NewPayment, NewSender } from 'src/app/new-models/new-payment';

@Component({
  selector: 'app-order-mobile',
  templateUrl: './order-mobile.component.html',
  styleUrls: ['./order-mobile.component.scss']
})
export class OrderMobileComponent implements OnInit {
  @Input() iPayment: INewPayment

  constructor() { }

  ngOnInit(): void {
  }

  getSender(iPayment: INewPayment): NewSender {
    return new NewSender(iPayment.sender);
  }

  getReceiver(iPayment: INewPayment): NewAddress {
    return new NewAddress(iPayment.receiver)
  }

  getPayment(iPayment: INewPayment): NewPayment {
    let payment = new NewPayment()
    payment.load(iPayment)
    return payment;
  }

  getINewSpecialCodeDetails(iPayment: INewPayment): INewSpecialCodeDetails{
    return iPayment.details as INewSpecialCodeDetails;
  }

  getINewStripeDetails(iPayment: INewPayment): INewStripeDetails{
    return iPayment.details as INewStripeDetails;
  }

  getINewPaymongoDetails(iPayment: INewPayment): INewPaymongoDetails{
    return iPayment.details as INewPaymongoDetails;
  }
}
