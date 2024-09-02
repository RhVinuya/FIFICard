import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import { NewLoginComponent } from 'src/app/new-components/new-login/new-login.component';
import { INewCart } from 'src/app/new-models/new-cart';
import { LocationType, StorageEnum } from 'src/app/new-models/new-enum';
import { INewUser } from 'src/app/new-models/new-user';
import { NewCartService } from 'src/app/new-services/new-cart.service';
import { NewLocationService } from 'src/app/new-services/new-location.service';
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

  constructor(
    _cartService: NewCartService,
    _storageService: NewStorageService,
    _locationService: NewLocationService,
    _modalService: NgbModal,
    _router: Router,
    _ref: ChangeDetectorRef
  ) {
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

  subs: Subscription;
  user: INewUser | undefined = undefined;
  loading: boolean = false;
  carts: INewCart[] = [];
  count: number = 0;
  total: number = 0;
  totalDisplay: string = '';
  saving: boolean = false;

  async ngOnInit(): Promise<void> {
    this.subs = timer(100, 500).subscribe(time => {
      this.user = this.storageService.getUser();
    });

    this.loading = true;
    this.ref.detectChanges();
    this.carts = await this.cartService.getAll();
    console.log(this.carts)
    this.calculate();
    this.loading = false;
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  calculate() {
    let location: LocationType = this.locationService.getlocation()
    let symbol: string = this.locationService.getPriceSymbol();
    this.total = 0;
    this.carts.forEach(cart => {
      if (cart.mark === true) {
        if (cart.type === 'card') {
          if (location === 'ph') this.total = this.total + cart.price;
          else if (location === 'us') this.total = this.total + cart.usprice;
          else this.total = this.total + cart.sgprice;
        }
        else if (cart.type === 'sticker') {
          if (location === 'ph') this.total = this.total + cart.price;
          else if (location === 'us') this.total = this.total + cart.usprice;
          else this.total = this.total + cart.sgprice;
        }
        else if (cart.type === 'postcard') {
          if (cart.bundle) {
            if (location === 'ph') this.total = this.total + cart.bundle.price
            else if (location === 'us') this.total = this.total + cart.bundle.usprice
            else this.total = this.total + cart.bundle.sgprice
          }
        }
        else if (cart.type === 'gift') {
          if (location === 'ph') this.total = this.total + cart.price;
          else if (location === 'us') this.total = this.total + cart.usprice;
          else this.total = this.total + cart.sgprice;
        }
      }
    })
    this.count = this.carts.filter(x => x.mark === true).length;
    this.totalDisplay = symbol + this.total.toLocaleString('en-US', { minimumFractionDigits: 2 })
  }

  async onChangeItemMark(id: string, mark: boolean) {
    let idx = this.carts.findIndex(x => x.id === id);
    this.carts[idx].mark = mark;
    await this.cartService.update(this.carts[idx]);
    this.calculate();
    this.ref.detectChanges();
  }

  async onRemove(id: string) {
    await this.cartService.delete(id);
    this.carts = [...this.carts.filter(x => x.id !== id)];
    this.calculate();
    this.ref.detectChanges();
  }

  onClickCheckout() {
    this.saving = true;
    this.storageService.saveCheckoutList(this.carts.filter(x => x.mark === true).map(x => x.id));
    this.router.navigate(['/new/checkout']);
    this.saving = false;
  }

  onClickSignIn() {
    this.modalService.open(NewLoginComponent, { animation: true });
  }
}
