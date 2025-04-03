import { Timestamp } from "@angular/fire/firestore";
import { NewLocationService } from "../new-services/new-location.service";
import { LocationType } from "./new-enum";
import { IConfig, IPromo } from "./new-config";

export interface INewSticker {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    events: string[];
    recipient: string;
    recipients?: string[];
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    type: 'card' | 'sticker' | 'postcard' | 'gift';
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
    recipient: string;
    recipients?: string[];
    price: number;
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    created: Timestamp;
    modified: Timestamp;

    config: IConfig;

    constructor(value: INewSticker, _config: IConfig) {
        this.id = value.id;
        this.code = value.code;
        this.name = value.name;
        this.description = value.description;
        this.details = value.details;
        this.events = value.events;
        this.recipients = value.recipients ? value.recipients : [];
        this.price = value.price;
        this.sgprice = value.sgprice;
        this.usprice = value.usprice;
        this.active = value.active;
        this.featured = value.featured;
        this.created = value.created;
        this.modified = value.modified;

        this.config = _config;
    }

    priceDisplay() {
        let locationService: NewLocationService = new NewLocationService();
        let location: LocationType = locationService.getlocation();
        if (location === 'us') return '$' + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else if (location === 'sg') return 'S$' + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    getPromo() {
        let promos: IPromo[] = [];

        this.config.promos.forEach(value => {
            if (value.itemtype === 'sticker') {
                const start: Date = new Date(value.start);
                const end: Date = new Date(value.end);
                const today = new Date();
                if (today.getTime() >= start.getTime() && today.getTime() <= end.getTime()) promos.push(value);
            }
        });

        return promos
    }

    isPromo() {
        return this.getPromo() !== undefined;
    }
}

export interface INewStickerImage {
    title: string;
    url: string;
    active: boolean;
}