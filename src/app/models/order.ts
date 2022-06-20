import { Timestamp } from "@angular/fire/firestore";

export class Order {
    public id?: string;
    public parentOrder?: string;
    public user_id?: string;
    public card_id?: string;
    public card_price?: number;
    public shipping_fee?: number;
    public sender_name?: string;
    public sender_phone?: string;
    public sender_email?: string;
    public receiver_name?: string;
    public receiver_phone?: string;
    public receiver_email?: string;
    public address?: string;
    public address1?: string;
    public address2?: string;
    public province?: string;
    public city?: string;
    public country?: string;
    public postcode?: string;
    public anonymously?: boolean;
    public sendto?: string;
    public message?: string;
    public created?: Timestamp;
    public isPaid?: Boolean;
    public paymentId?: string;
    public withSignAndSend?: boolean;
    public count?: number;
}
