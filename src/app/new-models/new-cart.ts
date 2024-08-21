import { INewCard } from "./new-card";
import { INewSticker } from "./new-sticker";

export class INewCart {
    id: string;
    itemid: string;
    price: number;
    sgprice: number;
    usprice: number;
    type: "card" | "sticker";
}
