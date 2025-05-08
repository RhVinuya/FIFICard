import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { INewAddress, INewAddressConfig } from 'src/app/new-models/new-address';
import { INewGCashUploadDetails, INewPayment, INewSender, NewPayment, TotalPayment } from 'src/app/new-models/new-payment';
import { NewAddressService } from 'src/app/new-services/new-address.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';
import { NewCheckoutRecipientsComponent } from './new-checkout-recipients/new-checkout-recipients.component';
import { NgbModal, NgbModalRef, NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { NewCheckoutSenderComponent } from './new-checkout-sender/new-checkout-sender.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewPaymentService } from 'src/app/new-services/new-payment.service';
import { NewConfirmMessageComponent } from 'src/app/new-components/new-confirm-message/new-confirm-message.component';
import { INewUser } from 'src/app/new-models/new-user';
import { Router } from '@angular/router';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewFileService } from 'src/app/new-services/new-file.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { NewCheckoutGcashComponent } from './new-checkout-gcash/new-checkout-gcash.component';
import { IConfig } from 'src/app/new-models/new-config';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { INewCart, TotalCart } from 'src/app/new-models/new-cart';
import { NewGiftService } from 'src/app/new-services/new-gift.service';

@Component({
  selector: 'app-new-checkout',
  templateUrl: './new-checkout.component.html',
  styleUrls: ['./new-checkout.component.scss']
})
export class NewCheckoutComponent implements OnInit, OnDestroy {

  storageService: NewStorageService;
  locationService: NewLocationService;
  cartService: NewCartService;
  addressService: NewAddressService;
  paymentService: NewPaymentService;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  fileService: NewFileService;
  modalService: NgbModal;
  offCanvas: NgbOffcanvas;
  router: Router;
  ref: ChangeDetectorRef;
  configService: NewConfigService;
  config: IConfig;

