import { Timestamp } from "@angular/fire/firestore";
import { NewLocationService } from "../new-services/new-location.service";
import { LocationType } from "./new-enum";
import { environment } from "src/environments/environment";
import { INewDiscount } from "./new-discount";
import { IConfig, IPromo } from "./new-config";

export interface INewCard {
    id: string;
    code: string;
    name: string;
    description: string;
    details: string;
    event: string;
    events: string[];
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
    cardbundle: boolean;
    cardbundleIds: string[];
    sgshipping: number;
    usshipping: number;
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
    events: string[];
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
    cardbundle: boolean;
    cardBundleIds: string[];
    sgshipping: number;
    usshipping: number;
    created: Timestamp;
    modified: Timestamp;

    promotag: string[] = []

    locationService: NewLocationService;
    location: LocationType;
    currencySymbol: string;

    config: IConfig;

    constructor(value: INewCard, _config: IConfig) {
        this.id = value.id;
        this.code = value.code;
        this.name = value.name;
        this.description = value.description;
        this.details = value.details;
        this.event = value.event;
        this.events = value.events;
        this.recipient = value.recipient
        this.recipients = value.recipients ? value.recipients : [];
        this.price = value.price;
        this.sgprice = value.sgprice;
        this.usprice = value.usprice;
        this.active = value.active;
        this.featured = value.featured;
        this.messagetype = value.messagetype;
        this.signAndSend = value.signAndSend;
        this.talkingcard = value.talkingcard;
        this.cardbundle = value.cardbundle;
        this.cardBundleIds = value.cardbundleIds;
        this.sgshipping = value.sgshipping
        this.usshipping = value.usshipping;
        this.created = value.created;
        this.modified = value.modified;

        this.promotag = [];

        this.locationService = new NewLocationService();
        this.location = this.locationService.getlocation();
        this.currencySymbol = this.locationService.getCurrencySymbol(this.location);

        this.config = _config;
    }

    isFree() {
        let currency = environment.currencies.find(x => x.code === this.currencySymbol);
        if (currency) {
            if (currency.code === 'USD') return this.usprice === 0;
            else if (currency.code === 'SGD') return this.sgprice === 0;
            else return this.price === 0;
        }
        else return false;
    }

    getDiscount(): INewDiscount | undefined {
        let disc: INewDiscount | undefined = undefined;

        let discounts: INewDiscount[] = [];
        this.config.discounts.forEach(value => discounts.push(value as INewDiscount));
        discounts = discounts.filter(x => x.active === true);
        discounts.forEach(value => {
            if (value.event.toUpperCase() === this.event.toUpperCase()) disc = value
        })

        return disc;
    }

    isDiscounted() {
        if (this.isFree()) return false;
        else return this.getDiscount() !== undefined;
    }

    getPromo() {
        let promos: IPromo[] = [];

        this.config.promos.forEach(value => {
            const start: Date = new Date(value.start);
            const end: Date = new Date(value.end);
            const today = new Date();
            if (today.getTime() >= start.getTime() && today.getTime() <= end.getTime()) {
                if (value.type === "discount on 2nd item") {
                    if (value.itemtype === 'card') {
                        promos.push(value);
                        this.promotag.push(value.title);
                    }
                }
                else if (value.type === "free on 2nd item") {
                    if (value.itemtype === 'card') {
                        promos.push(value);
                        this.promotag.push(value.itemtypetag);
                    }
                    if (value.discountedtype === 'card') {
                        promos.push(value);
                        this.promotag.push(value.discountedtypetag);
                    }
                }
            }
        });

        return promos
    }

    isPromo() {
        if (this.isFree()) return false;
        else return this.getPromo() !== undefined;
    }

    originalPriceDisplay() {
        let currency = environment.currencies.find(x => x.code === this.currencySymbol);
        if (currency) {
            if (currency.code === 'USD') return currency.sign + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
            else if (currency.code === 'SGD') return currency.sign + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
            else return currency.sign + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
        }
        else return '0.00';
    }

