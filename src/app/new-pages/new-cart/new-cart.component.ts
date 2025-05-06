import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import { NewLoginComponent } from 'src/app/new-components/new-login/new-login.component';
import { INewCard, NewCard } from 'src/app/new-models/new-card';
import { INewCart, TotalCart } from 'src/app/new-models/new-cart';
import { IConfig } from 'src/app/new-models/new-config';
import { LocationType, StorageEnum } from 'src/app/new-models/new-enum';
import { INewUser } from 'src/app/new-models/new-user';
import { NewCardService } from 'src/app/new-services/new-card.service';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewConfigService } from 'src/app/new-services/new-config.service';
import { NewGiftService } from 'src/app/new-services/new-gift.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
import { NewPostcardService } from 'src/app/new-services/new-postcard.service';
import { NewStickerService } from 'src/app/new-services/new-sticker.service';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-cart',
  templateUrl: './new-cart.component.html',
  styleUrls: ['./new-cart.component.scss']
})
export class NewCartComponent implements OnInit, OnDestroy {

  cartService: NewCartService;
  storageService: NewStorageService;
  locationService: NewLocationService;
  modalService: NgbModal;
  router: Router;
  ref: ChangeDetectorRef;
  cardService: NewCardService;
  stickerService: NewStickerService;
  postcardService: NewPostcardService;
  giftService: NewGiftService;
  configService: NewConfigService;
  config: IConfig;

  constructor(
    _cardService: NewCardService,
    _stickerService: NewStickerService,
    _postcardService: NewPostcardService,
    _giftService: NewGiftService,
    _cartService: NewCartService,
    _storageService: NewStorageService,
    _locationService: NewLocationService,
    _modalService: NgbModal,
    _router: Router,
    _ref: ChangeDetectorRef,
    _configService: NewConfigService,
  ) {
    this.configService = _configService;
    this.cardService = _cardService;
    this.stickerService = _stickerService;
    this.postcardService = _postcardService;
    this.giftService = _giftService;
    this.cartService = _cartService;
    this.storageService = _storageService;
    this.locationService = _locationService;
    this.modalService = _modalService;
    this.router = _router;
    this.ref = _ref;
  }

  breadcrumbs = [
    {
      title: "Home",
      url: "/",
      active: false
    },
    {
      title: "Cart",
      url: "",
      active: true
    }
  ];

  location: LocationType = 'ph';
  subs: Subscription;
  user: INewUser | undefined = undefined;
  loading: boolean = false;
  totalCart: TotalCart;
  saving: boolean = false;
  model: NewCard;

  async ngOnInit(): Promise<void> {
    this.config = await this.configService.get();
    this.location = this.locationService.getlocation();

    this.subs = timer(100, 500).subscribe(time => {
      this.user = this.storageService.getUser();
    });

    this.loading = true;
    this.ref.detectChanges();
    let items: INewCart[] = await this.cartService.getAll();
    this.totalCart = new TotalCart(this.cartService, this.cardService, this.stickerService, this.postcardService, this.giftService, items, this.config);
    this.loading = false;
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async onChangeItemMark(id: string, mark: boolean) {
    await this.totalCart.changeMark(id, mark);
    this.ref.detectChanges();
  }

  async onChangeItemMarkAll(e: any) {
    await this.totalCart.changeMarkAll(e.target.checked);
    this.ref.detectChanges();
  }

  async onRemove(id: string) {
    await this.totalCart.remove(id);
    this.ref.detectChanges();
  }

  onClickCheckout() {
    this.saving = true;
    this.storageService.saveCheckoutList(this.totalCart.carts.filter(x => x.mark === true).map(x => x.id));
    this.router.navigate(['/new/checkout']);
    this.saving = false;
  }

  onClickSignIn() {
    this.modalService.open(NewLoginComponent, { animation: true });
  }

  getItemIds() {
    return this.totalCart.carts.map(x => x.itemId)
  }

  async onRefresh() {
    let items: INewCart[] = await this.cartService.getAll();
    this.totalCart.setCarts(items)
  }
}
