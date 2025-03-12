import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { CartItemMobileComponent } from './cart-item/cart-item-mobile.component';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart-mobile',
  templateUrl: './cart-mobile.component.html',
  styleUrls: ['./cart-mobile.component.scss']
})

export class CartMobileComponent implements OnInit, OnDestroy {
  
  @ViewChild('child') child: CartItemMobileComponent;

  cartService: NewCartService;
  storageService: NewStorageService;
  locationService: NewLocationService;
  modalService: NgbModal;
  router: Router;
  ref: ChangeDetectorRef;

  location: LocationType = 'ph';
  subs: Subscription;
  user: INewUser | undefined = undefined;
  loading: boolean = true;
  carts: INewCart[] = [];
  count: number = 0;
  total: number = 0;
  totalDisplay: string = '';
  saving: boolean = false;
  isCheckAll: boolean = false;
  isIndeterminateCheckAll: boolean = false;
  checkedItemCount = 0;

  constructor(
    _cartService: NewCartService,
    _storageService: NewStorageService,
    _locationService: NewLocationService,
    _modalService: NgbModal,
    _router: Router,
    _ref: ChangeDetectorRef,
    private _location: Location,
    public alertController: AlertController
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

  async ionViewDidEnter() {
    this.loading = true;
    this.location = this.locationService.getlocation();

    this.subs = timer(100, 500).subscribe(time => {
      this.user = this.storageService.getUser();
    });

    let carts = await this.cartService.getAll();
    this.checkedItemCount = carts.filter(o => o.mark).length;


    this.carts = carts;
    this.checkMarkStatus();
    this.calculate();
    this.loading = false;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async onCheckAllChange(event: any): Promise<void> {
    this.isCheckAll = event.detail.checked;
    
    let _carts: INewCart[] = [];
    console.log(event.detail.checked);
    for await (let cart of this.carts) {
      cart.mark = event.detail.checked;
      _carts.push(cart);

      await this.cartService.update(cart);


    }

    this.carts = _carts;
    this.calculate();
  }

  getMarkCount(): number {
    return this.carts.filter(x => x.mark === true).length;
  }

  checkMarkStatus() {
    this.checkedItemCount = this.carts.filter(o => o.mark).length;
    if(this.carts.length == this.checkedItemCount) {
      this.isCheckAll = true;
      this.isIndeterminateCheckAll = false;
    } else if (this.checkedItemCount == 0) {
      this.isCheckAll = false;
      this.isIndeterminateCheckAll = false;
    } else {
      this.isIndeterminateCheckAll = true;
      this.isCheckAll = false;
    }
  }
  

  async deleteAll() {
    const alertDelete = await this.alertController.create({
      header: 'Delete All',
      message: 'Confirm Deletion',
      buttons: [
        {
          text: "No",
          role: "no",
        },
        {
          text: "Yes",
          role: "Yes",
          handler: async () => {
            let list = this.carts.filter(x => x.mark === true).map(x => x.id);
            list.forEach( async (id) => {
              this.carts = this.carts.filter(x => x.id !== id);
              let cart = this.carts.find(x => x.id == id);
              await this.cartService.update(cart!);
            });
            this.isCheckAll = this.carts.length > 0 ? this.carts.filter(x => x.mark === false).length === 0 : false;
            this.calculate();
          }
        }
      ],
    });
    await alertDelete.present();
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
    this.checkMarkStatus();
    await this.cartService.update(this.carts[idx]);
    this.calculate();
    this.ref.detectChanges();
  }

  async onRemove(id: string) {
    await this.cartService.delete(id);
    this.carts = [...this.carts.filter(x => x.id !== id)];
    this.checkMarkStatus();
    this.calculate();
    this.ref.detectChanges();
  }

  onClickCheckout() {
    this.saving = true;

    this.storageService.saveCheckoutList(this.carts.filter(x => x.mark === true).map(x => x.id));
    this.router.navigate(['/checkout']);
    this.saving = false;
  }

  onClickSignIn() {
    this.modalService.open(NewLoginComponent, { animation: true });
  }

  goBack() {
    this._location.back();
  }

}
