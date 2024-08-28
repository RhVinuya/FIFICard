import { Injectable } from '@angular/core';
import { INewCart } from '../new-models/new-cart';
import { NewStorageService } from './new-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NewCartService {

  storageService: NewStorageService;

  constructor(
    _storageService: NewStorageService
  ) {
    this.storageService = _storageService;
  }

  getRandomString(): string {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = 0; i < 20; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  add(cart: INewCart): Promise<string> {
    return new Promise((resolve) => {
      cart.id = this.getRandomString();
      let ids = this.storageService.getCartList();
      this.storageService.saveCart(cart);
      this.storageService.saveCartList([...ids, cart.id]);
      resolve(cart.id)
    });
  }

  update(cart: INewCart): Promise<void>{
    return new Promise((resolve) => {
      this.storageService.saveCart(cart);
      resolve();
    })
  }

  get(id: string): Promise<INewCart | undefined> {
    return new Promise((resolve) => {
      resolve(this.storageService.getCart(id));
    });
  }

  getAll(): Promise<INewCart[]> {
    return new Promise((resolve) => {
      let carts: INewCart[] = [];
      let ids = this.storageService.getCartList();
      ids.forEach(id => {
        let cart = this.storageService.getCart(id);
        if (cart) carts.push(cart);
      })
      resolve(carts)
    })
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      let ids = this.storageService.getCartList();
      this.storageService.saveCartList([...ids.filter(x => x !== id)]);
      this.storageService.removeCart(id);
      resolve();
    })
  }
}
