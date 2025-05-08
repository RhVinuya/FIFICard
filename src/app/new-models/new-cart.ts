import { INewDiscount } from './new-discount';
import { NewLocationService } from "../new-services/new-location.service";
import { IModelType, ItemType, LocationType } from "./new-enum";
import { INewPersonalize } from "./new-personalize";
import { IConfig, IPromo } from './new-config';
import { NewCardService } from '../new-services/new-card.service';
import { INewCard, NewCard } from './new-card';
import { NewCartService } from '../new-services/new-cart.service';
import { NewStickerService } from '../new-services/new-sticker.service';
import { NewPostcardService } from '../new-services/new-postcard.service';
import { NewGiftService } from '../new-services/new-gift.service';
import { INewGift } from './new-gift';

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
    isPromo?: boolean | undefined;
    isPromoAdjusted?: boolean | undefined;
    promo?: IPromo | undefined;
    promoPrice?: number | undefined;
    datetime: number;
}

export class NewCart {
    cardService: NewCardService;
    stickerService: NewStickerService;
    postcardService: NewPostcardService;
    giftService: NewGiftService;

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
    isPromo: boolean | undefined;
    isPromoAdjusted: boolean | undefined;
    promo: IPromo | undefined;
    promoPrice: number;
    datetime: number;

    item: IModelType;
    isActive: boolean = true;
    isAvailable: boolean = true;

    locationService: NewLocationService;
    location: LocationType;

    constructor(
        value: INewCart,
        _cardService: NewCardService,
        _stickerService: NewStickerService,
        _postcardService: NewPostcardService,
        _giftService: NewGiftService
    ) {
        this.cardService = _cardService;
        this.stickerService = _stickerService;
        this.postcardService = _postcardService;
        this.giftService = _giftService;

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
        this.datetime = value.datetime;

        this.locationService = new NewLocationService();
        this.location = this.locationService.getlocation();
    }

    async loadItem() {
        if (this.type === 'card') {
            this.item = await this.cardService.get(this.itemId);
            this.isActive = this.item.active;
        }
        else if (this.type === 'sticker') {
            this.item = await this.stickerService.get(this.itemId);
            this.isActive = this.item.active;
        }
        else if (this.type === 'postcard') {
            this.item = await this.postcardService.get(this.itemId);
            this.isActive = this.item.active;
        }
        else if (this.type === 'gift') {
            this.item = await this.giftService.get(this.itemId);
            this.isActive = this.item.active;
            this.isAvailable = (this.item as INewGift).locations.includes(this.location)
        }
    }

    getOriginalPrice() {
        let locationService: NewLocationService = new NewLocationService();
        let location: LocationType = locationService.getlocation();
        let value: number = 0;
        if (this.type === 'postcard') {
            if (this.bundle) {
                if (location === 'us') value = this.bundle.usprice;
                else if (location === 'sg') value = this.bundle.sgprice;
                else value = this.bundle.price;
            }
            else {
                if (location === 'us') value = this.usprice;
                else if (location === 'sg') value = this.sgprice;
                else value = this.price;
            }
        }
        else {
            if (location === 'us') value = this.usprice;
            else if (location === 'sg') value = this.sgprice;
            else value = this.price;
        }
        return value;
    }

    originalPriceDisplay() {
        if (this.getOriginalPrice() > 0) {
            let locationService: NewLocationService = new NewLocationService();
            let location: LocationType = locationService.getlocation();
            if (location === 'us') return '$' + this.getOriginalPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
            else if (location === 'sg') return 'S$' + this.getOriginalPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
            else return '₱' + this.getOriginalPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
        }
        else return 'Free'
    }

    getPrice() {
        if (this.isPromo) return this.promoPrice;
        else if (this.isDiscounted) return this.discountPrice;
        else return this.getOriginalPrice();
    }

    priceDisplay() {
        if (this.getPrice() > 0) {
            let locationService: NewLocationService = new NewLocationService();
            let location: LocationType = locationService.getlocation();
            if (location === 'us') return '$' + this.getPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
            else if (location === 'sg') return 'S$' + this.getPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
            else return '₱' + this.getPrice().toLocaleString('en-US', { minimumFractionDigits: 2 })
        }
        else return 'Free'
    }

