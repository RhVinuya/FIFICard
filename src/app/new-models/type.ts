import { INewCardImage } from "./new-card";
import { INewGiftImage } from "./new-gift";
import { INewPostcardImage } from "./new-postcard";

export type Type = 'card' | 'postcard' | 'gift';
export type LocationType = 'ph' | 'sg' | 'us';
export type LocationOptions = 'PHP' | 'SGD' | 'USD';
export type DiscountType = 'percent' | 'amount';
export type IImageTypes = INewCardImage[] | INewPostcardImage[] | INewGiftImage[];
export type Profile = 'info' | 'commpref' | 'downloads' | 'messages' | 'transactions' | 'signout';
export type LinkType = 'internal' | 'external' | 'none'