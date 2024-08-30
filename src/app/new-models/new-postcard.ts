import { Timestamp } from "@angular/fire/firestore";
import { NewLocationService } from "../new-services/new-location.service";
import { LocationType } from "./new-enum";

export interface INewPostcard {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    events: string[];
    active: boolean;
    featured: boolean;
    type: 'card' | 'sticker' | 'postcard' | 'gift';
    created: Timestamp;
    modified: Timestamp;
}

export class NewPostcard {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    events: string[];
    active: boolean;
    featured: boolean;
    created: Timestamp;
    modified: Timestamp;

    constructor(value: INewPostcard) {
        this.id = value.id;
        this.code = value.code;
        this.name = value.name;
        this.description = value.description;
        this.details = value.details;
        this.events = value.events;
        this.active = value.active;
        this.featured = value.featured;
        this.created = value.created;
        this.modified = value.modified;
    }
}

export interface INewPostcardImage {
    title: string;
    url: string;
    active: boolean;
}

export interface INewPostcardBundle {
    count: number;
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;
}

export class NewPostcardBundle {
    count: number;
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;

    constructor(value: INewPostcardBundle) {
        this.count = value.count;
        this.price = value.price;
        this.sgprice = value.sgprice;
        this.usprice = value.usprice;
        this.active = value.active;
    }

    countDisplay(){
        return this.count.toLocaleString();
    }

    priceDisplay(){
        let locationService: NewLocationService = new NewLocationService();
        let location: LocationType = locationService.getlocation();
        if (location === 'us') return '$' + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else if (location === 'sg') return 'S$' + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
}