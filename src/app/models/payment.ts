import { Timestamp } from '@angular/fire/firestore';

export class Payment {
    public id?: string;
    public code: string;
    public user_id: string;
    public gateway: string;
    public orders: string[];
    public total: number;
    public proof: string;
    public transactionId: string;
    public payerId: string;
    public payerEmail: string;
    public status: string;  
    public created: Timestamp;
    public stripe: StripeDetails | null;
    public specialcode: string;
}

export class StripeDetails {
    public id: string;
    public type: string;
    public brand: string;
    public amount: number;
    public last4: string;

}
