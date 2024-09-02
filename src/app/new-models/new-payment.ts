import { NewLocationService } from "../new-services/new-location.service";
import { INewAddress } from "./new-address";
import { Timestamp } from "@angular/fire/firestore";
import { Gateway, ItemType, LocationType, PaymentDetails, Provider } from "./new-enum";
import { INewPersonalize } from "./new-personalize";

export interface INewPayment {
    id: string;
    code: string;
    userId: string;
    sender: INewSender;
    receiver: INewAddress;
    subtotal: number;
    shippingFee: number;
    total: number;
    items: INewPaymentItem[];
    location: 'ph' | 'sg' | 'us';
    gateway: Gateway;
    provider: Provider | undefined;
    details: PaymentDetails;
    created: Timestamp;
}

export class NewPayment {
    id: string;
    code: string;
    userId: string;
    sender: INewSender;
    receiver: INewAddress;
    subtotal: number;
    shippingFee: number;
    total: number;
    items: INewPaymentItem[];
    location: LocationType;
    gateway: Gateway;
    provider: Provider | undefined;
    details: PaymentDetails;
    created: Timestamp;

    constructor() { }

    locationService: NewLocationService = new NewLocationService();
    symbol: string = '';

    load(iPayment: INewPayment) {
        this.id = iPayment.id;
        this.code = iPayment.code;
        this.userId = iPayment.userId;
        this.sender = iPayment.sender;
        this.receiver = iPayment.receiver;
        this.subtotal = iPayment.subtotal;
        this.shippingFee = iPayment.shippingFee;
        this.total = iPayment.total;
        this.items = iPayment.items;
        this.location = iPayment.location;
        this.gateway = iPayment.gateway;
        this.provider = iPayment.provider;
        this.details = iPayment.details;
        this.created = iPayment.created;
        this.symbol = this.locationService.getSymbol(this.location)
    }

    subTotalDisplay() {

        return this.symbol + this.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    shippingFeeDisplay() {
        return this.symbol + this.shippingFee.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    totalDisplay() {
        return this.symbol + this.total.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    createdDisplay() {
        return this.created.toDate().toLocaleString();
    }

    getGateway() {
        if (this.gateway === 'specialcode') return 'Special Code';
        else if (this.gateway === 'card') return 'Card';
        else if (this.gateway === 'gcash') return 'GCash';
        else if (this.gateway === 'paymaya') return 'PayMaya';
        else return '';
    }
}

export interface INewSender {
    firstname: string;
    lastname: string;
    email: string;
}

export class NewSender {
    firstname: string;
    lastname: string;
    email: string;

    constructor(iSender: INewSender) {
        this.firstname = iSender.firstname;
        this.lastname = iSender.lastname;
        this.email = iSender.email;
    }

    getFullName() {
        return this.firstname + ' ' + this.lastname;
    }
}

export interface INewPaymentItem {
    id: string;
    itemId: string;
    type: ItemType;
    bundle: INewPaymentItemBundle | undefined;
    personalize: INewPersonalize | undefined;
    price: number;
    shipping: number;
    total: number;
}

export class NewPaymentItem {
    id: string;
    itemId: string;
    type: ItemType;
    bundle: NewPaymentItemBundle | undefined;
    personalize: INewPersonalize | undefined;
    price: number;
    shipping: number;
    total: number;

    location: LocationType;

    constructor(value: INewPaymentItem, location: LocationType) {
        this.id = value.id;
        this.itemId = value.itemId;
        this.type = value.type;
        if (value.bundle) this.bundle = new NewPaymentItemBundle(value.bundle as INewPaymentItemBundle)
        this.personalize = value.personalize;
        this.price = value.price;
        this.shipping = value.shipping;
        this.total = value.total;
        this.location = location;
    }

    priceDisplay() {
        let locationService: NewLocationService = new NewLocationService();
        return locationService.getSymbol(this.location) + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    shippingDisplay() {
        if (this.shipping === 0) {
            return 'FREE'
        }
        else {
            let locationService: NewLocationService = new NewLocationService();
            return locationService.getSymbol(this.location) + this.shipping.toLocaleString('en-US', { minimumFractionDigits: 2 })
        }
    }

    totalDisplay() {
        let locationService: NewLocationService = new NewLocationService();
        return locationService.getSymbol(this.location) + this.total.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
}

export interface INewPaymentItemBundle {
    count: number;
    price: number;
}

export class NewPaymentItemBundle {
    count: number;
    price: number;

    constructor(value: INewPaymentItemBundle) {
        this.count = value.count;
        this.price = value.price;
    }

    countDisplay() {
        return this.count.toLocaleString();
    }

    priceDisplay() {
        let locationService: NewLocationService = new NewLocationService();
        return locationService.getPriceSymbol() + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
}

export interface INewSpecialCodeDetails {
    code: string
}

export interface INewSpecialCode {
    id: string;
    code: string;
    paymentids: string[];
    active: boolean;
}

export interface INewStripeDetails {
    id: string;
    type: string;
    brand: string;
    amount: number;
    last4: string;
    live: boolean;
}

export interface INewPaymongoDetails {
    id: string;
    type: string;
    amount: number;
    live: boolean;
}

export interface INewGCashDetails {
    url: string;
    amount: number;
    live: boolean;
}

export interface INewGCashUploadDetails {
    url: string;
}
