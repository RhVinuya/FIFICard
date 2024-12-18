import { Timestamp } from "@angular/fire/firestore";
import { NewLocationService } from "../new-services/new-location.service";
import { LocationType } from "./new-enum";
import { environment } from "src/environments/environment";

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
    created: Timestamp;
    modified: Timestamp;

    constructor(value: INewCard) {
        this.id = value.id;
        this.code = value.code;
        this.name = value.name;
        this.description = value.description;
        this.details = value.details;
        this.event = value.event;
        this.events = value.events;
        this.recipient = value.recipient
        this.recipients = value.recipients? value.recipients : [];
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
        this.created = value.created;
        this.modified = value.modified;
    }

    priceDisplay() {
        let locationService: NewLocationService = new NewLocationService();
        let location: LocationType = locationService.getlocation();
        if (location === 'us') return '$' + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else if (location === 'sg') return 'S$' + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }

    getPersonalizePHPrice() {
        return this.price + 50;
    }

    getPersonalizeUSPrice() {
        return this.usprice + 1;
    }

    getPersonalizeSGPrice() {
        return this.usprice + 1;
    }

    getPersonalizePriceDisplay() {
        if (this.signAndSend) {
            let locationService: NewLocationService = new NewLocationService();
            let location: LocationType = locationService.getlocation();
            if (location === 'us') return '$' + this.getPersonalizeUSPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
            else if (location === 'sg') return 'S$' + this.getPersonalizeSGPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
            else return '₱' + this.getPersonalizePHPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
        }
        else return '';
    }

    getRecipients(max: number | undefined = undefined) {
        let allowedlist = environment.recipients;
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

    constructor(value: INewRating){
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
