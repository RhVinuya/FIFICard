import { Timestamp } from "@angular/fire/firestore";

export interface INewSticker {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    events: string[];
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    created: Timestamp;
    modified: Timestamp;
}

export class NewSticker {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    events: string[];
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    created: Timestamp;
    modified: Timestamp;

    constructor(value: INewSticker){
        this.id = value.id;
        this.code = value.code;
        this.name = value.name;
        this.description = value.description;
        this.details = value.details;
        this.events = value.events;
        this.price = value.price;
        this.sgprice = value.sgprice;
        this.usprice = value.usprice;
        this.active = value.active;
        this.featured = value.featured;
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

export interface INewStickerImage {
    title: string;
    url: string;
    active: boolean;
}