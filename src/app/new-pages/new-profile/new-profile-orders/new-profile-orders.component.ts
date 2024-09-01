import { Component, Input, OnInit } from '@angular/core';
import { NewAddress } from 'src/app/new-models/new-address';
import { INewPayment, INewPaymongoDetails, INewSpecialCodeDetails, INewStripeDetails, NewPayment, NewSender } from 'src/app/new-models/new-payment';
import { NewPaymentService } from 'src/app/new-services/new-payment.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-profile-orders',
  templateUrl: './new-profile-orders.component.html',
  styleUrls: ['./new-profile-orders.component.scss']
})
export class NewProfileOrdersComponent implements OnInit {
  @Input() id: string;

  storageService: NewStorageService;
  paymentService: NewPaymentService;

  constructor(
    _storageService: NewStorageService,
    _paymentService: NewPaymentService
  ) { 
    this.storageService = _storageService;
    this.paymentService = _paymentService
  }

  loading: boolean = false;
  iPayments: INewPayment[] = [];
  selected: string = '';

  async ngOnInit(): Promise<void> {
    this.loading = true;
    let iUser = this.storageService.getUser();
    if (iUser) {
      this.iPayments = await this.paymentService.getAll(iUser.id);
      if (this.iPayments.length > 0) this.selected = this.iPayments[0].id;
    }
    this.loading = false
  }

  open(id: string) {
    this.selected = id;
  }

}
