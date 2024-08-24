import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { INewCart } from 'src/app/new-models/new-cart';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-cart',
  templateUrl: './new-cart.component.html',
  styleUrls: ['./new-cart.component.scss']
})
export class NewCartComponent implements OnInit {
  storageService: NewStorageService;
  ref: ChangeDetectorRef;

  constructor(
    _storageService: NewStorageService,
    _ref: ChangeDetectorRef
  ) {
    this.storageService = _storageService;
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
  carts: INewCart[] = [];
  count: number = 0;
  total: number = 0;
  totalDisplay: string = '';
  saving: boolean = false;

  ngOnInit(): void {
    let ids = this.storageService.getCartList();
    ids.reverse().forEach(id => {
      let iCart = this.storageService.getCart(id);
      if (iCart) this.carts.push(iCart)
    })
    this.calculate();
    this.ref.detectChanges();
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
    let ids = this.storageService.getCartList().filter(x => x !== id);
    this.storageService.saveCartList(ids);
    this.carts = [...this.carts.filter(x => x.id !== id)];
    this.calculate();
    this.ref.detectChanges();
  }
}
