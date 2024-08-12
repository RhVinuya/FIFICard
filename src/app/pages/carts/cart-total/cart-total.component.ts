import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { IPayPalConfig, ITransactionItem, ICreateOrderRequest } from 'ngx-paypal';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/user';
import { SpecialCode } from 'src/app/models/special-code';
import { SpecialCodeService } from 'src/app/services/special-code.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PriceService } from 'src/app/services/price.service';
import { EmailService } from 'src/app/services/email.service';
import { environment } from 'src/environments/environment';
import { OrderECard } from 'src/app/models/order-ecard';


@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss']
})
export class CartTotalComponent implements OnInit {
  @Input() uid: string;

  @Input() set orders(_orders: any[]) {
    this.allOrders = _orders;
  }

  @Input() location: 'ph' | 'us' | 'sg';

  priceService: PriceService;
  cardService: CardService;
  paymentService: PaymentService;
  userService: UserService;
  orderService: OrderService;
  emailService: EmailService;
  imageService: ImageService;
  storageService: StorageService;
  specialCodeService: SpecialCodeService;
  modalService: NgbModal;
  alertController: AlertController;

  constructor(
    _priceService: PriceService,
    _cardService: CardService,
    _paymentService: PaymentService,
    _userService: UserService,
    _orderService: OrderService,
    _emailService: EmailService,
    _imageService: ImageService,
    _storageService: StorageService,
    _specialCodeService: SpecialCodeService,
    _modalService: NgbModal,
    _alertController: AlertController
  ) {
    this.priceService = _priceService;
    this.cardService = _cardService;
    this.paymentService = _paymentService;
    this.userService = _userService;
    this.orderService = _orderService;
    this.emailService = _emailService;
    this.imageService = _imageService;
    this.storageService = _storageService;
    this.specialCodeService = _specialCodeService;
    this.modalService = _modalService;
    this.alertController = _alertController;
  }

  allOrders: any[] = [];
  selected: any[] = [];

  subtotal: number = 0;
  total: number = 0;
  shipping: number = 0;
  selectall: boolean = false;
  itemcount: number = 0;
  initalStatus: string = '';
  isPayment: boolean = false;
  gcashUploadedFile: string = '';
  payPalTransactionId: string = '';
  payPalPayerId: string = '';
  payPalPayerEmail: string = '';
  gcashRef: NgbModalRef;
  payPalConfig?: IPayPalConfig;
  stripeProcess: boolean = false;

  specialCodes: SpecialCode[] = [];
  codeSubmitted: true;
  codeError: string = '';
  processing: boolean = false;


