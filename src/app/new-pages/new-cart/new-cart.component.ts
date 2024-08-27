import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import { NewLoginComponent } from 'src/app/new-components/new-login/new-login.component';
import { INewCart } from 'src/app/new-models/new-cart';
import { INewUser } from 'src/app/new-models/new-user';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-cart',
  templateUrl: './new-cart.component.html',
  styleUrls: ['./new-cart.component.scss']
})
export class NewCartComponent implements OnInit, OnDestroy {
  storageService: NewStorageService;
  modalService: NgbModal;
  router: Router;
  ref: ChangeDetectorRef;

  constructor(
    _storageService: NewStorageService,
    _modalService: NgbModal,
    _router: Router,
    _ref: ChangeDetectorRef
  ) {
    this.storageService = _storageService;
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
  ids: string[] | undefined = undefined;
  carts: INewCart[] = [];
  count: number = 0;
  total: number = 0;
  totalDisplay: string = '';
  saving: boolean = false;

  ngOnInit(): void {
    this.subs = timer(100, 500).subscribe(time => {
      this.user = this.storageService.getUser();
    });

    this.loading = true;
    this.ref.detectChanges();

    this.ids = this.storageService.getCartList();
    this.ids.reverse().forEach(id => {
      let iCart = this.storageService.getCart(id);
      if (iCart) this.carts.push(iCart)
    })
    this.calculate();
    this.loading = false;
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  calculate() {
    this.total = 0;
    this.carts.forEach(cart => {
      if (cart.mark === true){
        if (cart.type === 'card') {
          this.total = this.total + cart.price;
        }
        else if (cart.type === 'sticker') {
          this.total = this.total + cart.price;
        }
        else if (cart.type === 'postcard') {
          if (cart.bundle) this.total = this.total + cart.bundle.price
        }
        else if (cart.type === 'gift') {
          this.total = this.total + cart.price;
        }
      }
    })
    this.count = this.carts.filter(x => x.mark === true).length;
    this.totalDisplay = '₱ ' + this.total.toLocaleString('en-US', { minimumFractionDigits: 2 })
  }

  onChangeItemMark(id: string, mark: boolean) {
    let idx = this.carts.findIndex(x => x.id === id);
    this.carts[idx].mark = mark;
    this.storageService.saveCart(this.carts[idx]);
    this.calculate();
    this.ref.detectChanges();
  }

  onRemove(id: string) {
    this.storageService.removeCart(id);
    this.ids = this.storageService.getCartList().filter(x => x !== id);
    this.storageService.saveCartList(this.ids);
    this.carts = [...this.carts.filter(x => x.id !== id)];
    this.calculate();
    this.ref.detectChanges();
  }

  onClickCheckout(){
    this.saving = true;
    this.storageService.saveCheckoutList(this.carts.filter(x => x.mark === true).map(x => x.id));
    this.router.navigate(['/new/checkout']);
    this.saving = false;
  }

  onClickSignIn() {
    this.modalService.open(NewLoginComponent, { animation: true });
  }
}
