import { Timestamp } from "@angular/fire/firestore";
import { NewLocationService } from "../new-services/new-location.service";
import { LocationType } from "./new-enum";

export interface INewCard {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    event: string;
    recipient: string;
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    messagetype: 'regular' | 'poetry';
    type: 'card' | 'sticker' | 'postcard' | 'gift';
    signAndSend: boolean;
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
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    messagetype: 'regular' | 'poetry';
    signAndSend: boolean;
    created: Timestamp;
    modified: Timestamp;

    constructor(value: INewCard){
        this.id = value.id;
        this.code = value.code;
        this.name = value.name;
        this.description = value.description;
        this.details = value.details;
        this.event = value.event;
        this.recipient = value.recipient
        this.price = value.price;
        this.sgprice = value.sgprice;
        this.usprice = value.usprice;
        this.active = value.active;
        this.featured = value.featured;
        this.messagetype = value.messagetype;
        this.signAndSend = value.signAndSend;
        this.created = value.created;
        this.modified = value.modified;
    }

    priceDisplay(){
        let locationService: NewLocationService = new NewLocationService();
        let location: LocationType = locationService.getlocation();
        if (location === 'us') return '$' + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else if (location === 'sg') return 'S$' + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
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