    discountDisplay() {
        if (this.discount) return this.discount.value.toLocaleString('en-US', { minimumFractionDigits: 0 }) + (this.discount.disctype === 'percent' ? '% Off' : ' less');
        else return ''
    }
}

export class TotalCart {
    cartService: NewCartService;
    cardService: NewCardService;
    stickerService: NewStickerService;
    postcardService: NewPostcardService;
    giftService: NewGiftService;
    carts: NewCart[] = [];
    config: IConfig;
    location: LocationType;
    symbol: string
    total: number = 0;

    isMissingAPromo: boolean | undefined = undefined;
    missingPromoText: string = '';
    missingPromoType: ItemType | undefined = undefined;

    constructor(
        _cartService: NewCartService, 
        _cardService: NewCardService, 
        _stickerService: NewStickerService,
        _postcardService: NewPostcardService,
        _giftService: NewGiftService,
        _iNewCarts: INewCart[], 
        _config: IConfig, 
        initialize: boolean = true
    ) {
        this.cartService = _cartService;
        this.cardService = _cardService;
        this.stickerService = _stickerService;
        this.postcardService = _postcardService;
        this.giftService = _giftService;
        this.config = _config;
        if (initialize) {
            this.initializeCarts(_iNewCarts);
            this.initializeDiscount();
        }
    }

    async initializeCarts(values: INewCart[]) {
        let items: NewCart[] = [];
        for await (let value of values) {
            let cart: NewCart = new NewCart(value, this.cardService, this.stickerService, this.postcardService, this.giftService);
            await cart.loadItem();
            if (cart.isActive === false || cart.isAvailable === false) {
                if (cart.mark) this.changeMark(cart.id, false)
            }
            items.push(cart);
        }
        this.carts = [...items];
        this.calculate()
    }

    setCarts(values: INewCart[]) {
        this.initializeCarts(values);
        this.initializeDiscount();
    }

    async initializeDiscount() {
        for await (let cart of this.carts) {
            if (cart.type === 'card') {
                let iCard: INewCard = await this.cardService.get(cart.itemId);
                let card: NewCard = new NewCard(iCard as INewCard, this.config);
                cart.isDiscounted = card.isDiscounted();
                if (cart.isDiscounted) {
                    cart.discount = card.getDiscount();
                    if (cart.personalize) cart.discountPrice = card.getPersonalizePrice(cart.isDiscounted);
                    else cart.discountPrice = card.getDiscountedPrice()
                }
            }
        }

        this.calculate()
    }

    getActivePromos(): IPromo[] {
        let promos: IPromo[] = [];

        this.config.promos.forEach(value => {
            const start: Date = new Date(value.start);
            const end: Date = new Date(value.end);
            const today = new Date();
            if (today.getTime() >= start.getTime() && today.getTime() <= end.getTime()) promos.push(value);
        });

        return promos
    }

    async calculate() {
        this.total = 0;
        this.calculatePromo();
        this.carts.filter(x => x.isActive === true).filter(x => x.isAvailable === true).filter(x => x.mark === true).forEach(cart => this.total = this.total + cart.getPrice());
    }

