import { Timestamp } from "@angular/fire/firestore";
import { NewLocationService } from "../new-services/new-location.service";
import { Allignment, LocationType } from "./new-enum";

export interface INewCard {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    event: string;
    recipient: string;
    recipients?: string[];
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    messagetype: 'regular' | 'poetry';
    type: 'card' | 'sticker' | 'postcard' | 'gift';
    signAndSend: boolean;
    talkingcard: boolean;
    created: Timestamp;
    modified: Timestamp;
}

export class NewCard {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    event: string;
    recipient: string;
    recipients?: string[];
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    messagetype: 'regular' | 'poetry';
    signAndSend: boolean;
    talkingcard: boolean;
    created: Timestamp;
    modified: Timestamp;

    constructor(value: INewCard) {
        this.id = value.id;
        this.code = value.code;
        this.name = value.name;
        this.description = value.description;
        this.details = value.details;
        this.event = value.event;
        this.recipient = value.recipient
        this.recipients = value.recipients? value.recipients : [];
        this.price = value.price;
        this.sgprice = value.sgprice;
        this.usprice = value.usprice;
        this.active = value.active;
        this.featured = value.featured;
        this.messagetype = value.messagetype;
        this.signAndSend = value.signAndSend;
        this.talkingcard = value.talkingcard;
        this.created = value.created;
        this.modified = value.modified;
    }

    priceDisplay() {
        let locationService: NewLocationService = new NewLocationService();
        let location: LocationType = locationService.getlocation();
        if (location === 'us') return '$' + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else if (location === 'sg') return 'S$' + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    getPersonalizePHPrice() {
        return this.price + 50;
    }

    getPersonalizeUSPrice() {
        return this.usprice + 1;
    }

    getPersonalizeSGPrice() {
        return this.usprice + 1;
    }

    getPersonalizePriceDisplay() {
        if (this.signAndSend) {
            let locationService: NewLocationService = new NewLocationService();
            let location: LocationType = locationService.getlocation();
            if (location === 'us') return '$' + this.getPersonalizeUSPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
            else if (location === 'sg') return 'S$' + this.getPersonalizeSGPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
            else return '₱' + this.getPersonalizePHPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
        }
        else return '';
    }
}

export interface INewCardImage {
    title: string;
    url: string;
    active: boolean;
}


export interface INewRating {
    id: string;
    title: string
    review: string;
    rate: number;
    username: string;
    approve: boolean;
    created: Timestamp;
    modified: Timestamp;
}

export interface INewSignAndSend {
    id: string;
    code: number;
    image: string;
    height: number;
    width: number;
    top: number
    left: number;
    created: Timestamp;
}

