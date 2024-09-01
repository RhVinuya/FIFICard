import { INewCard, NewCard } from "./new-card";
import { INewGift, NewGift } from "./new-gift";
import { INewGCashDetails, INewGCashUploadDetails, INewPaymongoDetails, INewSpecialCodeDetails, INewStripeDetails } from "./new-payment";
import { INewPostcard, NewPostcard } from "./new-postcard";
import { INewSticker, NewSticker } from "./new-sticker";

export type LocationType = 'ph' | 'us' | 'sg' ;
export type ItemType = "card" | "sticker" | "postcard" | "gift";
export type ModelType = NewCard | NewSticker | NewPostcard | NewGift;
export type IModelType = INewCard | INewSticker | INewPostcard | INewGift;
export type Gateway = 'specialcode' | 'card' | 'gcash' | 'paymaya';
export type Provider = 'stripe' | 'paymongo';
export type PaymentDetails = INewSpecialCodeDetails | INewStripeDetails | INewPaymongoDetails | INewGCashDetails | INewGCashUploadDetails;
export type Allignment = 'left' | 'center' | 'right';

export enum StorageEnum {
    RememberEmail = 'REMEMBER_EMAIL',
    RememberPassword = 'REMEMBER_PASSWORD',
    Account = 'ACCOUNT',
    Cart = 'CART-',
    Wishlist = 'WISHLIST',
    Checkout = 'CHECKOUT',
    Payment = 'PAYMENT',
    PayMongo = 'PAYMONGO',
    Personalize = 'PERSONALIZE-',
    Item = 'ITEM-',
    Image = 'IMAGE-'
}