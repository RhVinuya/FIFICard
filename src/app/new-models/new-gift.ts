import { Timestamp } from "@angular/fire/firestore";
import { IConfig, IPromo } from "./new-config";
import { LocationType } from "./type";
import { NewLocationService } from "../new-services/new-location.service";
import { environment } from "src/environments/environment";

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
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    type: 'card' | 'sticker' | 'postcard' | 'gift';
    locations: LocationType[];
    sgshipping: number;
    usshipping: number;
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
    sgprice: number;
    usprice: number;
    active: boolean;
    featured: boolean;
    locations: LocationType[];
    sgshipping: number;
    usshipping: number;
    created: Timestamp;
    modified: Timestamp;
    promotag: string[] = [];
    isAvailable: boolean = true;

    locationService: NewLocationService;
    location: LocationType;
    currencySymbol: string;
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
        this.sgprice = value.sgprice;
        this.usprice = value.usprice;
        this.active = value.active;
        this.featured = value.featured;
        this.locations = value.locations;
        this.sgshipping = value.sgshipping
        this.usshipping = value.usshipping;
        this.created = value.created;
        this.modified = value.modified;
        this.locationService = new NewLocationService();
        this.location = this.locationService.getlocation();
        this.isAvailable = this.locations.includes(this.location);
        this.currencySymbol = this.locationService.getCurrencySymbol(this.location);
        this.config = _config;
    }

    priceDisplay() {
        let currency = environment.currencies.find(x => x.code === this.currencySymbol);
        if (currency) {
            if (currency.code === 'USD') return currency.sign + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
            else if (currency.code === 'SGD') return currency.sign + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
            else return currency.sign + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
        }
        else return '0.00';
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