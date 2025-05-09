import { DiscountType, LinkType, LocationOptions, Type } from "./type";

export interface IConfig {
    payment: IPaymentConfig;
    gateway: IGateway[];
    ecardsevents: string[],
    ecardsfreeevents: string[];
    recipients: IRecipient[];
    recipientdefault: string;
    epostcardssevents: string[];
    clipartssevents: string[];
    links: ILink[];
    ads: IAds;
    discounts: IDiscount[];
    promos: IPromo[];
    priorities: IPriority[];
}

export interface IPaymentConfig{
    live: boolean;
    gcash: boolean;
    paymongo: boolean;
    stripe: boolean;
}

export interface IGateway {
    currency: LocationOptions;
    payments: string[];
}

export interface IRecipient {
    main: string;
    others?: string[];
}

export interface ILink {
    title: string;
    url: string;
}

export interface IAds {
    thumb: IAdsThumb;
    flash: IAdsFlash;
    flashmobile: IAdsFlash;
    sticky: IAdsSticky;
}

export interface IAdsThumb {
    enable: boolean;
    images: IAdsImage[];
}

export interface IAdsFlash {
    enable: boolean;
    images: IAdsImage[];
}

export interface IAdsSticky {
    enable: boolean;
    initial: number;
    minutes: number;
    images: IAdsImage[];
}

export interface IAdsImage {
    image: string;
    storage: string;
    title: string;
    linktype: LinkType;
    url: string;
}   

export interface IDiscount {
    code: string;
    value: number;
    disctype: DiscountType;
    active: boolean;
    event: string;
    type: Type;
}

export interface IPaymentKeys {
    publicKey: string;
    secretKey: string;
}

export interface IPromo {
    type: 'discount on 2nd item' | 'free on 2nd item';
    title: string;
    start: string;
    end: string;
    discount: number;
    itemtype: Type;
    itemtypetag: string;
    discountedtype: Type;
    discountedtypetag: string;
}

export interface IPriority {
    type: Type;
    event: string;
    ids: string[];
}