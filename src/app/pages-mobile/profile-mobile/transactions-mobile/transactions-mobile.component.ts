import { Component, OnInit } from '@angular/core';
import { INewPayment, NewPayment } from 'src/app/new-models/new-payment';
import { INewUser } from 'src/app/new-models/new-user';
import { NewPaymentService } from 'src/app/new-services/new-payment.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-transactions-mobile',
  templateUrl: './transactions-mobile.component.html',
  styleUrls: ['./transactions-mobile.component.scss']
})
export class TransactionsMobileComponent implements OnInit {

  paymentService: NewPaymentService;
  storageService: NewStorageService;
  iUser: INewUser | undefined;
  transactions: INewPayment[] = [];

  constructor(
    private location: Location,
    _paymentService: NewPaymentService,
    _storageService: NewStorageService

  ) {
    this.paymentService = _paymentService;
    this.storageService = _storageService;
   }

  ngOnInit(): void {
  }

  async ionViewDidEnter () {

    this.iUser = this.storageService.getUser();

    this.transactions = await this.paymentService.getAll(this.iUser!.id);
    console.log(this.transactions);
  }

  getPayment(iPayment: INewPayment): NewPayment {
    let payment = new NewPayment()
    payment.load(iPayment)
    return payment;
  }

  goBack() {
      this.location.back();
  }
}
