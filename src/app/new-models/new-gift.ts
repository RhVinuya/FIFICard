import { Timestamp } from "@angular/fire/firestore";

export interface INewGift {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    events: string[];
    recipient: string;
    recipients?: string[];
    price: number;
    active: boolean;
    featured: boolean;
    type: 'card' | 'sticker' | 'postcard' | 'gift';
    created: Timestamp;
    modified: Timestamp;
}

export class NewGift {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    events: string[];
    recipient: string;
    recipients?: string[];
    price: number;
    active: boolean;
    featured: boolean;
    created: Timestamp;
    modified: Timestamp;

    constructor(value: INewGift){
        this.id = value.id;
        this.code = value.code;
        this.name = value.name;
        this.description = value.description;
        this.details = value.details;
        this.events = value.events;
        this.recipient = value.recipient;
        this.recipients = value.recipients? value.recipients : [];
        this.price = value.price;
        this.active = value.active;
        this.featured = value.featured;
        this.created = value.created;
        this.modified = value.modified;
    }

    priceDisplay(){
        return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
}

export interface INewGiftImage {
    title: string;
    url: string;
    active: boolean;
}