  constructor(
    _storageService: NewStorageService,
    _locationService: NewLocationService,
    _cartService: NewCartService,
    _addressService: NewAddressService,
    _paymentService: NewPaymentService,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _fileService: NewFileService,
    _modalService: NgbModal,
    _offCanvas: NgbOffcanvas,
    _router: Router,
    _ref: ChangeDetectorRef,
    _configService: NewConfigService,
  ) {
    this.configService = _configService;
    this.storageService = _storageService;
    this.locationService = _locationService;
    this.cartService = _cartService;
    this.addressService = _addressService;
    this.paymentService = _paymentService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.fileService = _fileService;
    this.modalService = _modalService;
    this.offCanvas = _offCanvas;
    this.router = _router;
    this.ref = _ref;
  }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Cart",
      url: "/new/cart",
      active: false
    },
    {
      title: "Checkout",
      url: "",
      active: true
    }
  ];

  loading: boolean = false;
  totalPayment: TotalPayment;
  iUser: INewUser | undefined;
  addressConfig: INewAddressConfig[] = [];

  accepted: boolean = false;
  verifySubmitted: boolean = false;
  isProcessingSpecialCode: boolean = false;
  isProcessingStripe: boolean = false;
  isProcessingGCash: boolean = false;
  isProcessingPayMaya: boolean = false;
  iSProcessingGCashUpload: boolean = false;

  form = new FormGroup({
    code: new FormControl<string>('', [Validators.required, Validators.maxLength(5)]),
  });

  async ngOnInit(): Promise<void> {
    this.loading = true;

    this.config = await this.configService.get();
    let ids = this.storageService.getCheckoutList();
    let fees = await this.addressService.getShippingFees();
    this.addressConfig = await this.addressService.getConfig();
    let temp: INewCart[] = [];
    for await (let id of ids) {
      let iCart = await this.cartService.get(id);
      if (iCart) temp.push(iCart);
    }
    let totalCart: TotalCart = new TotalCart(this.cartService, this.cardService, this.stickerService, this.postcardService, this.giftService, temp, this.config, false);
    await totalCart.initializeCarts(temp)
    await totalCart.initializeDiscount();

    this.totalPayment = new TotalPayment(this.locationService, fees, totalCart.carts);
    this.totalPayment.setAddressConfig(this.addressConfig);
    this.totalPayment.calculate();
    this.iUser = this.storageService.getUser();

    if (this.iUser) {
      this.totalPayment.setSender({
        firstname: this.iUser.firstname,
        lastname: this.iUser.lastname,
        email: this.iUser.email
      })
      this.totalPayment.setDefaultAddress(this.iUser.address)
      let adds = await this.addressService.getAll(this.iUser.id);
      if (this.locationService.getlocation() === 'ph') this.totalPayment.setAddresses(adds.filter(x => x.country === 'Philippines'));
      if (this.locationService.getlocation() === 'sg') this.totalPayment.setAddresses(adds.filter(x => x.country === 'Singapore'));
      if (this.locationService.getlocation() === 'us') this.totalPayment.setAddresses(adds.filter(x => x.country === 'United States'));
      if (this.iUser.address && this.iUser.address !== '') {
        this.totalPayment.setAddress(this.iUser.address);
      }
    }

    this.loading = false;
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.storageService.clearCheckoutList();
  }

  openSender() {
    const reference: NgbModalRef = this.modalService.open(NewCheckoutSenderComponent, { animation: true, size: 'lg' })
    reference.componentInstance.sender = this.totalPayment.sender;
    const onChargeRef = reference.componentInstance.onChange.subscribe((value: INewSender) => {
      this.totalPayment.setSender(value);
      reference.close();
    })
    reference.result.then(_ => {
      onChargeRef.unsubscribe();
    });
  }

  openRecipient() {
    const reference: NgbOffcanvasRef = this.offCanvas.open(NewCheckoutRecipientsComponent, { position: 'end', panelClass: 'large-offcanvas' });
    reference.componentInstance.id = this.iUser!.id
    reference.componentInstance.iAddresses = this.totalPayment.addresses;
    reference.componentInstance.defaultAddressId = this.totalPayment.defaultAddressId;
    reference.componentInstance.selected = this.totalPayment.receiver ? this.totalPayment.receiver.id : '';

    const clickRef = reference.componentInstance.onChange.subscribe((value: string) => {
      if (value) this.totalPayment.setAddress(value);
      reference.close();
    })

    const addressDefault = reference.componentInstance.onChangeDefault.subscribe((value: string) => {
      let iUser = this.storageService.getUser();
      if (iUser) {
        this.totalPayment.setDefaultAddress(value);
        iUser.address = value;
        this.storageService.createUser(iUser);
      }
    })

    const addressChange = reference.componentInstance.onAddressChange.subscribe((value: INewAddress) => {
      let idx = this.totalPayment.addresses.findIndex(x => x.id === value.id)
      if (idx < 0) this.totalPayment.addresses = [...this.totalPayment.addresses, value]
      else this.totalPayment.addresses[idx] = value
    })

    reference.result.then(_ => {
      clickRef.unsubscribe();
      addressDefault.unsubscribe();
      addressChange.unsubscribe();
    })
  }

  onChangeAccepted(e: any) {
    this.accepted = e.target.checked;
  }

  isReady() {
    return this.accepted === true &&
      this.isProcessingSpecialCode === false &&
      this.isProcessingStripe === false &&
      this.isProcessingGCash === false &&
      this.isProcessingPayMaya === false &&
      this.iSProcessingGCashUpload == false &&
      this.totalPayment.sender &&
      this.totalPayment.sender.email !== '' &&
      this.totalPayment.sender.firstname !== '' &&
      this.totalPayment.sender.lastname !== '' &&
      this.totalPayment.receiver &&
      this.totalPayment.receiver.firstname !== '' &&
      this.totalPayment.receiver.lastname !== '' &&
      this.totalPayment.receiver.email !== '' &&
      this.totalPayment.receiver.address !== '' &&
      this.totalPayment.receiver.country !== '' &&
      this.totalPayment.receiver.postcode !== '' &&
      this.totalPayment.items.length > 0;
  }

  async onVerify() {
    this.verifySubmitted = true;
    if (this.form.invalid) return;
    this.isProcessingSpecialCode = true;
    this.ref.detectChanges();

    this.form.controls.code.setErrors(null);

    let codes = await this.paymentService.getSpecialCodes();
    if (codes.length === 0) {
      this.form.controls.code.setErrors({ 'not-found': true });
      this.isProcessingSpecialCode = false;
      this.ref.detectChanges();
    }

    let code = codes.find(x => x.code.toLowerCase() === this.form.controls.code.value!.toLowerCase());
    if (code === undefined) {
      this.form.controls.code.setErrors({ 'not-found': true });
      this.isProcessingSpecialCode = false;
      this.ref.detectChanges();
    }
    else if (code.active === false) {
      this.form.controls.code.setErrors({ 'not-active': true });
      this.isProcessingSpecialCode = false;
      this.ref.detectChanges();
    }
    else {
      const reference = this.modalService.open(NewConfirmMessageComponent, { animation: true });
      reference.componentInstance.title = 'Special Code';
      reference.componentInstance.message = "Special Code " + code.code + " is valid. Do you want to complete the transaction?";
      reference.componentInstance.yes = 'YES';
      reference.componentInstance.no = 'NO';
      let resultSubs = reference.componentInstance.result.subscribe(async (value: boolean) => {
        if (value) {
          let payment: NewPayment = new NewPayment();
          payment.userId = this.iUser ? this.iUser.id : '';
          payment.sender = this.totalPayment.sender as INewSender;
          payment.receiver = this.totalPayment.receiver as INewAddress;
          payment.subtotal = this.totalPayment.subtotal();
          payment.shippingFee = this.totalPayment.shippingFee();
          payment.total = this.totalPayment.total();
          payment.items = this.totalPayment.items;
          payment.location = this.locationService.getlocation();
          payment.gateway = 'specialcode';
          payment.details = {
            code: code ? code.code : ''
          };

          this.storageService.savePayment(payment as INewPayment);

          this.form.reset();
          this.form.markAsPristine();
          this.verifySubmitted = false;
          this.isProcessingSpecialCode = false;
          this.ref.detectChanges();

          this.router.navigate(['/new/payment/specialcode'])
        }
        this.isProcessingSpecialCode = false;
        reference.close();
        resultSubs.unsubscribe();
      })
    }
  }

  async onStripe() {
    this.isProcessingStripe = true;
    this.ref.detectChanges();

    let payment: NewPayment = new NewPayment();
    payment.userId = this.iUser ? this.iUser.id : '';
    payment.sender = this.totalPayment.sender as INewSender;
    payment.receiver = this.totalPayment.receiver as INewAddress;
    payment.subtotal = this.totalPayment.subtotal();
    payment.shippingFee = this.totalPayment.shippingFee();
    payment.total = this.totalPayment.total();
    payment.items = this.totalPayment.items;
    payment.location = this.locationService.getlocation();
    payment.gateway = 'card';
    payment.provider = 'stripe';
    this.storageService.savePayment(payment as INewPayment);

    if (this.iUser) {
      let url = await this.paymentService.stripeCheckout(payment as INewPayment, this.iUser)
      window.location.href = url;
    }
  }

  async onGCash() {
    this.isProcessingGCash = true;
    this.ref.detectChanges();

    let payment: NewPayment = new NewPayment();
    payment.userId = this.iUser ? this.iUser.id : '';
    payment.sender = this.totalPayment.sender as INewSender;
    payment.receiver = this.totalPayment.receiver as INewAddress;
    payment.subtotal = this.totalPayment.subtotal();
    payment.shippingFee = this.totalPayment.shippingFee();
    payment.total = this.totalPayment.total();
    payment.items = this.totalPayment.items;
    payment.location = this.locationService.getlocation();
    payment.gateway = 'gcash';
    payment.provider = 'paymongo';
    this.storageService.savePayment(payment as INewPayment);

    let data = await this.paymentService.payMongoCheckout('gcash', payment);
    this.storageService.savePaymongoID(data.id);
    window.location.href = data.url;
  }

  async onPaymaya() {
    this.isProcessingPayMaya = true;
    this.ref.detectChanges();

    let payment: NewPayment = new NewPayment();
    payment.userId = this.iUser ? this.iUser.id : '';
    payment.sender = this.totalPayment.sender as INewSender;
    payment.receiver = this.totalPayment.receiver as INewAddress;
    payment.subtotal = this.totalPayment.subtotal();
    payment.shippingFee = this.totalPayment.shippingFee();
    payment.total = this.totalPayment.total();
    payment.items = this.totalPayment.items;
    payment.location = this.locationService.getlocation();
    payment.gateway = 'paymaya';
    payment.provider = 'paymongo';
    this.storageService.savePayment(payment as INewPayment);

    let data = await this.paymentService.payMongoCheckout('paymaya', payment);
    this.storageService.savePaymongoID(data.id);
    window.location.href = data.url;
  }

  onGCashUpload() {
    const reference: NgbModalRef = this.modalService.open(NewCheckoutGcashComponent, { animation: true });
    const fileReceivedRef = reference.componentInstance.onFileReceived.subscribe(async (value: string) => {
      reference.close();
      if (value !== '') {
        this.iSProcessingGCashUpload = true;
        let payment: NewPayment = new NewPayment();
        payment.userId = this.iUser ? this.iUser.id : '';
        payment.sender = this.totalPayment.sender as INewSender;
        payment.receiver = this.totalPayment.receiver as INewAddress;
        payment.subtotal = this.totalPayment.subtotal();
        payment.shippingFee = this.totalPayment.shippingFee();
        payment.total = this.totalPayment.total();
        payment.items = this.totalPayment.items;
        payment.location = this.locationService.getlocation();
        payment.gateway = 'gcash';
        payment.details = {
          url: value ? value : ''
        } as INewGCashUploadDetails;

        this.storageService.savePayment(payment as INewPayment);
        this.iSProcessingGCashUpload = false;
        this.ref.detectChanges();

        this.router.navigate(['/new/payment/gcash-upload'])
      }

    })
    reference.result.then(_ => {
      fileReceivedRef.unsubscribe();
    });
  }
}
