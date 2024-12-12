import { RefferalStatus } from "./new-enum";
import { Timestamp } from "@angular/fire/firestore";

export interface INewReferral {
    id: string;
    referredby: string;
    email: string;
    status: RefferalStatus;
    created: Timestamp | undefined;
}

export class NewReferral {
    id: string;
    referredby: string;
    email: string;
    status: RefferalStatus;
    created: Timestamp | undefined;

    constructor(referral: INewReferral) {
        this.id = referral.id;
        this.referredby = referral.referredby;
        this.email = referral.email;
        this.status = referral.status;
        this.created = referral.created;
    }

    createdDisplay() {
        return this.created ? this.created.toDate().toLocaleString() : '';
    }
}
