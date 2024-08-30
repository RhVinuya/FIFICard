import { LocationType, NewLocationService } from "../new-services/new-location.service";
import { INewAddress } from "./new-address";
import { Timestamp } from "@angular/fire/firestore";
import { ItemType } from "./new-cart";

export type Gateway = 'specialcode' | 'card' | 'gcash' | 'paymaya';

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
    details: INewSpecialCodeDetails | INewStripeDetails | INewPaymongoDetails;
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
    details: INewSpecialCodeDetails | INewStripeDetails | INewPaymongoDetails;
    created: Timestamp;

    locationService: NewLocationService;
    
    constructor(){}

    load(iPayment: INewPayment){
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
        this.details = iPayment.details;
        this.created = iPayment.created;
    }

    subTotalDisplay(){
        return '₱' + this.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    shippingFeeDisplay(){
        return '₱' + this.shippingFee.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    totalDisplay(){
        return '₱' + this.total.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    createdDisplay(){
        return this.created.toDate().toLocaleString();
    }

    getGateway(){
        if (this.gateway === 'specialcode') return 'Special Code';
        else if (this.gateway === 'card') return 'Card';
        else if (this.gateway === 'gcash') return 'GCash';
        else if (this.gateway === 'paymaya') return 'PayMaya';
        else return '';
    }
}

export interface INewSender{
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

    getFullName(){
        return this.firstname + ' ' + this.lastname;
    }
}

export interface INewPaymentItem{
    id: string;
    itemid: string;
    type: ItemType;
    bundle: INewPaymentItemBundle | undefined;
    price: number;
    shipping: number;
    total: number;
}

export class NewPaymentItem{
    id: string;
    itemid: string;
    type: ItemType;
    bundle: NewPaymentItemBundle | undefined;
    price: number;
    shipping: number;
    total: number;

    constructor(value: INewPaymentItem) {
        this.id = value.id;
        this.itemid = value.itemid;
        this.type = value.type;
        if (value.bundle) this.bundle = new NewPaymentItemBundle(value.bundle as INewPaymentItemBundle)
        this.price = value.price;
        this.shipping = value.shipping;
        this.total = value.total;
    }

    priceDisplay(){
        let locationService: NewLocationService = new NewLocationService();
        return locationService.getPriceSymbol() + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    shippingDisplay(){
        let locationService: NewLocationService = new NewLocationService();
        return locationService.getPriceSymbol() + this.shipping.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    totalDisplay(){
        let locationService: NewLocationService = new NewLocationService();
        return locationService.getPriceSymbol() + this.total.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
}

export interface INewPaymentItemBundle {
    count: number;
    price: number;
}

export class NewPaymentItemBundle{
    count: number;
    price: number;

    constructor(value: INewPaymentItemBundle) {
        this.count = value.count;
        this.price = value.price;
    }

    countDisplay() {
        return this.count.toLocaleString();
    }

    priceDisplay(){
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
