import { Timestamp } from "@angular/fire/firestore";

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
    active: boolean
}