    priceDisplay() {
        if (this.isDiscounted() === false) {
            if (this.location === 'us') return '$' + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
            else if (this.location === 'sg') return 'S$' + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
            else return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 });
        } else {
            let currency = environment.currencies.find(x => x.code === this.currencySymbol);
            if (currency) {
                if (currency.code === 'USD') {
                    return currency.sign + this.getDiscountedPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
                }
                else if (currency.code === 'SGD') {
                    return currency.sign + this.getDiscountedPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
                }
                else {
                    return currency.sign + this.getDiscountedPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
                }
            }
            else return '';
        }
    }

    getDiscountedPrice() {
        if (this.isDiscounted()) {
            let discounted: number = 0;
            let price: number = 0;

            let currency = environment.currencies.find(x => x.code === this.currencySymbol);
            if (currency) {
                if (currency.code === 'USD') price = this.usprice;
                else if (currency.code === 'SGD') price = this.sgprice;
                else price = this.price;
            }
            else price = this.price;

            let disc = this.getDiscount()
            if (disc) {
                if (disc.disctype === 'percent') {
                    discounted = price - (price * (disc.value / 100))
                }
            }

            return discounted


        }
        return 0
    }

    discountValueDisplay() {
        if (this.isDiscounted()) {
            let disc = this.getDiscount();
            if (disc) {
                if (disc.disctype === 'percent') return disc.value.toString() + '%'
                else return disc.value.toLocaleString('en-US', { minimumFractionDigits: 2 })
            }
            else return '';
        }
        else return '';
    }

    getPersonalizePHPrice(discounted: boolean = false) {
        let price = this.price + 50;

        if (discounted) {

            let disc = this.getDiscount()
            if (disc) {
                if (disc.disctype === 'percent') {
                    price = price - (price * (disc.value / 100))
                }
            }
        }

        return price;
    }

    getPersonalizeUSPrice(discounted: boolean = false) {
        let price = this.usprice + 1;

        if (discounted) {

            let disc = this.getDiscount()
            if (disc) {
                if (disc.disctype === 'percent') {
                    price = price - (price * (disc.value / 100))
                }
            }
        }

        return price;
    }

    getPersonalizeSGPrice(discounted: boolean = false) {
        let price = this.sgprice + 1;

        if (discounted) {

            let disc = this.getDiscount()
            if (disc) {
                if (disc.disctype === 'percent') {
                    price = price - (price * (disc.value / 100))
                }
            }
        }

        return price + 1;
    }

    getPersonalizePriceDisplay(discounted: boolean = false) {
        if (this.signAndSend) {
            let locationService: NewLocationService = new NewLocationService();
            let location: LocationType = locationService.getlocation();
            if (location === 'us') return '$' + this.getPersonalizeUSPrice(discounted).toLocaleString('en-US', { minimumFractionDigits: 2 })
            else if (location === 'sg') return 'S$' + this.getPersonalizeSGPrice(discounted).toLocaleString('en-US', { minimumFractionDigits: 2 })
            else return '₱' + this.getPersonalizePHPrice(discounted).toLocaleString('en-US', { minimumFractionDigits: 2 })
        }
        else return '';
    }

    getPersonalizePrice(discounted: boolean = false) {
        if (this.signAndSend) {
            let locationService: NewLocationService = new NewLocationService();
            let location: LocationType = locationService.getlocation();
            if (location === 'us') return this.getPersonalizeUSPrice(discounted)
            else if (location === 'sg') return this.getPersonalizeSGPrice(discounted)
            else return this.getPersonalizePHPrice(discounted)
        }
        else return 0;
    }

    getRecipients(max: number | undefined = undefined) {
        let allowedlist = this.config.recipients;
        let list: string[] = [];

        if (this.recipients) {
            allowedlist.forEach(x => {
                if (x.main.toUpperCase() !== environment.recipientdefault.toUpperCase()) {
                    if (this.recipients!.findIndex(i => i.toUpperCase() === x.main.toUpperCase()) >= 0) list.push(x.main);
                    else {
                        if (x.others) {
                            x.others.forEach(y => {
                                if (this.recipients!.findIndex(i => i.toUpperCase() === y.toUpperCase()) >= 0) list.push(y);
                            })
                        }
                    }
                }
            })
        }

        if (list.length === 0) list.push(environment.recipientdefault);

        return max ? list.slice(0, max) : list;
    }
}

export interface INewCardImage {
    id: string;
    title: string;
    url: string;
    active: boolean;
}


export interface INewRating {
    id: string;
    title: string
    review: string;
    rate: number;
    userId: string;
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

export class NewRating {
    id: string;
    title: string
    review: string;
    rate: number;
    userId: string;
    username: string;
    approve: boolean;
    created: Timestamp;
    modified: Timestamp;

    constructor(value: INewRating) {
        this.id = value.id;
        this.title = value.title;
        this.review = value.review;
        this.rate = value.rate;
        this.userId = value.userId;
        this.username = value.username;
        this.approve = value.approve;
        this.created = value.created;
        this.modified = value.modified;
    }

}
