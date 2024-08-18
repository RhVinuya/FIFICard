import { formatCurrency } from "@angular/common";
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
    images: string[];
    primary: string;
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
    images: string[];
    primary: string;
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
        this.images = value.images;
        this.primary = value.primary;
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

    getPrimary(){
        if (this.primary && this.primary !== '') return this.primary;
        else if (this.images && this.images.length > 0) return this.images[0]
        else return '';
    }
}

export interface INewCardImage {
    title: string;
    url: string;
    active: boolean;
}