  form = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.maxLength(5)]),
  });

  ngOnInit(): void {
    this.paymentService.getInitial().then(status => this.initalStatus = status);
    this.specialCodeService.get().then(codes => this.specialCodes = codes);
  }

  checkIfSelected(id: string): boolean {
    return this.selected.findIndex(x => x.id! === id) >= 0;
  }

  changeInclude(value: [string, boolean]) {
    let index = this.selected.findIndex(x => x.id! == value[0]);
    if (value[1]) {
      if (index < 0) {
        this.selected.push(this.allOrders.find(y => y.id! == value[0])!);
      }
    }
    else {
      if (index >= 0) {
        this.selected.splice(index, 1);
      }
    }

    this.calculateTotal();
    this.isPayment = false;
  }

  delete(ids: string[]): Promise<void> {
    return new Promise(async resolve => {
      let user: User = await this.userService.getUser(this.uid);
      let cart: string[] = user.carts;
      let ecart: string[] = user.ecarts;

      for await (const id of ids) {
        let order = this.allOrders.find(x => x.id! == id);
        let card: Card = await this.cardService.getACard(order.card_id);

        if (card.type != 'ecard') cart.splice(cart.findIndex(x => x === id), 1);
        else ecart.splice(ecart.findIndex(x => x === id), 1);

        this.selected.splice(this.selected.findIndex(x => x.id! == id), 1);

        this.allOrders.splice(this.allOrders.findIndex(x => x.id! == id), 1);
      }

      await this.userService.updateCart(this.uid, cart);
      await this.userService.updateECart(this.uid, ecart);
    });
  }

  calculateTotal() {
    this.subtotal = 0;
    this.shipping = 0;
    this.total = 0;
    this.selected.forEach(item => {
      this.subtotal = this.subtotal + Number(item.card_price);
      this.shipping = this.shipping + Number(item.shipping_fee ? item.shipping_fee : 0);
      this.total = this.total + Number(item.card_price) + Number(item.shipping_fee ? item.shipping_fee : 0);
    });
  }

  getCurrency() {
    if (this.location == 'us') {
      return 'USD'
    }
    else if (this.location == 'sg') {
      return 'SGD'
    }
    else {
      return environment.paypalCurrency
    }
  }

  sendECardEmail(order: OrderECard) {
    this.emailService.sendECardEmail(order).then(id => {
      this.orderService.updateECardSent(order.id, id);
    })
    this.emailService.SendECardConfirmEmail(order).then(id => {
      this.orderService.updateECardConfirm(order.id, id);
    })
  }

  async saveTransaction(gateway: 'NOGATEWAY' | 'GCash' | 'PayPal' | 'Special Code', specialcode: string = '') {
    this.processing = true;
    try {
      let items: string[] = this.selected.map(x => x.id!);

      let payment: Payment = new Payment();
      payment.user_id = this.uid;
      payment.orders = items;
      payment.gateway = gateway;

      if (gateway === "GCash") {
        payment.proof = this.gcashUploadedFile;
      }
      else if (gateway === "PayPal") {
        payment.transactionId = this.payPalTransactionId;
        payment.payerId = this.payPalPayerId;
        payment.payerEmail = this.payPalPayerEmail;
      }
      else if (gateway === "Special Code") {
        payment.specialcode = specialcode;
      }
      payment.total = this.total;
      payment.status = this.initalStatus;

      let paymentId = await this.paymentService.createPayment(payment);
      await this.userService.addPayment(this.uid, paymentId);
      for await (let order of this.selected) {
        let card = await this.cardService.getACard(order.card_id!);

        if (card.type != 'ecard') await this.orderService.updatePaidOrder(order.id!, paymentId);
        else await this.orderService.updatePaidECardOrder(order.id!, paymentId);

        await this.userService.addOrder(this.uid, order.id!);

        let orders: string[] = [];
        if (card.orders) {
          orders = card.orders;
          orders.push(order.id!);
        }
        else orders = [order.id!];
        await this.cardService.updateCardOrder(order.card_id!, orders);

        if (card.type == 'ecard') await this.userService.removeItemOnECart(this.uid, order.id!);
        else await this.userService.removeItemOnCart(this.uid, order.id!);

        if (card.type == 'ecard') await this.sendECardEmail(order as OrderECard);

        let index = this.selected.findIndex(x => x.id == order.id!)
        this.selected.splice(index, 1);

        index = this.allOrders.findIndex(x => x.id == order.id!)
        this.allOrders.splice(index, 1);

        this.calculateTotal();

        this.gcashRef.close('');
      }
    }
    finally {
      this.processing = true;
    }
  }

  setPayPal() {
    this.payPalConfig = undefined;
    if (this.total > 0) {
      let items: ITransactionItem[] = [];
      this.selected.forEach(async order => {
        let card: Card = await this.cardService.getACard(order.card_id!);

        let itemname = 'Fibei Greetings: ' + card.name! + ' for ' + order.receiver_name!
        if (order.parentOrder != '') {
          itemname = 'Fibei Greetings: ' + card.name!;
        }

        let paypalItem: ITransactionItem = {
          name: itemname,
          quantity: (order.count ? order.count : 1).toString(),
          category: 'DIGITAL_GOODS',
          unit_amount: {
            currency_code: this.getCurrency(),
            value: (order.card_price! + Number(order.shipping_fee!)).toString()
          }
        }
        items.push(paypalItem);
      });

      this.payPalConfig = {
        currency: this.getCurrency(),
        clientId: environment.paypalClientId,
        createOrderOnClient: (data) => <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: this.getCurrency(),
                value: this.total.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: environment.paypalCurrency,
                    value: this.total.toFixed(2)
                  }
                }
              },
              items: items
            }
          ]
        },
        advanced: {
          commit: 'true'
        },
        style: {
          label: 'paypal',
          layout: 'vertical'
        },
        onClientAuthorization: (data) => {
          this.payPalTransactionId = data.id;
          this.payPalPayerId = data.payer.payer_id ? data.payer.payer_id : '';
          this.payPalPayerEmail = data.payer.email_address ? data.payer.email_address : '';
          this.saveTransaction("PayPal");
        },
      }
    }
  }

  toPay() {
    if (this.total > 0) {
      this.setPayPal();
      this.isPayment = true;
    }
    else {
      this.saveTransaction('NOGATEWAY');
    }
  }

  uploadFile(event: any) {
    const file: File = event.target.files[0];
    this.paymentService.uploadFile(file).then(result => {
      this.gcashUploadedFile = result.metadata.fullPath;
    })
  }

  payNow(gcash_payment: any) {
    this.gcashRef = this.modalService.open(gcash_payment, { ariaLabelledBy: 'modal-basic-title' });
  }

  async payStripe() {
    this.stripeProcess = true;

    this.storageService.saveItems(this.selected);

    const stripe = require('stripe')(environment.stripe.secretKey);
    let lineitems: any[] = [];

    for await (const item of this.selected) {
      let card: Card = await this.cardService.getACard(item.card_id!);
      let image: string = await this.cardService.getPrimaryImage(item.card_id!);
      let url: string = await this.imageService.getImageURL(image);

      lineitems.push({
        price_data: {
          product_data: {
            name: card.name,
            description: card.description,
            images: [url]
          },
          currency: this.getCurrency(),
          unit_amount: Number(item.card_price).toFixed(2).replace(".", "")
        },
        quantity: (item.count ? item.count : 1).toString()
      })

      if (item.shipping_fee) {
        lineitems.push({
          price_data: {
            product_data: {
              name: "Shipping Fee",
              description: "Shipping Fee for " + card.name,
            },
            currency: this.getCurrency(),
            unit_amount: Number(item.shipping_fee).toFixed(2).replace(".", "")
          },
          quantity: "1"
        })
      }
    }

    let user = await this.userService.getUser(this.uid)
    const paymentcheckout = await stripe.checkout.sessions.create({
      line_items: lineitems,
      mode: 'payment',
      success_url: window.location.origin + '/confirm/{CHECKOUT_SESSION_ID}',
      cancel_url: window.location.origin + '/cart',
      client_reference_id: user.id,
      customer_email: user.email
    });
    let url = paymentcheckout.url;
    this.stripeProcess = false;
    window.location.href = url;
  }

  includeAll() {
    this.selectall = !this.selectall;
    this.selected = this.selectall ? this.allOrders : [];
    this.calculateTotal();
  }

  deleteAll() {
    let ids: string[] = this.selected.map(x => x.id);
    this.delete(ids);
  }

  async onVerify() {
    this.codeSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    this.codeError = "";
    let idx = this.specialCodes.findIndex(x => x.code === this.form.value.code!.toUpperCase())
    if (idx >= 0) {
      let code = this.specialCodes[idx];
      if (code.active) {
        const alert = await this.alertController.create({
          header: 'Special Code',
          message: "Special Code " + code.code + " is valid. Do you want to complete the transaction?",
          buttons: [
            {
              text: "YES",
              role: "Yes",
              handler: async () => {
                this.form.controls.code.setValue("");
                this.saveTransaction('Special Code', code.code);
              }
            },
            {
              text: "NO",
              role: "no"
            }
          ],
        });

        await alert.present();
      }
      else {
        this.codeError = "Special Code Inactive"
      }
    }
    else {
      this.codeError = "Invalid Special Code"
    }
  }

}
