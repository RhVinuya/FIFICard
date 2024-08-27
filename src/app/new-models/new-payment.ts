import { INewAddress } from "./new-address";
import { Timestamp } from "@angular/fire/firestore";

export interface INewPayment {
    id: string;
    userId: string;
    sender: INewSender;
    receiver: INewAddress;
    subtotal: number;
    shippingFee: number;
    total: number;
    items: INewPaymentItem[];
    location: 'ph' | 'sg' | 'us';
    gateway: 'specialcode' | 'card' | 'gcash' | 'paymaya';
    details: INewSpecialCodeDetails | INewStripeDetails | INewPaymongoDetails;
    created: Timestamp;
}

export class NewPayment {
    id: string;
    userId: string;
    sender: INewSender;
    receiver: INewAddress;
    subtotal: number;
    shippingFee: number;
    total: number;
    items: INewPaymentItem[];
    location: 'ph' | 'sg' | 'us';
    gateway: 'specialcode' | 'card' | 'gcash' | 'paymaya';
    details: INewSpecialCodeDetails | INewStripeDetails | INewPaymongoDetails;
    created: Timestamp;

    constructor(){}

    load(iPayment: INewPayment){
        this.id = iPayment.id;
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
    type: "card" | "sticker" | "postcard";
    bundle: INewPaymentItemBundle | undefined;
    price: number;
    shipping: number;
    total: number;
}

export interface INewPaymentItemBundle {
    count: number;
    price: number;
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
