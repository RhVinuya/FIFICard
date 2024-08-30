import { INewCard, NewCard } from "./new-card";
import { INewGift, NewGift } from "./new-gift";
import { INewPostcard, NewPostcard } from "./new-postcard";
import { INewSticker, NewSticker } from "./new-sticker";

export type LocationType = 'ph' | 'us' | 'sg' ;
export type ItemType = "card" | "sticker" | "postcard" | "gift";
export type ModelType = NewCard | NewSticker | NewPostcard | NewGift;
export type IModelType = INewCard | INewSticker | INewPostcard | INewGift;
