import { Timestamp } from "@angular/fire/firestore";
import { NewLocationService } from "../new-services/new-location.service";
import { LocationType } from "./new-enum";
import { IConfig, IPromo } from "./new-config";

export interface INewPostcard {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    events: string[];
    recipient: string;
    recipients?: string[];
    active: boolean;
    featured: boolean;
    type: 'card' | 'sticker' | 'postcard' | 'gift';
    sgshipping: number;
    usshipping: number;
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
    recipient: string;
    recipients?: string[];
    active: boolean;
    featured: boolean;
    sgshipping: number;
    usshipping: number;
    created: Timestamp;
    modified: Timestamp;

    promotag: string[] = []
    
    config: IConfig;

    constructor(value: INewPostcard, _config: IConfig) {
        this.id = value.id;
        this.code = value.code;
        this.name = value.name;
        this.description = value.description;
        this.details = value.details;
        this.events = value.events;
        this.recipients = value.recipients ? value.recipients : [];
        this.active = value.active;
        this.featured = value.featured;
        this.sgshipping = value.sgshipping
        this.usshipping = value.usshipping;
        this.created = value.created;
        this.modified = value.modified;

        this.config = _config;
    }

    getPromo() {
        let promos: IPromo[] = [];

        this.config.promos.forEach(value => {
            const start: Date = new Date(value.start);
            const end: Date = new Date(value.end);
            const today = new Date();
            if (today.getTime() >= start.getTime() && today.getTime() <= end.getTime()) {
                if (value.type === "discount on 2nd item") {
                    if (value.itemtype === 'postcard') {
                        promos.push(value);
                        this.promotag.push(value.title);
                    }
                }
                else if (value.type === "free on 2nd item") {
                    if (value.itemtype === 'postcard') {
                        promos.push(value);
                        this.promotag.push(value.itemtypetag);
                    }
                    if (value.discountedtype === 'postcard') {
                        promos.push(value);
                        this.promotag.push(value.discountedtypetag);
                    }
                }
            }
        });

        return promos
    }

    isPromo() {
        return this.getPromo() !== undefined;
    }
}

export interface INewPostcardImage {
    id: string;
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

    countDisplay() {
        return this.count.toLocaleString();
    }

    priceDisplay() {
        let locationService: NewLocationService = new NewLocationService();
        let location: LocationType = locationService.getlocation();
        if (location === 'us') return '$' + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else if (location === 'sg') return 'S$' + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
}