    calculatePromo() {
        if (this.carts.filter(x => x.isActive === true).filter(x => x.isAvailable === true).length === 0) {
            this.isMissingAPromo = false;
            this.missingPromoText = '';
            return;
        }

        let promos = this.getActivePromos();
        if (promos.length > 0) {
            this.carts.filter(x => x.isActive === true).filter(x => x.isAvailable === true).forEach(cart => {
                cart.isPromo = false;
                cart.isPromoAdjusted = false;
                cart.promo = undefined;
                cart.promoPrice = 0;
            })

            promos.forEach(promo => {
                if (promo.type === 'discount on 2nd item') {
                    let promocart: NewCart[][] = this.carts.filter(x => x.isActive === true).filter(x => x.isAvailable === true).filter(x => x.mark === true).filter(x => x.isPromo !== true).filter(x => x.type === promo.itemtype).reduce((result: NewCart[][], item, index) => {
                        if (index % 2 === 0) result.push([item]);
                        else result[result.length - 1].push(item);
                        return result;
                    }, []);
                    promocart.forEach(item => {
                        if (item.length === 2) {
                            let primaryCart = item[0];
                            primaryCart.isPromo = true;
                            primaryCart.isPromoAdjusted = false;
                            primaryCart.promo = promo;
                            primaryCart.promoPrice = primaryCart.getOriginalPrice();

                            let secondaryCart = item[1];
                            secondaryCart.isPromo = true
                            secondaryCart.isPromoAdjusted = true;
                            secondaryCart.promo = promo;
                            secondaryCart.promoPrice = secondaryCart.getOriginalPrice() - (secondaryCart.getOriginalPrice() * (promo.discount / 100));
                        }

                        this.isMissingAPromo = item.length === 1;
                        if (this.isMissingAPromo) {
                            this.missingPromoText = 'Add one more ' + promo.itemtype + ' to avail a promo of ' + promo.discount + '%';
                            this.missingPromoType = promo.itemtype;
                        }
                        else {
                            this.isMissingAPromo = false;
                            this.missingPromoText = '';
                            this.missingPromoType = undefined;
                        }
                    })
                }
                else if (promo.type === 'free on 2nd item') {
                    let initialIds: string[] = [...this.carts.filter(x => x.isActive === true).filter(x => x.isAvailable === true).filter(x => x.mark === true).filter(x => x.isPromo !== true).filter(x => x.type === promo.itemtype).map(x => x.id)];
                    let freeIds: string[] = [...this.carts.filter(x => x.isActive === true).filter(x => x.isAvailable === true).filter(x => x.mark === true).filter(x => x.isPromo !== true).filter(x => x.type === promo.discountedtype).map(x => x.id)];
                    initialIds.forEach((id, index) => {
                        if (index < freeIds.length) {
                            let initial = this.carts.find(x => x.id === id);
                            if (initial) {
                                initial.isPromo = true;
                                initial.isPromoAdjusted = false;
                                initial.promo = promo;
                                initial.promoPrice = initial.getOriginalPrice();
                            }

                            let free = this.carts.find(x => x.id === freeIds[index]);
                            if (free) {
                                free.isPromo = true;
                                free.isPromoAdjusted = true;
                                free.promo = promo;
                                free.promoPrice = 0;

                                this.isMissingAPromo = false;
                                this.missingPromoText = '';
                                this.missingPromoType = undefined;
                            }
                        }
                        else {
                            this.isMissingAPromo = true;
                            if (this.isMissingAPromo) {
                                this.missingPromoText = 'Get a ' + promo.discountedtype + ' for free when you purchase a ' + promo.itemtype;
                                this.missingPromoType = promo.discountedtype;
                            }
                        }
                    });
                }
            })
        }
    }

    count() {
        return this.carts.length;
    }

    isForCheckout() {
        return this.carts.filter(x => x.mark === true).length > 0
    }

    totalDisplay() {
        let locationService: NewLocationService = new NewLocationService();
        let symbol: string = locationService.getPriceSymbol();
        return symbol + this.total.toLocaleString('en-US', { minimumFractionDigits: 2 });
    }

    isMarkAll() {
        return this.carts.filter(x => x.isActive === true).filter(x => x.isAvailable === true).filter(x => x.mark === false).length === 0;
    }

    async changeMark(id: string, mark: boolean) {
        let idx = this.carts.findIndex(x => x.id === id);
        this.carts[idx].mark = mark;
        await this.cartService.update(this.carts[idx] as INewCart);
        this.calculate();
    }

    async changeMarkAll(mark: boolean) {
        for await (let cart of this.carts.filter(x => x.isActive === true).filter(x => x.isAvailable === true)) {
            cart.mark = mark;
            await this.cartService.update(cart as INewCart);
        }
        this.calculate();
    }

    async remove(id: string) {
        await this.cartService.delete(id);
        this.carts = [...this.carts.filter(x => x.id !== id)];
        this.calculate();
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

    constructor(value: INewCartBundle) {
        this.count = value.count;
        this.price = value.price;
        this.sgprice = value.sgprice;
        this.usprice = value.usprice;
    }

    countDisplay() {
        return this.count.toLocaleString();
    }

    priceDisplay() {
        let locationService: NewLocationService = new NewLocationService();
        let location: LocationType = locationService.getlocation();
        if (location === 'us') return '$' + this.usprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else if (location === 'sg') return 'S$' + this.sgprice.toLocaleString('en-US', { minimumFractionDigits: 2 })
        else return '₱' + this.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
    }
}
