import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { INewCart } from 'src/app/new-models/new-cart';
import { NewStorageService } from 'src/app/new-services/new-storage.service';

@Component({
  selector: 'app-new-in-your-cart',
  templateUrl: './new-in-your-cart.component.html',
  styleUrls: ['./new-in-your-cart.component.scss']
})
export class NewInYourCartComponent implements OnInit {

  activeOffCanvas: NgbActiveOffcanvas;
  storageService: NewStorageService;
  router: Router;

  constructor(
    _activeOffCanvas: NgbActiveOffcanvas,
    _storageService: NewStorageService,
    _router: Router
  ) {
    this.activeOffCanvas = _activeOffCanvas;
    this.storageService = _storageService;
    this.router = _router;
  }

  ids: string[] = [];
  carts: INewCart[] = [];
  total: string = '';

  ngOnInit(): void {
    this.ids = this.storageService.getCartList();
    this.loadCarts();
  }

  async loadCarts() {
    for await (let id of this.ids) {
      let cart = this.storageService.getCart(id);
      if (cart !== undefined) this.carts = [...this.carts, cart];
    }
    this.carts.reverse();
    this.computeTotal();
  }

  onDelete(id: string) {
    this.ids = this.ids.filter(x => x !== id);
    this.carts = this.carts.filter(x => x.id !== id);
    this.storageService.saveCartList(this.ids);
    this.storageService.removeCart(id);
    this.computeTotal();
    if (this.ids.length === 0) this.activeOffCanvas.close();
  }

  computeTotal() {
    let subtotal: number = 0
    this.carts.map(x => subtotal = subtotal + x.price);
    this.total = subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })
  }

  openCart() {
    this.router.navigate(['/new/cart'])
    this.activeOffCanvas.close();
  }

  close(){
    this.activeOffCanvas.close()
  }

}
