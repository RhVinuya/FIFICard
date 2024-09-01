export interface INewUser {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    customer: boolean;
    birthday: string;
    notification: boolean;
    providerId: string;
    photoURL: string
    address: string;
    greetings_wishlist: string[];
}

export interface INewGoogleUser{
    id: string;
    email: string;
    providerId: string;
    photoURL: string
}





