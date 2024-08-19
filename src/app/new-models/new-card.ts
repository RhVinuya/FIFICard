import { Timestamp } from "@angular/fire/firestore";

export interface INewCard {
    id: string;
    name: string;
    description: string;
    details: string;
    events: string[];
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    images: string[];
    messagetype: 'regular' | 'poetry';
    created: Timestamp;
    modified: Timestamp;
}

export class NewCard {
    id: string;
    name: string;
    description: string;
    details: string;
    events: string[];
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    images: string[];
    messagetype: 'regular' | 'poetry';
    created: Timestamp;
    modified: Timestamp;

    constructor(value: INewCard){
        this.id = value.id;
        this.name = value.name;
        this.description = value.description;
        this.details = value.details;
        this.events = value.events;
        this.price = value.price;
        this.sgprice = value.sgprice;
        this.usprice = value.usprice;
        this.active = value.active;
        this.featured = value.featured;
        this.images = value.images;
        this.messagetype = value.messagetype;
        this.created = value.created;
        this.modified = value.modified;
    }

    priceDisplay(){
        return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    usPriceDisplay(){
        return '$' + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    sgPriceDisplay(){
        return 'S$' + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
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
