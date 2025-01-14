import { INewDiscount } from './new-discount';
import { NewLocationService } from "../new-services/new-location.service";
import { ItemType, LocationType } from "./new-enum";
import { INewPersonalize } from "./new-personalize";

export interface INewCart {
    id: string;
    itemId: string;
    userId: string;
    price: number;
    sgprice: number;
    usprice: number;
    type: ItemType;
    isDiscounted?: boolean | undefined;
    discount?: INewDiscount | undefined;
    discountPrice?: number | undefined;
    bundle: INewCartBundle | undefined;
    personalize: INewPersonalize | undefined;
    mark: boolean;
}

export class NewCart {
    id: string;
    itemId: string;
    userId: string;
    price: number;
    sgprice: number;
    usprice: number;
    isDiscounted: boolean;
    discount: INewDiscount | undefined;
    discountPrice: number;
    type: ItemType;
    bundle: NewCartBundle | undefined;
    personalize: INewPersonalize | undefined;
    mark: boolean;

    constructor(value: INewCart) {
        this.id = value.id;
        this.itemId = value.itemId;
        this.userId = value.userId;
        this.price = value.price;
        this.sgprice = value.sgprice;
        this.usprice = value.usprice;        
        this.isDiscounted = value.isDiscounted!;
        this.discount = value.discount;
        this.discountPrice = value.discountPrice!;
        this.type = value.type;
        if (value.bundle) this.bundle = new NewCartBundle(value.bundle as INewCartBundle)
        this.personalize = value.personalize;
        this.mark = value.mark;
    }

    priceDisplay(){
        let locationService: NewLocationService = new NewLocationService();
        let location: LocationType = locationService.getlocation();
        if (location === 'us') return '$' + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else if (location === 'sg') return 'S$' + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
    
    priceDiscountedDisplay(){
        let locationService: NewLocationService = new NewLocationService();
        let location: LocationType = locationService.getlocation();
        if (location === 'us') return '$' + this.discountPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else if (location === 'sg') return 'S$' + this.discountPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else return '₱' + this.discountPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
}

export interface INewCartBundle {
    count: number;
    price: number;
    sgprice: number;
    usprice: number;
}

export class NewCartBundle {
    count: number;
    price: number;
    sgprice: number;
    usprice: number;

    constructor(value: INewCartBundle){
        this.count = value.count;
        this.price = value.price;
        this.sgprice = value.sgprice;
        this.usprice = value.usprice;
    }

    countDisplay(){
        return this.count.toLocaleString();
    }

    priceDisplay(){
        let locationService: NewLocationService = new NewLocationService();
        let location: LocationType = locationService.getlocation();
        if (location === 'us') return '$' + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else if (location === 'sg') return 'S$' + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
}
