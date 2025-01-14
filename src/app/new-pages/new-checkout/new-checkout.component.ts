import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { INewAddress, INewAddressConfig, INewShippingFee, NewAddress } from 'src/app/new-models/new-address';
import { INewGCashUploadDetails, INewPayment, INewPaymentItem, INewPaymentItemBundle, INewSender, NewPayment, NewSender } from 'src/app/new-models/new-payment';
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
import { LocationType } from 'src/app/new-models/new-enum';
import { NewCheckoutGcashComponent } from './new-checkout-gcash/new-checkout-gcash.component';
import { url } from 'inspector';
import { environment } from 'src/environments/environment';
import { INewCard, NewCard } from 'src/app/new-models/new-card';

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
  fileService: NewFileService;
  modalService: NgbModal;
  offCanvas: NgbOffcanvas;
  router: Router;
  ref: ChangeDetectorRef;

  constructor(
    _storageService: NewStorageService,
    _locationService: NewLocationService,
    _cartService: NewCartService,
    _addressService: NewAddressService,
    _paymentService: NewPaymentService,
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _fileService: NewFileService,
    _modalService: NgbModal,
    _offCanvas: NgbOffcanvas,
    _router: Router,
    _ref: ChangeDetectorRef
  ) {
    this.storageService = _storageService;
    this.locationService = _locationService;
    this.cartService = _cartService;
    this.addressService = _addressService;
    this.paymentService = _paymentService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
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
  location: LocationType;
  iUser: INewUser | undefined;
  addressConfig: INewAddressConfig[] = [];
  fees: INewShippingFee[] = [];
  sender: NewSender;
  receiver: NewAddress;
  defaultAddressId: string;
  addresses: INewAddress[] = [];
  ids: string[] = [];
  items: INewPaymentItem[] = [];
  subtotal: number = 0;
  shippingfee: number = 0;
  total: number = 0;
  accepted: boolean = false;
  verifySubmitted: boolean = false;
  isProcessingSpecialCode: boolean = false;
  isProcessingStripe: boolean = false;
  isProcessingGCash: boolean = false;
  isProcessingPayMaya: boolean = false;
  iSProcessingGCashUpload: boolean = false;
  payments: any | undefined = undefined;

  form = new FormGroup({
    code: new FormControl<string>('', [Validators.required, Validators.maxLength(5)]),
  });

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.location = this.locationService.getlocation();

    if (this.location == 'ph') this.payments = environment.payments.ph;
    else if (this.location == 'us') this.payments = environment.payments.us;
    else  this.payments = environment.payments.sg;

    this.ref.detectChanges();
    
    this.addressConfig = await this.addressService.getConfig();
    this.fees = await this.addressService.getShippingFees();
    this.iUser = this.storageService.getUser();
    if (this.iUser) {
      this.sender = new NewSender({
        firstname: this.iUser.firstname,
        lastname: this.iUser.lastname,
        email: this.iUser.email
      })
      this.ref.detectChanges();
      this.defaultAddressId = this.iUser.address;
      let adds = await this.addressService.getAll(this.iUser.id);
      adds.forEach(value => {
        if (this.location === 'ph' && value.country === 'Philippines') this.addresses.push(value);
        else if (this.location === 'sg' && value.country === 'Singapore') this.addresses.push(value);
        else if (this.location === 'us' && value.country === 'United States') this.addresses.push(value);
      })


      if (this.iUser.address && this.iUser.address !== '') this.loadAddress(this.iUser.address);
      this.ref.detectChanges();
    }

    this.ids = this.storageService.getCheckoutList();

    for await (let id of this.ids) {
      let iCart = await this.cartService.get(id);
      if (iCart) {
        let price: number = 0;

        if( iCart.type == 'card' ) {
    
          let iCard = await this.cardService.get(iCart.itemId);
          let model = new NewCard(iCard as INewCard);
          if(model.isDiscounted()) {
            price = model.getDiscountedPrice();
            if(iCart.personalize) {
              price = model.getPersonalizePrice(true);
            }

          } else {
            if (this.location === 'ph') price = iCart.bundle ? iCart.bundle.price : iCart.price;
            else if (this.location === 'sg') price = iCart.bundle ? iCart.bundle.sgprice : iCart.sgprice;
            else if (this.location === 'us') price = iCart.bundle ? iCart.bundle.usprice : iCart.usprice;
          }

        } else {
          if (this.location === 'ph') price = iCart.bundle ? iCart.bundle.price : iCart.price;
          else if (this.location === 'sg') price = iCart.bundle ? iCart.bundle.sgprice : iCart.sgprice;
          else if (this.location === 'us') price = iCart.bundle ? iCart.bundle.usprice : iCart.usprice;
        }


        let bundle: INewPaymentItemBundle | undefined = undefined;
        if (iCart.bundle) {
          bundle = {
            count: iCart.bundle.count,
            price: price
          }
        }
        this.items.push({
          id: iCart.id,
          itemId: iCart.itemId,
          type: iCart.type,
          bundle: bundle,
          personalize: iCart.personalize ? iCart.personalize : undefined,
          price: price,
          shipping: 0,
          total: price
        })
      }
    }
    this.calculateShipping();
    this.loading = false;
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.storageService.clearCheckoutList();
  }

  loadAddress(id: string) {
    let iAddress = this.addresses.find(x => x.id === id);
    if (iAddress) this.receiver = new NewAddress(iAddress);
    this.calculateShipping();
  }

  openSender() {
    const reference: NgbModalRef = this.modalService.open(NewCheckoutSenderComponent, { animation: true, size: 'lg' })
    reference.componentInstance.sender = this.sender;
    const onChargeRef = reference.componentInstance.onChange.subscribe((value: INewSender) => {
      this.sender = new NewSender(value);
      reference.close();
    })
    reference.result.then(_ => {
      onChargeRef.unsubscribe();
    });
  }

  openRecipient() {
    const reference: NgbOffcanvasRef = this.offCanvas.open(NewCheckoutRecipientsComponent, { position: 'end', panelClass: 'large-offcanvas' });
    reference.componentInstance.id = this.iUser!.id
    reference.componentInstance.iAddresses = this.addresses;
    reference.componentInstance.defaultAddressId = this.defaultAddressId;
    reference.componentInstance.selected = this.receiver ? this.receiver.id : '';

    const clickRef = reference.componentInstance.onChange.subscribe((value: string) => {
      if (value) this.loadAddress(value)
      reference.close();
    })

    const addressDefault = reference.componentInstance.onChangeDefault.subscribe((value: string) => {
      let iUser = this.storageService.getUser();
      if (iUser) {
        this.defaultAddressId = value;
        iUser.address = value;
        this.storageService.createUser(iUser);
      }
    })

    const addressChange = reference.componentInstance.onAddressChange.subscribe((value: INewAddress) => {
      let idx = this.addresses.findIndex(x => x.id === value.id)
      if (idx < 0) this.addresses = [...this.addresses, value]
      else this.addresses[idx] = value
    })

    reference.result.then(_ => {
      clickRef.unsubscribe();
      addressDefault.unsubscribe();
      addressChange.unsubscribe();
    })
  }

  calculateShipping() {
    if (this.location === 'ph') {
      if (this.receiver && this.receiver.province !== '') {
        let group = this.addressConfig.find(x => x.name === this.receiver.province)!.group;
        this.items.forEach(item => {
          if (item.type === 'card' || item.type === 'postcard') {
            let fee = this.fees.find(x => x.name === 'Card');
            if (fee) {
              if (group === 'NCR') item.shipping = fee.metromanila;
              else if (group === 'Luzon') item.shipping = fee.luzon;
              else if (group === 'Visayas') item.shipping = fee.visayas;
              else if (group === 'Mindanao') item.shipping = fee.mindanao;
            }
          }
          if (item.type === 'sticker') {
            let fee = this.fees.find(x => x.name === 'Sticker');
            if (fee) {
              if (group === 'NCR') item.shipping = fee.metromanila;
              else if (group === 'Luzon') item.shipping = fee.luzon;
              else if (group === 'Visayas') item.shipping = fee.visayas;
              else if (group === 'Mindanao') item.shipping = fee.mindanao;
            }
          }
          if (item.type === 'gift') {
            let fee = this.fees.find(x => x.name === 'Gift');
            if (fee) {
              if (group === 'NCR') item.shipping = fee.metromanila;
              else if (group === 'Luzon') item.shipping = fee.luzon;
              else if (group === 'Visayas') item.shipping = fee.visayas;
              else if (group === 'Mindanao') item.shipping = fee.mindanao;
            }
          }
          item.total = item.price + item.shipping;
        })
      }
      this.subtotal = 0;
      this.shippingfee = 0;
      this.total = 0;
      this.items.map(x => this.subtotal = this.subtotal + x.price)
      this.items.map(x => this.shippingfee = this.shippingfee + x.shipping)
      this.items.map(x => this.total = this.total + x.total)
      this.ref.detectChanges();
    }
    else {
      this.items.forEach(item => {
        if (item.type === 'card' || item.type === 'postcard') {
          let fee = this.fees.find(x => x.name === 'Card');
          if (fee) item.shipping = this.location === 'us' ? fee.us : fee.singapore;
        }
        if (item.type === 'sticker') {
          let fee = this.fees.find(x => x.name === 'Sticker');
          if (fee) item.shipping = this.location === 'us' ? fee.us : fee.singapore;
        }
        if (item.type === 'gift') {
          let fee = this.fees.find(x => x.name === 'Gift');
          if (fee) item.shipping = this.location === 'us' ? fee.us : fee.singapore;
        }
      });
      this.subtotal = 0;
      this.shippingfee = 0;
      this.total = 0;
      this.items.map(x => this.subtotal = this.subtotal + x.price)
      this.items.map(x => this.shippingfee = this.shippingfee + x.shipping)
      this.items.map(x => this.total = this.total + x.total)
      this.ref.detectChanges();
    }
  }

  convertNumberDisplay(value: number) {
    return this.locationService.getPriceSymbol() + value.toLocaleString('en-US', { minimumFractionDigits: 2 })
  }

  isValidSender() {
    return this.sender && this.sender.firstname && this.sender.firstname !== '' && this.sender.lastname && this.sender.lastname !== '' && this.sender.email && this.sender.email !== ''
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
      this.sender &&
      this.sender.email !== '' &&
      this.sender.firstname !== '' &&
      this.sender.lastname !== '' &&
      this.receiver &&
      this.receiver.firstname !== '' &&
      this.receiver.lastname !== '' &&
      this.receiver.email !== '' &&
      this.receiver.address !== '' &&
      this.receiver.country !== '' &&
      this.receiver.postcode !== '' &&
      this.items.length > 0;
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
          payment.sender = this.sender as INewSender;
          payment.receiver = this.receiver as INewAddress;
          payment.subtotal = this.subtotal;
          payment.shippingFee = this.shippingfee;
          payment.total = this.total;
          payment.items = this.items;
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
    payment.sender = this.sender as INewSender;
    payment.receiver = this.receiver as INewAddress;
    payment.subtotal = this.subtotal;
    payment.shippingFee = this.shippingfee;
    payment.total = this.total;
    payment.items = this.items;
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
    payment.sender = this.sender as INewSender;
    payment.receiver = this.receiver as INewAddress;
    payment.subtotal = this.subtotal;
    payment.shippingFee = this.shippingfee;
    payment.total = this.total;
    payment.items = this.items;
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
    payment.sender = this.sender as INewSender;
    payment.receiver = this.receiver as INewAddress;
    payment.subtotal = this.subtotal;
    payment.shippingFee = this.shippingfee;
    payment.total = this.total;
    payment.items = this.items;
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
        payment.sender = this.sender as INewSender;
        payment.receiver = this.receiver as INewAddress;
        payment.subtotal = this.subtotal;
        payment.shippingFee = this.shippingfee;
        payment.total = this.total;
        payment.items = this.items;
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
