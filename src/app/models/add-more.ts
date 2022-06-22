import { Card } from "./card";

export class AddMore {
    public card: Card;
    public count: number;
    public shipping_fee: number;

    public constructor(_card: Card){
        this.card = _card;
        this.count = 0;
        this.shipping_fee = 0;
    }
}
