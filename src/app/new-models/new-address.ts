export interface INewAddress {
    id: string;
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    city: string;
    province: string;
    country: string;
    postcode: string;
}

export class NewAddress {
    id: string;
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    city: string;
    province: string;
    country: string;
    postcode: string;

    constructor(address: INewAddress) {
        this.id = address.id;
        this.userId = address.userId;
        this.firstname = address.firstname;
        this.lastname = address.lastname;
        this.email = address.email;
        this.address = address.address;
        this.city = address.city;
        this.province = address.province;
        this.country = address.country;
        this.postcode = address.postcode;
    }

    getFullName(){
        return this.firstname + ' ' + this.lastname;
    }

    getFullAddress(){
        return this.address + ' ' + this.city + ' ' + this.province + ' ' + this.country + ' ' + this.postcode;
    }
}

export interface INewAddressConfig {
    group: string;
    name: string;
    city: string[];
    order: number
}