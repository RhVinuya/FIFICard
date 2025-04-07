import { Timestamp } from "@angular/fire/firestore";
import { IConfig, IPromo } from "./new-config";

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

    promotag: string[] = []

    config: IConfig;

    constructor(value: INewGift, _config: IConfig) {
        this.id = value.id;
        this.code = value.code;
        this.name = value.name;
        this.description = value.description;
        this.details = value.details;
        this.events = value.events;
        this.recipient = value.recipient;
        this.recipients = value.recipients ? value.recipients : [];
        this.price = value.price;
        this.active = value.active;
        this.featured = value.featured;
        this.created = value.created;
        this.modified = value.modified;

        this.config = _config;
    }

    priceDisplay() {
        return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    getPromo() {
        let promos: IPromo[] = [];

        this.config.promos.forEach(value => {
            const start: Date = new Date(value.start);
            const end: Date = new Date(value.end);
            const today = new Date();
            if (today.getTime() >= start.getTime() && today.getTime() <= end.getTime()) {
                if (value.type === "discount on 2nd item") {
                    if (value.itemtype === 'gift') {
                        promos.push(value);
                        this.promotag.push(value.title);
                    }
                }
                else if (value.type === "free on 2nd item") {
                    if (value.itemtype === 'gift') {
                        promos.push(value);
                        this.promotag.push(value.itemtypetag);
                    }
                    if (value.discountedtype === 'gift') {
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

export interface INewGiftImage {
    id: string;
    title: string;
    url: string;
    active: boolean;
}